// import 記入
// import Camera from './src/Camera.js';
import Clock from './src/three/Clock.js'
import PhysicsWorld from './src/ammo/PhysicsWorld.js'
// import DirectionalLight from './src/DirectionalLight.js';
// import Axis from './src/three/Axis.js';
// import Grid from './src/Grid.js';
// import Scene from './src/Scene.js';
// import Render from './src/Render.js';
// import Box from './src/Box.js';
// import Plane from './src/Plane.js';
// import Sphere from './src/Sphere.js';
import Ground from './src/ammo/Ground.js';
import Sphere from './src/ammo/Sphere.js';



//　App Class

export default class App {
    
    // 初期動作
    init = async () => {
        this.clock = new Clock();

    
        // 物理世界の作成
        this.physicsWorld = new PhysicsWorld();

        this.ground = new Ground();

        this.sphere = new Sphere(1, 1, new Ammo.btVector3(0, 10, 0));

    
        this.physicsWorld.addRigidBody(this.ground);
        this.physicsWorld.addRigidBody(this.sphere);

         // 物理エンジン実行後の座標を入れるためのオブジェクトを生成
         var trans = new Ammo.btTransform();

         // 60fpsで100フレーム分まわす
         for (var i = 0; i < 100; i++) {
            // 1フレーム分演算
            this.physicsWorld.stepSimulation(1/60, 0);
            // 演算後の球の位置がtransに入る
            this.sphere.getMotionState().getWorldTransform(trans);
            // 座標を出力
            console.log("sphere pos = " + 
                [trans.getOrigin().x().toFixed(2), 
                 trans.getOrigin().y().toFixed(2), 
                 trans.getOrigin().z().toFixed(2)]
            );
                }

        

        //requestAnimationFrame(this.loop)

    } 


    

     

   

    loop = (frame) => {
        requestAnimationFrame(this.loop)
        this.render(frame)
    }

    render = (frame) => {
        const {delta, time} = this.clock.update();
        //console.log(delta)

        //this.renderer.render(this.scene, this.controlCamera)
    }

    
}