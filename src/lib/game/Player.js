import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Player {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    
    // Contenedor principal del jugador (El centro del planeta)
    this.pivot = new THREE.Object3D();
    this.scene.add(this.pivot);

    // Contenedor visual del jugador (A una distancia del centro igual al radio del planeta)
    this.meshGroup = new THREE.Group();
    this.meshGroup.position.set(0, 21, 0); // 20 (radio planeta) + 1 (altura base del jugador)
    this.pivot.add(this.meshGroup);

    this.velocity = new THREE.Vector3();
    this.isGrounded = false;
    this.speed = 10;
    this.targetRotationY = 0;
    this.currentRotationY = 0;

    // Animaciones
    this.mixer = null;
    this.actions = {};
    this.currentAction = null;

    // Input state
    this.keys = { w: false, a: false, s: false, d: false, space: false };
    
    this._onKeyDown = this.onKeyDown.bind(this);
    this._onKeyUp = this.onKeyUp.bind(this);
    
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);

    this.loadModel();
  }

  loadModel() {
    const loader = new GLTFLoader();
    
    // Creamos un placeholder temporal mientras carga "serenito.glb"
    const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    this.placeholder = new THREE.Mesh(geometry, material);
    this.placeholder.castShadow = true;
    this.meshGroup.add(this.placeholder);

    // Intentamos cargar el modelo de Tripo3D (Debe estar en public/serenito.glb)
    loader.load(
      '/models/bisabuelo.glb', // IMPORTANTE: El usuario debe subir este archivo a la carpeta public/
      (gltf) => {
        // Remueve el placeholder
        this.meshGroup.remove(this.placeholder);
        
        this.model = gltf.scene;
        this.model.scale.set(1.5, 1.5, 1.5);
        
        // Sombras
        this.model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.meshGroup.add(this.model);

        // Setup Animaciones (si el GLB de Tripo viene con rig de mixamo)
        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.model);
          gltf.animations.forEach((clip) => {
            this.actions[clip.name.toLowerCase()] = this.mixer.clipAction(clip);
          });
          
          // Buscar animaciones típicas
          const idle = this.actions['idle'] || this.actions[Object.keys(this.actions)[0]];
          if (idle) {
            this.currentAction = idle;
            this.currentAction.play();
          }
        }
      },
      undefined,
      (error) => {
        console.warn('Tripo3D serenito.glb no encontrado, usando placeholder visual.', error);
        // Si no está, mantenemos la capsula blanca
        this.placeholder.material.color.setHex(0xfce7f3); // Color rosita pálido por defecto
      }
    );
  }

  onKeyDown(e) {
    const key = e.key.toLowerCase();
    if (this.keys.hasOwnProperty(key)) this.keys[key] = true;
    if (key === ' ' && this.isGrounded) this.jump();
  }

  onKeyUp(e) {
    const key = e.key.toLowerCase();
    if (this.keys.hasOwnProperty(key)) this.keys[key] = false;
  }

  jump() {
    if (this.isGrounded) {
      this.velocity.y = 12;
      this.isGrounded = false;
      this.playAnimation('jump');
    }
  }

  run() {
    this.speed = 20;
    setTimeout(() => { this.speed = 10; }, 3000); // Corre por 3 segundos
  }

  applyKnockback(dir, force) {
    // Dir is normalized vector away from enemy
    this.velocity.y = force * 0.5; // push up a bit
    this.isGrounded = false;
    
    // Knockback en X/Z (respecto a la rotación de la esfera es muy complejo, pero simularemos que rota el pivot)
    // Para simplificar, empujamos alejado en las coordenadas locales.
    this.playAnimation('hit');
  }

  bounceUp(force) {
    this.velocity.y = force;
    this.isGrounded = false;
    this.playAnimation('jump');
  }

  playAnimation(name) {
    if (!this.mixer || !this.actions) return;
    
    // Intenta encontrar animación (ej: 'run', 'jump', 'idle')
    let targetAction = this.actions[name];
    if (!targetAction) return;

    if (this.currentAction !== targetAction) {
      targetAction.reset().fadeIn(0.2).play();
      if (this.currentAction) {
        this.currentAction.fadeOut(0.2);
      }
      this.currentAction = targetAction;
    }
  }

  getPosition() {
    // Retorna la posición global del meshGroup (donde está el modelo realmente)
    const pos = new THREE.Vector3();
    this.meshGroup.getWorldPosition(pos);
    return pos;
  }

  update(delta) {
    // 1. Movimiento en X/Z (Rotar el pivot)
    let moved = false;
    const moveSpeed = this.speed * delta * 0.1;

    if (this.keys.w) { this.pivot.rotateX(-moveSpeed); moved = true; this.targetRotationY = Math.PI; }
    if (this.keys.s) { this.pivot.rotateX(moveSpeed); moved = true; this.targetRotationY = 0; }
    if (this.keys.a) { this.pivot.rotateZ(moveSpeed); moved = true; this.targetRotationY = -Math.PI/2; }
    if (this.keys.d) { this.pivot.rotateZ(-moveSpeed); moved = true; this.targetRotationY = Math.PI/2; }

    // Diagonales (Aproximación simple visual)
    if (this.keys.w && this.keys.d) this.targetRotationY = Math.PI * 0.75;
    if (this.keys.w && this.keys.a) this.targetRotationY = -Math.PI * 0.75;
    if (this.keys.s && this.keys.d) this.targetRotationY = Math.PI * 0.25;
    if (this.keys.s && this.keys.a) this.targetRotationY = -Math.PI * 0.25;

    // Suavizar la rotación del modelo
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 10 * delta;
    this.meshGroup.rotation.y = this.currentRotationY;

    // 2. Gravedad y Salto
    const GRAVITY = -25;
    this.velocity.y += GRAVITY * delta;
    
    // Aplicar velocidad Y
    this.meshGroup.position.y += this.velocity.y * delta;

    // Límite de la superficie del planeta (Radio 20 + offset modelo 1 = 21)
    if (this.meshGroup.position.y <= 21) {
      this.meshGroup.position.y = 21;
      this.velocity.y = 0;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }

    // 3. Animaciones
    if (this.mixer) this.mixer.update(delta);

    if (this.isGrounded) {
      if (moved) {
        this.playAnimation(this.speed > 10 ? 'run' : 'walk');
      } else {
        this.playAnimation('idle');
      }
    }

    // 4. Actualizar Cámara (Sigue al jugador desde atrás y arriba localmente)
    const relativeCameraOffset = new THREE.Vector3(0, 5, 12);
    // Convertir a coordenadas de mundo
    const cameraTargetPos = relativeCameraOffset.applyMatrix4(this.meshGroup.matrixWorld);
    
    // Lerp suave
    this.camera.position.lerp(cameraTargetPos, 5 * delta);
    
    // Mira hacia el jugador
    const lookAtPos = new THREE.Vector3();
    this.meshGroup.getWorldPosition(lookAtPos);
    this.camera.lookAt(lookAtPos);
  }

  dispose() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    // Limpieza geométrica...
  }
}
