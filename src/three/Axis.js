
export default class Axis{
    constructor(position = new THREE.Vector3(0, 0, 0), length = 300){
        this.axis = new THREE.AxesHelper(length);
        this.axis.position.set(position.x, position.y, position.z); 
        return this.axis;
    }
}