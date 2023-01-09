/* global THREE: false */

export default class Box {
  constructor (size = new THREE.Vector3(1, 1, 1), color = Math.floor(Math.random() * (1 << 24))) {
    const loader = new THREE.TextureLoader();
    // const texture = loader.load('../textures/waternormals.jpg');

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(size.x, size.y, size.z),
       new THREE.MeshPhongMaterial({
         color : color,
        //  map : texture
         
        }));

    this.mesh.size = size;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;



    return this.mesh
  }
}