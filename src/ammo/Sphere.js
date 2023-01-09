

export default class Sphere{
    constructor(r=10, mass=10, pos = new Ammo.btVector3(0, 0, 0)){
        this.form = new Ammo.btTransform();
        this.form.setIdentity();
        this.form.setOrigin(pos);
        
        // 半径rの球を設定
        this.sphere = new Ammo.btSphereShape(r);
        
        // 質量massで慣性モーメントを設定。質量が設定された剛体は以下2行で値を設定するのがお約束
        this.localInertia = new Ammo.btVector3(0, 0, 0);
        this.sphere.calculateLocalInertia(mass,this.localInertia);
        
        this.sphereBody = new Ammo.btRigidBody(
            new Ammo.btRigidBodyConstructionInfo(
                mass, // 質量
                new Ammo.btDefaultMotionState(this.form),   // 初期状態
                this.sphere, // 球の形状
                this.localInertia // 慣性モーメント
            )
        );
            
        // 反発係数を設定
        this.sphereBody.setRestitution(0.6);

        // 摩擦係数を設定
        this.sphereBody.setFriction(0.1);

        // 減衰率を設定
        this.sphereBody.setDamping(0, 0.05);

        // 回転制限（1の軸でしか回転しない）
        this.sphereBody.setAngularFactor(new Ammo.btVector3(1, 1, 1));

        // 滑り制限（1の軸でしか動かない。初期値には適用されない）
        this.sphereBody.setLinearFactor(new Ammo.btVector3(1, 1, 1 ));

        return this.sphereBody;

    }
}


