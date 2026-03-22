import * as THREE from 'three';

export class Explosion {
  constructor(scene, position) {
    this.scene = scene;
    this.dead = false;
    this.particles = [];
    this.life = 1.0;

    const geo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff4400,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 1
    });

    for (let i = 0; i < 15; i++) {
      const p = new THREE.Mesh(geo, mat.clone());
      p.position.copy(position);
      // Random velocity
      p.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      this.scene.add(p);
      this.particles.push(p);
    }
  }

  update(delta) {
    if (this.dead) return;
    this.life -= delta * 2;
    if (this.life <= 0) {
      this.dead = true;
      this.particles.forEach(p => {
        if (p.parent) p.parent.remove(p);
      });
      return;
    }

    this.particles.forEach(p => {
      p.position.addScaledVector(p.userData.velocity, delta);
      p.material.opacity = this.life;
      p.scale.setScalar(this.life);
    });
  }
}
