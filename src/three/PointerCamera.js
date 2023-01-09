import KeyBoard from "./KeyBoard.js";
import  {PointerLockControls } from "./PointerLockControls.js"


export default class PointerCamera{
    constructor(camera, renderer){
        this.controls = new PointerLockControls(camera, renderer);
        window.addEventListener("click", () => {
        controls.lock();
        
    })

        //前進か後進か変数宣言
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        //移動速度と移動方向の定義
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();

  }

  move = (delta) => {
        this.keyboard = new KeyBoard();
        this.moveForward = this.keyboard.isPressW();
        this.moveBackward = this.keyboard.isPressS();
        this.moveLeft = this.keyboard.isPressA();
        this.moveRight = this.keyboard.isPressD();

        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);

         //ポインターがONになったら
        if(this.controls.isLocked){
        //減衰
        this.velocity.z -= this.velocity.z * 5.0 * delta;
        this.velocity.x -= this.velocity.x * 5.0 * delta;


        if(this.moveForward || this.moveBackward){
            this.velocity.z -= this.direction.z * 200 * delta; 
        }

        if(this.moveRight || this.moveLeft){
            this.velocity.x -= this.direction.x * 200 * delta; 
        }

        this.controls.moveForward(-this.velocity.z * delta);
        this.controls.moveRight(-this.velocity.x * delta);
  }
    
    }


}