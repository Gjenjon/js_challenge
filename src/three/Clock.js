
export default class Clock {
    constructor(){
        this.time = 0;
        this.clock = new THREE.Clock();
    };

    update = () => {
        const delta = this.clock.getDelta();
        this.time =+ delta;
        return {delta, time: this.time};
    }

}