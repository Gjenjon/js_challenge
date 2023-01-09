/* global THREE: false */

export default class Plane {
  constructor (size = new THREE.Vector3(100, 100, 0), color = 0xffff00) {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(size.x, size.y), 
      new THREE.MeshBasicMaterial({ color }))

    return this.mesh
  }
}