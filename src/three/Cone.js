/* global THREE: false */

export default class Cone {
    constructor (radius, height, radiusSegments = 10, heightSegments = 5, color = 0x6699FF) {
      this.mesh = new THREE.Mesh(new THREE.ConeGeometry(radius, height, radiusSegments, heightSegments), new THREE.MeshPhongMaterial({ color }))
      this.mesh.radius = radius
      this.mesh.height = height
      this.mesh.receiveShadow = true
      this.mesh.castShadow = true
      return this.mesh
    }
  }