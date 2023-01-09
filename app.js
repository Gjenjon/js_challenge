// import 記入
// Three
import Camera from './src/three/Camera.js';
import Clock from './src/three/Clock.js'
import PhysicsWorld from './src/ammo/PhysicsWorld.js'
import DirectionalLight from './src/three/DirectionalLight.js';
import Axis from './src/three/Axis.js';
import Grid from './src/three/Grid.js';
import Scene from './src/three/Scene.js';
import Render from './src/three/Render.js';
import Box from './src/three/Box.js';
import Plane from './src/three/Plane.js';
import Sphere from './src/three/Sphere.js';
import KeyBoard from './src/three/KeyBoard.js';
import Cone from './src/three/Cone.js';


// Ammo
import phyGround from './src/ammo/Ground.js';
import phySphere from './src/ammo/Sphere.js';
import phyBox from './src/ammo/Box.js';

import  {PointerLockControls } from "./src/three/PointerLockControls.js"

// FBX
//import {FBXLoader} from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/FBXLoader.js";



//　App Class

export default class App {
    
    // 初期動作
    init = async () => {


        // アニメーション用時間
        this.clock = new Clock();

        // key判定準備
        this.keyboard = new KeyBoard();
        this.keyboard.init();

        //移動速度と移動方向の定義
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();

        // *********** 3D世界の作成 *********** //
        this.scene = new Scene();
        // this.threeWorld = new ThreeWorld(this.onResize);

        // レンダラー
        this.renderer = new Render(this.onResize);

        // カメラ
        const eye = new THREE.Vector3(0, 50, -150);
        const lookAt = new THREE.Vector3(0, 0, 0);
        this.camera = new Camera(eye, lookAt);

        // コントロールカメラ
        const debugEye = new THREE.Vector3(20, 40, 40);
        const debugLookAt = new THREE.Vector3(0, 0, 0);
        this.controlCamera = new Camera(debugEye, debugLookAt, 1, 4000);
        this.controls = new THREE.OrbitControls(this.controlCamera, document.querySelector('#canvas'));

        // FPSカメラ
        this.fpsCamera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
        this.fpsCamera.position.set(3, 4, 5);
        this.fps = new PointerLockControls(this.fpsCamera, this.renderer.domElement);

        // 平行光
        this.directionalLight = new DirectionalLight();

        // 軸
        this.axis = new Axis();

        //グリッド
        this.grid = new Grid();

        //物体・シーンへの追加
        const gltfLoader = new THREE.GLTFLoader();

            // 地面
            this.groundSize = new THREE.Vector3(60, 0.2, 60);
            this.ground = new Box(this.groundSize , new THREE.Color("rgb(245, 245, 220)"));
            this.ground.position.set(0, 0, 0);
            this.scene.add(this.ground);

            // フローリング
            // this.fbxLoader = new FBXLoader();
            // this.fbxLoader.load('./model/Floor/Floor.FBX', (data) => {
            // this.floor = data.scene;
            // this.floor.position.set(0,4,2);
            // this.scene.add(this.floor);
            // });


            // 球
            const radSphere = 2; 
            const massSphere = 1;
            this.sphere = new Sphere(radSphere, 0xff0000);
            this.sphere.position.set(-5, 10, -5);
            this.scene.add(this.sphere);

            // 球
            const radSphere1 = 1; 
            const massSphere1 = 1;
            this.sphere1 = new Sphere(radSphere1, 0xff0000);
            this.sphere1.position.set(25, 10, 5);
            this.scene.add(this.sphere1);

            // 球
            const radSphere2 = 3; 
            const massSphere2 = 1;
            this.sphere2 = new Sphere(radSphere2, 0xff0000);
            this.sphere2.position.set(-15, 10, 15);
            this.scene.add(this.sphere2);


            // テーブル
            this.tableHeight = 4;
            this.tableWidth = 8.5;
            this.tableDepth = 2.8;  

            for(let i=0; i<3; i++){
                gltfLoader.load('./model/Table/table.glb', (data) => {
                    let table = data.scene;
                    table.scale.set(1, 1, 1);
                    table.rotation.set(0, Math.PI/2, 0);
                    table.position.set((i - 1) * this.tableWidth, 2, -this.tableDepth);
                    this.scene.add(table);
                });
            };

            for(let i=0; i<3; i++){
                gltfLoader.load('./model/Table/table.glb', (data) => {
                    let table = data.scene;
                    table.scale.set(1, 1, 1);
                    table.rotation.set(0, Math.PI/2, 0);
                    table.position.set((i - 1) * this.tableWidth, 2, 0);
                    this.scene.add(table);
                });
            };

            // テーブルガイドBox
            this.tableGuideBoxSize = new THREE.Vector3(this.tableWidth * 3, this.tableHeight, this.tableDepth * 2);
            this.tableGuideBox = new Box(this.tableGuideBoxSize , new THREE.Color("rgb(165, 42, 42)"));
            this.tableGuideBox.position.set(-0.8, this.tableHeight/2, 0);
            this.tableGuideBox.receiveShadow = false;
            this.tableGuideBox.castShadow = false;
            this.tableGuideBox.material.transparent = true;
            this.tableGuideBox.material.alphaToCoverage = true; 
            this.tableGuideBox.material.opacity = 0;
            this.scene.add(this.tableGuideBox);


            // ロッカー
            this.lockerHeight = 7;
            this.lockerWidth = 6;
            this.lockerDepth = 2.8;  

            for(let i=0; i<3; i++){
                gltfLoader.load('./model/Locker/locker.glb', (data) => {
                    let locker = data.scene;
                    locker.scale.set(1, 1, 3);
                    locker.rotation.set(0, 0, 0);
                    locker.position.set(-25, 4, - i * this.lockerWidth - 10);
                    this.scene.add(locker);
                });
            };

            // ロッカーガイドBox
            this.lockerGuideBoxSize = new THREE.Vector3(this.lockerDepth, this.lockerHeight, this.lockerWidth * 3 );
            this.lockerGuideBox = new Box(this.lockerGuideBoxSize , new THREE.Color("rgb(165, 42, 42)"));
            this.lockerGuideBox.position.set(-25, 4, -16);
            this.lockerGuideBox.receiveShadow = false;
            this.lockerGuideBox.castShadow = false;
            this.lockerGuideBox.material.transparent = true;
            this.lockerGuideBox.material.alphaToCoverage = true; 
            this.lockerGuideBox.material.opacity = 0.5;
            this.scene.add(this.lockerGuideBox);

            // ロッカー
            this.treeHeight = 7;
            this.treeWidth = 6;
            this.treeDepth = 2.8;  

            for(let i=0; i<1; i++){
                gltfLoader.load('./model/Tree/tree.glb', (data) => {
                    let obj = data.scene;
                    obj.scale.set(5, 5, 5);
                    obj.rotation.set(0, 0, 0);
                    obj.position.set(25, 0, - i * this.treeWidth - 22);
                    this.scene.add(obj);
                });
            };
            


            // モニター

            gltfLoader.load('./model/Monitor/monitor.glb', (data) => {
            this.monitor = data.scene;
            this.monitor.position.set(0,this.tableHeight,0);
            this.scene.add(this.monitor);

            this.clone = this.monitor.clone();

            });

            // ウルフガイドボックス
                this.wolfInitPos = new THREE.Vector3(0, 0, 8.5);
                this.wolfGuideBoxSize = new THREE.Vector3(3, 5, 9);
                this.wolfGuideBox = new Box(this.wolfGuideBoxSize , new THREE.Color("rgb(165, 42, 42)"));
                this.wolfGuideBox.position.set(this.wolfInitPos.x, this.wolfInitPos.y, this.wolfInitPos.z);
                this.wolfGuideBox.receiveShadow = false;
                this.wolfGuideBox.castShadow = false;
                this.wolfGuideBox.material.transparent = true;
                this.wolfGuideBox.material.alphaToCoverage = true; 
                this.wolfGuideBox.material.opacity = 0.5;
                let wolfGroup = new THREE.Group();
                wolfGroup.add(this.wolfGuideBox);
                // this.scene.add(this.wolfGuideBox);
                let actions = [];

            //　ウルフ
                gltfLoader.load('./model/Wolf/Wolf-Blender-2.82a.glb', (data) => {
                    this.wolf = data;
                    data.scene.scale.set(8, 8, 8);
                    data.scene.position.set(0, -2.4, 9);
                    data.scene.rotation.set(0, Math.PI, 0)

                    // AnimationMixerを作成
                    this.mixer = new THREE.AnimationMixer(data.scene);

                    //　待つ姿勢をデフォルトにする
                    this.action = this.mixer.clipAction(data.animations[4]);
                    this.action.play();
                    wolfGroup.add(data.scene);
                    // this.scene.add(data.scene);
                });
                this.wolfGroup = wolfGroup;
                this.scene.add(this.wolfGroup)

            // PC表示
            this.cone = new Cone(0.4, 2);
            this.cone.position.set(0,this.tableHeight + 5,2);
            this.cone.rotation.set(0, 0, Math.PI);
            this.cone.receiveShadow = false;
            this.cone.castShadow = false;
            this.cone.material.transparent = true;
            this.cone.material.alphaToCoverage = true;
            this.cone.material.opacity = 0;
            this.cone.name = "indicator";
 
            this.scene.add(this.cone);



        // 物体以外シーンへの追加
        this.scene.add(this.camera);
        this.scene.add(this.camera.helper);

        this.scene.add(this.directionalLight);

        this.scene.add(this.axis);

        //this.scene.add(this.box);
    

        //this.scene.add(this.plane);

    
        // *********** 物理世界の作成 *********** //
        this.physicsWorld = new PhysicsWorld();

        // 地面
        this.phyGround = new phyGround(
            new Ammo.btVector3(this.groundSize.x / 2, this.groundSize.y / 2 , this.groundSize.z / 2),
            new Ammo.btVector3(this.ground.position.x, this.ground.position.y, this.ground.position.z)
            );

        // 球体
        this.phySphere = new phySphere(radSphere, massSphere, new Ammo.btVector3(this.sphere.position.x, this.sphere.position.y, this.sphere.position.z));
        this.phySphere1 = new phySphere(radSphere1, massSphere1, new Ammo.btVector3(this.sphere1.position.x, this.sphere1.position.y, this.sphere1.position.z));
        this.phySphere2 = new phySphere(radSphere2, massSphere2, new Ammo.btVector3(this.sphere2.position.x, this.sphere2.position.y, this.sphere2.position.z));


        // デスク
        this.phyTable = new phyGround(
            new Ammo.btVector3(this.tableWidth * 3 / 2, this.tableHeight / 2 , this.tableDepth * 2 / 2),
            new Ammo.btVector3(this.tableGuideBox.position.x, this.tableGuideBox.position.y, this.tableGuideBox.position.z)
            );

        // ロッカー
            this.phyLocker = new phyGround(
            new Ammo.btVector3(this.lockerDepth /2 , this.lockerHeight /2, this.lockerWidth * 3 /2 ),
            new Ammo.btVector3(this.lockerGuideBox.position.x, this.lockerGuideBox.position.y, this.lockerGuideBox.position.z)
            );
            console.log()

         // ウルフ
         this.phyWolf = new phyBox(
            new Ammo.btVector3(this.wolfGuideBoxSize.x/2, this.wolfGuideBoxSize.y - 0.1 , this.wolfGuideBoxSize.z / 2),
            new Ammo.btVector3(this.wolfGuideBoxSize.x, this.wolfGuideBoxSize.y, this.wolfGuideBoxSize.z),
            0.5
            );


        // 物理世界への追加
        this.physicsWorld.addRigidBody(this.phyGround);
        this.physicsWorld.addRigidBody(this.phySphere);
        this.physicsWorld.addRigidBody(this.phySphere1);
        this.physicsWorld.addRigidBody(this.phySphere2);
        this.physicsWorld.addRigidBody(this.phyTable);
        this.physicsWorld.addRigidBody(this.phyLocker);
        this.physicsWorld.addRigidBody(this.phyWolf);

            
        // 処理ループ
        this.loop()

    } 



    // 関数
    onResize = () =>  {
        this.renderer.resize();
    
        const cameras = [this.camera, this.controlCamera];
        for (let camera of cameras) {
          camera.resize()
        };
        this.sprite.onResizeWindow();
    };

    loop = (frame) => {
        requestAnimationFrame(this.loop);
        this.render(frame);
    };

    render = (frame) => {
        const {delta, time} = this.clock.update();

        // this.fps.move(delta);

        this.controler(this.phyWolf);
        // this.controler(this.phySphere);
        // キーイベントによる加速度付与
        // const onKeyDown = (e) => {
        //     switch(e.code){
        //         case "KeyW":
        //             this.phySphere.setLinearVelocity(new Ammo.btVector3(0,0,10));
        //             break;
        //     };
        // }
        
        // document.addEventListener("keydown", onKeyDown);
        // document.addEventListener("keyup", onKeyup)

        // 物理世界の更新
        this.physicsWorld.stepSimulation(delta, 10);
        // this.physicsWorld.update(delta);


        // シミュレーション結果の取得
        let updateTrans = new Ammo.btTransform();
        this.phySphere.getMotionState().getWorldTransform(updateTrans);

        let updateTrans1 = new Ammo.btTransform();
        this.phySphere1.getMotionState().getWorldTransform(updateTrans1);

        let updateTrans2 = new Ammo.btTransform();
        this.phySphere2.getMotionState().getWorldTransform(updateTrans2);

        let updateTransWolf = new Ammo.btTransform();
        this.phyWolf.getMotionState().getWorldTransform(updateTransWolf);

        // シミュレーション結果の格納
        this.sphere.position.set(
            updateTrans.getOrigin().x(),
            updateTrans.getOrigin().y(),
            updateTrans.getOrigin().z()
        );

         // 3Dエンジン側の球の転がり具合をセット
         this.sphere.quaternion.set(
            updateTrans.getRotation().x(),
            updateTrans.getRotation().y(),
            updateTrans.getRotation().z(),
            updateTrans.getRotation().w()
        );

         // シミュレーション結果の格納
         this.sphere1.position.set(
            updateTrans1.getOrigin().x(),
            updateTrans1.getOrigin().y(),
            updateTrans1.getOrigin().z()
        );

         // 3Dエンジン側の球の転がり具合をセット
         this.sphere1.quaternion.set(
            updateTrans1.getRotation().x(),
            updateTrans1.getRotation().y(),
            updateTrans1.getRotation().z(),
            updateTrans1.getRotation().w()
        );

         // シミュレーション結果の格納
         this.sphere2.position.set(
            updateTrans2.getOrigin().x(),
            updateTrans2.getOrigin().y(),
            updateTrans2.getOrigin().z()
        );

         // 3Dエンジン側の球の転がり具合をセット
         this.sphere2.quaternion.set(
            updateTrans2.getRotation().x(),
            updateTrans2.getRotation().y(),
            updateTrans2.getRotation().z(),
            updateTrans2.getRotation().w()
        );
        
        this.wolfGroup.position.set(
            updateTransWolf.getOrigin().x() + 0,
            updateTransWolf.getOrigin().y() - 2.5,
            updateTransWolf.getOrigin().z() - 9
        );

            

        // console.log(updateTransWolf.getOrigin().x(),
        //     updateTransWolf.getOrigin().y(),
        //     updateTransWolf.getOrigin().z()
        // )

        // console.log(this.wolfGroup.position        )

        // PCへの接近・画面遷移
        //console.log(updateTrans.getOrigin().x()**2 + updateTrans.getOrigin().y()**2 + updateTrans.getOrigin().z()**2)
        let norm = updateTransWolf.getOrigin().x()**2 + updateTransWolf.getOrigin().y()**2 + updateTransWolf.getOrigin().z()**2;
        if ( norm < 100){
            // 表示の出現
            this.cone.material.opacity = 85/norm;
            this.cone.rotation.y += 0.1;
            this.cone.position.y += Math.sin(this.cone.rotation.y) / 50;

            //マウスアクション
            window.addEventListener('mousedown', (event) => {
            // 画面上のマウスクリック位置
            let x = event.clientX;
            let y = event.clientY;
            
            // マウスクリック位置を正規化
            let mouse = new THREE.Vector2();
            mouse.x =  ( x / window.innerWidth ) * 2 - 1;
            mouse.y = -( y / window.innerHeight ) * 2 + 1;
            
            // Raycasterインスタンス作成
            let raycaster = new THREE.Raycaster();
            // 取得したX、Y座標でrayの位置を更新
            raycaster.setFromCamera( mouse, this.controlCamera );
            // オブジェクトの取得
            let intersects = raycaster.intersectObjects( this.scene.children );
            // インジケータをクリックしたら別ページに遷移s
            if (intersects[0].object.name == "indicator"){
                window.open("links.html")
            }

        });

        } else{
            // 表示の消失
            this.cone.material.opacity = 0;
        };


 
        // console.log(" sphere pos = " + 
        //                 [updateTrans.getOrigin().x().toFixed(2), 
        //                  updateTrans.getOrigin().y().toFixed(2), 
        //                  updateTrans.getOrigin().z().toFixed(2)]
        //             );

        //console.log(this.keyboard.isPressEnter())



        // アニメーション
        if(this.keyboard.isPressSpace()){
            this.pastAction = this.action;
            this.pastAction.stop();
            this.action = this.mixer.clipAction(this.wolf.animations[3]);
            this.action.play()
            //this.action.fadeIn(0.5);
            
        } else if(this.keyboard.isPressLeft() || this.keyboard.isPressRight() || this.keyboard.isPressUp() || this.keyboard.isPressDown()){
            this.pastAction = this.action;
            this.pastAction.stop();
            this.action = this.mixer.clipAction(this.wolf.animations[0]);
            
            this.action.play()

            //this.action.fadeIn(0.5);
         } else{
            if (this.mixer) this.mixer.update(delta);

         };

        if(this.keyboard.isPressC()){
            this.renderer.render(this.scene, this.camera);
        } else if(this.keyboard.isPressW()){
            this.renderer.render(this.scene, this.fpsCamera);
            window.addEventListener("click", () => {
                this.fps.lock();
              })

              if(this.fps.isLocked){
                
                //移動速度と移動方向の定義
                const velocity = new THREE.Vector3();
                const direction = new THREE.Vector3();

                // 前進後進判定
                direction.z = Number(this.keyboard.isPressUp()) - Number(this.keyboard.isPressDown());
                direction.x = Number(this.keyboard.isPressRight()) - Number(this.keyboard.isPressLeft());
                //減衰
                velocity.z -= velocity.z * 5.0 * delta;
                velocity.x -= velocity.x * 5.0 * delta;
            
            
                if(this.keyboard.isPressUp() || this.keyboard.isPressDown()){
                  velocity.z -= direction.z * 200 * delta; 
                }
            
                if(this.keyboard.isPressRight() || this.keyboard.isPressLeft()){
                  velocity.x -= direction.x * 200 * delta; 
                }
            
                this.fps.moveForward(-velocity.z * delta);
                this.fps.moveRight(-velocity.x * delta);
                console.log(velocity)

                //ウルフの移動
                this.wolfGroup.position.set(
                    updateTransWolf.getOrigin().x() -velocity.x * delta,
                    updateTransWolf.getOrigin().y(),
                    updateTransWolf.getOrigin().z() -velocity.z * delta
                );

                
                

            
              }
        } else{
            this.renderer.render(this.scene, this.controlCamera);
        }
        // this.renderer.render(this.scene, this.camera);

    };

    // 物体を動かすコントローラ
    controler = (objAmmo) => {
        
        if(this.keyboard.isPressDown()){
        // z軸（青）プラス方向
            objAmmo.setLinearVelocity(new Ammo.btVector3(0,0,5));
        }
        // z軸（青）マイナス方向
        else if(this.keyboard.isPressUp())
        {
            objAmmo.setLinearVelocity(new Ammo.btVector3(0,0,-5));
        } 
        // x軸（赤）マイナス方向
        else if(this.keyboard.isPressLeft())
        {
            objAmmo.setLinearVelocity(new Ammo.btVector3(-5,0,0));
        } 
        // x軸（赤）プラス方向
        else if(this.keyboard.isPressRight())
        {
            objAmmo.setLinearVelocity(new Ammo.btVector3(5,0,0));
        }
        // y軸（緑）プラス方向
        else if(this.keyboard.isPressSpace())
        {
            objAmmo.setLinearVelocity(new Ammo.btVector3(0,5,0));
        };

    }






  
 




    

    
}