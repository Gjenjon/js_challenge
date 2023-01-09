/* global THREE: false */

export default class Sphere {
  constructor (radius, color = Math.floor(Math.random() * (1 << 24))) {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 20, 20), 
      new THREE.MeshLambertMaterial({
        color : color,
        wireframe: true,
        wireframeLinewidth: 0.2 
        }))

    this.mesh.radius = radius
    this.mesh.receiveShadow = true
    this.mesh.castShadow = true
    return this.mesh
  }
}