
export default class PhysicsWorld {
    constructor(gravVec3 = new Ammo.btVector3(0, -9.8, 0)){
        this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
        this.overlappingPairCache = new Ammo.btDbvtBroadphase();
        this.solver = new Ammo.btSequentialImpulseConstraintSolver();
        this.dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(
            this.dispatcher, 
            this.overlappingPairCache, 
            this.solver, 
            this.collisionConfiguration
        );
        
        //重力の初期設定
        this.dynamicsWorld.setGravity(gravVec3);

        return this.dynamicsWorld
    };

    // 物理世界のシミュレーションを更新する
    update = (deltaTime) => {
        this.dynamicsWorld.stepSimulation(deltaTime, 10);
    };

}