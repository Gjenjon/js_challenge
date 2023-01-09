
export default class Ground{
    constructor(size = new Ammo.btVector3(10, 1, 10), pos = new Ammo.btVector3(0, -1, 0)){
        // 初期状態の設定
        this.form = new Ammo.btTransform();

        // 初期化する
        this.form.setIdentity();
        
        // 初期座標を設定する
        this.form.setOrigin(pos);

        // 剛体を作成する。
        this.ground = new Ammo.btRigidBody(
            // 剛体を設定する
            new Ammo.btRigidBodyConstructionInfo(
            0,  // 質量を0にすることで、質量無限大＝動かなくなる
            new Ammo.btDefaultMotionState(this.form),  // 初期状態
            new Ammo.btBoxShape(size), // 箱の形状。一辺が指定値の2倍になる
            new Ammo.btVector3(0, 0, 0) // 慣性モーメント=物体の回転のしにくさ。地面は動かないので全部0
            )
        );
        
        // 反発係数を設定
        this.ground.setRestitution(1);

        // 摩擦係数を設定
        this.ground.setFriction(1);

        return this.ground;

    }
}

