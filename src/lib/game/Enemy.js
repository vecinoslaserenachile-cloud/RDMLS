import * as THREE from 'three';

export class Enemy {
  constructor(scene) {
    this.scene = scene;
    this.dead = false;

    // Crea el Pivot (Centro del planeta) para ubicarlo sobre la esfera
    this.pivot = new THREE.Object3D();
    this.scene.add(this.pivot);

    // Malla rojiza del enemigo a 20 (radio) + 1.2 (altura)
    this.meshGroup = new THREE.Group();
    this.meshGroup.position.set(0, 21.2, 0);

    const geo = new THREE.SphereGeometry(0.8, 16, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xaa0000,
      roughness: 0.8,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.castShadow = true;
    this.meshGroup.add(this.mesh);

    // Púas (Spikes) para que luzca como enemigo
    const spikeGeo = new THREE.ConeGeometry(0.2, 0.6, 4);
    for (let i = 0; i < 4; i++) {
        const spike = new THREE.Mesh(spikeGeo, mat);
        spike.rotation.x = Math.PI / 2;
        spike.position.z = i === 0 ? 0.8 : i === 1 ? -0.8 : 0;
        spike.position.x = i === 2 ? 0.8 : i === 3 ? -0.8 : 0;
        if(i === 0) spike.rotation.x = Math.PI/2;
        if(i === 1) spike.rotation.x = -Math.PI/2;
        if(i === 2) spike.rotation.z = -Math.PI/2;
        if(i === 3) spike.rotation.z = Math.PI/2;
        this.meshGroup.add(spike);
    }

    this.pivot.add(this.meshGroup);

    // Posición aleatoria inicial en el esférico
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * Math.PI * 2;
    this.pivot.rotation.set(phi, theta, 0);

    // Vector de movimiento local sobre la esfera
    this.speed = 1.5 + Math.random() * 2;
    this.directionX = (Math.random() - 0.5) * 2;
    this.directionZ = (Math.random() - 0.5) * 2;
  }

  update(delta) {
    if (this.dead) return;
    
    // Rota la base para mover al enemigo por la superficie
    this.pivot.rotateX(this.directionX * this.speed * delta * 0.5);
    this.pivot.rotateZ(this.directionZ * this.speed * delta * 0.5);
    
    // Rota el modelo sobre sí mismo
    this.meshGroup.rotation.y += delta;
    this.meshGroup.rotation.x += delta * 0.5;
  }

  getPosition() {
    const pos = new THREE.Vector3();
    this.meshGroup.getWorldPosition(pos);
    return pos;
  }

  markDead() {
    this.dead = true;
    if (this.pivot.parent) {
      this.pivot.parent.remove(this.pivot);
    }
  }
}
