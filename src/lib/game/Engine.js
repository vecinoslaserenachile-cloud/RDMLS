import * as THREE from 'three';
import { Player } from './Player';
import { VoiceController } from './VoiceController';
import { Enemy } from './Enemy';
import { Explosion } from './Explosion';

export class Engine {
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.fichas = 100;
    this.fichasAzules = 0;
    this.hp = 5;
    this.animationFrameId = 0;
    this.waterDrops = [];
    this.enemies = [];
    this.explosions = [];
    this.enemyHitCooldown = 0;
    this.gameOver = false;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060d1a);
    this.scene.fog = new THREE.FogExp2(0x060d1a, 0.012);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // Environment
    this.createEnvironment();

    // Player
    this.player = new Player(this.scene, this.camera);

    // Lights
    this.createLights();

    // Water Collectibles
    this.createWaterCollectibles();

    // Stars
    this.createStars();

    // Enemies
    this.createEnemies();

    // Voice
    this.voiceController = new VoiceController((cmd) => this.handleVoiceCommand(cmd));

    this.clock = new THREE.Clock();

    this._onResize = this.onWindowResize.bind(this);
    window.addEventListener('resize', this._onResize);
  }

  createLights() {
    const ambient = new THREE.AmbientLight(0x334466, 0.6);
    this.scene.add(ambient);

    // Main directional (sun)
    const sun = new THREE.DirectionalLight(0xffeedd, 2);
    sun.position.set(60, 80, 40);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 200;
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40;
    sun.shadow.camera.bottom = -40;
    this.scene.add(sun);

    // Cyan rim light
    const rim = new THREE.DirectionalLight(0x00ccff, 0.8);
    rim.position.set(-40, 20, -60);
    this.scene.add(rim);

    // Point light on lighthouse
    const lighthouse = new THREE.PointLight(0xffaa44, 3, 60);
    lighthouse.position.set(0, 28, 0);
    this.scene.add(lighthouse);
    this.lighthouseLight = lighthouse;
  }

  createEnvironment() {
    // Planet
    const planetGeo = new THREE.SphereGeometry(20, 128, 128);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x1a2a3a,
      roughness: 0.9,
      metalness: 0.1,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.receiveShadow = true;
    this.scene.add(planet);

    // Ocean ring around equator
    const oceanGeo = new THREE.TorusGeometry(20.5, 0.8, 16, 100);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x0066aa,
      emissive: 0x003366,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = Math.PI / 2;
    this.scene.add(ocean);
    this.ocean = ocean;

    // Lighthouse tower
    const towerGeo = new THREE.CylinderGeometry(0.8, 1.2, 8, 16);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0xddddcc,
      roughness: 0.7,
      metalness: 0.2,
    });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(0, 24, 0);
    tower.castShadow = true;
    this.scene.add(tower);

    // Lighthouse top (light housing)
    const topGeo = new THREE.CylinderGeometry(1.0, 0.8, 1.5, 8);
    const topMat = new THREE.MeshStandardMaterial({
      color: 0xffcc44,
      emissive: 0xffaa22,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.9,
    });
    const top = new THREE.Mesh(topGeo, topMat);
    top.position.set(0, 28.5, 0);
    this.scene.add(top);
    this.lighthouseTop = top;

    // Buildings scattered on planet
    this.createBuildings();

    // Grass patches
    this.createGrassPatches();
  }

  createBuildings() {
    const colors = [0x6c3483, 0x2e86c1, 0x17a589, 0xd4ac0d, 0xcb4335];
    
    for (let i = 0; i < 8; i++) {
      const h = 2 + Math.random() * 4;
      const w = 1 + Math.random() * 1.5;
      const geo = new THREE.BoxGeometry(w, h, w);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        roughness: 0.6,
        metalness: 0.3,
      });
      const b = new THREE.Mesh(geo, mat);

      const phi = Math.acos(-1 + (2 * i) / 8);
      const theta = Math.sqrt(8 * Math.PI) * phi;

      const pos = new THREE.Vector3();
      pos.setFromSphericalCoords(20 + h / 2, phi, theta);
      b.position.copy(pos);

      // Align to surface
      b.lookAt(0, 0, 0);
      b.rotateX(Math.PI / 2);

      b.castShadow = true;
      b.receiveShadow = true;
      this.scene.add(b);

      // Windows (emissive dots)
      const windowGeo = new THREE.PlaneGeometry(0.2, 0.3);
      const windowMat = new THREE.MeshStandardMaterial({
        color: 0xffffaa,
        emissive: 0xffffaa,
        emissiveIntensity: 1,
      });
      for (let j = 0; j < 3; j++) {
        const win = new THREE.Mesh(windowGeo, windowMat);
        win.position.set(
          (Math.random() - 0.5) * w * 0.6,
          (Math.random() - 0.5) * h * 0.6,
          w / 2 + 0.01
        );
        b.add(win);
      }
    }
  }

  createGrassPatches() {
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.9,
      metalness: 0.0,
    });

    for (let i = 0; i < 20; i++) {
      const geo = new THREE.CircleGeometry(0.5 + Math.random() * 1.5, 8);
      const patch = new THREE.Mesh(geo, grassMat);

      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const pos = new THREE.Vector3();
      pos.setFromSphericalCoords(20.02, phi, theta);
      patch.position.copy(pos);

      // Align to surface
      patch.lookAt(0, 0, 0);
      patch.rotateX(Math.PI);

      this.scene.add(patch);
    }
  }

  createStars() {
    const starGeo = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 3000; i++) {
      positions.push(
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 600
      );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starGeo, starMat);
    this.scene.add(stars);
    this.stars = stars;
  }

  createWaterCollectibles() {
    const geo = new THREE.OctahedronGeometry(0.5);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x00aaff,
      emissive: 0x0066cc,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.9,
    });

    for (let i = 0; i < 15; i++) {
      const drop = new THREE.Mesh(geo, mat.clone());
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      drop.position.setFromSphericalCoords(22, phi, theta);
      drop.userData = { isWater: true, baseY: drop.position.y };
      this.scene.add(drop);
      this.waterDrops.push(drop);

      // Inner glow
      const glowGeo = new THREE.OctahedronGeometry(0.7);
      const glowMat = new THREE.MeshStandardMaterial({
        color: 0x00ccff,
        emissive: 0x00ccff,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.15,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      drop.add(glow);
    }
  }

  handleVoiceCommand(cmd) {
    this.options.onCommandRecognized(cmd);
    const lower = cmd.toLowerCase();

    if (lower.includes('salta') || lower.includes('jump')) {
      this.player.jump();
    } else if (lower.includes('corre') || lower.includes('run')) {
      this.player.run();
    } else if (lower.includes('agua') || lower.includes('water')) {
      this.collectWater();
    }
  }

  collectWater() {
    this.fichasAzules += 1;
    this.options.onFichasAzulesChange(this.fichasAzules);
  }

  createEnemies() {
    for (let i = 0; i < 6; i++) {
      const enemy = new Enemy(this.scene);
      this.enemies.push(enemy);
    }
  }

  spawnExplosion(position) {
    const explosion = new Explosion(this.scene, position.clone());
    this.explosions.push(explosion);
    if (this.options.onEnemyDefeated) this.options.onEnemyDefeated();
  }

  addEnergy() {
    this.fichas += 50;
    this.options.onFichasChange(this.fichas);
  }

  toggleVoiceControl() {
    return this.voiceController.toggle();
  }

  start() {
    this.animate();
  }

  reset() {
    // Reset state
    this.hp = 5;
    this.fichas = 100;
    this.fichasAzules = 0;
    this.gameOver = false;
    this.enemyHitCooldown = 0;
    this.options.onHpChange(this.hp);
    this.options.onFichasChange(this.fichas);
    this.options.onFichasAzulesChange(this.fichasAzules);

    // Remove existing enemies and respawn
    for (const e of this.enemies) e.markDead();
    this.enemies = [];
    this.createEnemies();

    // Respawn player at origin surface
    this.player.pivot.position.set(0, 21, 0);
    this.player.velocity.set(0, 0, 0);
    this.player.isGrounded = false;
  }

  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const time = this.clock.elapsedTime;

    if (this.gameOver) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    // Update player
    if (this.player && this.player.update) this.player.update(delta);

    // Global invincibility timer
    if (this.enemyHitCooldown > 0) this.enemyHitCooldown -= delta;

    // Update explosions
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      this.explosions[i].update(delta);
      if (this.explosions[i].dead) this.explosions.splice(i, 1);
    }

    // Update enemies + collision with player // Safe check if getPosition exists
    if (this.player && this.player.getPosition) {
        const playerPos = this.player.getPosition();
        const playerDistFromCenter = playerPos.length();
        // Is player airborne? (above normal surface position)
        const isAirborne = playerDistFromCenter > 21 + 1.5;

        for (let i = this.enemies.length - 1; i >= 0; i--) {
        const enemy = this.enemies[i];
        if (enemy.dead) { this.enemies.splice(i, 1); continue; }

        if (enemy.update) enemy.update(delta);

        if (enemy.getPosition) {
                const dist = playerPos.distanceTo(enemy.getPosition());

                if (dist < 2.2) {
                // Stomp: player is airborne AND coming from above
                if (isAirborne) {
                    // Defeat enemy
                    this.spawnExplosion(enemy.getPosition());
                    enemy.markDead();
                    this.enemies.splice(i, 1);
                    // Bounce player upward after stomp
                    if (this.player.bounceUp) this.player.bounceUp(8);
                } else if (this.enemyHitCooldown <= 0) {
                    // Lose 1 HP
                    this.hp = Math.max(0, this.hp - 1);
                    this.options.onHpChange(this.hp);
                    this.enemyHitCooldown = 1.2;
                    // Push player away from enemy
                    const pushDir = playerPos.clone().sub(enemy.getPosition()).normalize();
                    if (this.player.applyKnockback) this.player.applyKnockback(pushDir, 12);
                    if (this.options.onPlayerHit) this.options.onPlayerHit();
                    if (this.hp <= 0) {
                        this.gameOver = true;
                        if (this.options.onGameOver) this.options.onGameOver();
                    }
                }
                }
            }
        }
    }

    // Animate water drops + check collision
    for (let i = this.waterDrops.length - 1; i >= 0; i--) {
      const drop = this.waterDrops[i];
      if (!drop.parent) {
        this.waterDrops.splice(i, 1);
        continue;
      }

      drop.rotation.y += delta * 1.5;
      drop.rotation.x += delta * 0.8;

      // Bobbing
      const offset = Math.sin(time * 2 + i) * 0.3;
      const dir = drop.position.clone().normalize();
      drop.position.copy(dir.multiplyScalar(22 + offset));

      // Collision check
      if (this.player && this.player.getPosition && drop.position.distanceTo(this.player.getPosition()) < 2.5) {
        this.scene.remove(drop);
        this.waterDrops.splice(i, 1);
        this.collectWater();
      }
    }

    // Lighthouse light rotation
    if (this.lighthouseLight) {
      this.lighthouseLight.intensity = 2 + Math.sin(time * 3) * 1;
    }
    if (this.lighthouseTop) {
      this.lighthouseTop.rotation.y += delta * 0.5;
    }

    // Ocean shimmer
    if (this.ocean) {
      this.ocean.rotation.z += delta * 0.1;
    }

    // Stars subtle rotation
    if (this.stars) {
      this.stars.rotation.y += delta * 0.005;
    }

    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this._onResize);
    if (this.container && this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
    if (this.voiceController && this.voiceController.stop) this.voiceController.stop();
    if (this.player && this.player.dispose) this.player.dispose();
  }
}
