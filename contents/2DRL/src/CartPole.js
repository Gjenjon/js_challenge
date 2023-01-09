/**
 * http://incompleteideas.net/book/code/pole.cにもとづく実装
 */

/**
*   カートポールシステムシュミレーター
*
*   制御理論の観点から言うと、このシステムには４つの状態変数がある。
*
*   ー　x：カートの１D 位置
*   ー　xDot：カートの速度
*   ー　theta：ボールの角度（ラジアン単位）、値０は垂直位置に対応する。
*   ー　thetaDot：ポールの角速度
*
*   システムは単一の行動によって制御される。
*
*   ー　左方向か、右方向か
*/

class CartPole{
    /**
     * CartPoleのコンストラクタ
     */

    constructor(){
        // システムを特徴づける定数
        this.gravity = 9.8;
        
        this.massCart = 1.0;
        this.massPole = 0.1;
        this.totalMass = this.massCart + this.massPole;
        
        this.cartWidth = 0.2;
        this.cartHeight = 0.1;
        this.length = 0.5;
        this.poleMoment = this.massPole * this.length;
        this.forceMag = 10.0;
        
        this.tau = 0.02; //状態を更新する間隔の秒数
        
        // 閾値、シミュレーションの失敗
        this.xThreshold = 2.4;
        this.thetaTheshold = 12 / 360 * 2 * Math.PI;

        this.setRandomState();
    }

    setRandomState(){
        /**
         * カートポールシステムの状態をランダムに設定する。
         */

        // カートの位置（メートル）
        this.x = Math.random() - 0.5;

        // カートの速度
        this.xDot = (Math.random() - 0.5) * 1;

        // ポール角度（ラジアン）
        this.theta = (Math.random() - 0.5) * 2 * (6 / 360 * 2 * Math.PI);

        // ポールの角速度
        this.thetaDot = (Math.random() - 0.5) * 0.5;
    }

    getStateTensor(){
        /**
         * 現在の状態をshape[1 ,4]のtf.Tensorとして取得
         */
        return tf.tensor2d([
            [this.x, this.xDot, this.theta, this.thetaDot]
        ])
    }

    update(action){
        /**
         * カートポールシステムの行動による更新
         */
        const force = action > 0 ? this.forceMag : -this.forceMag;

        const cosTheta = Math.cos(this.theta);
        const sinTheta = Math.sin(this.theta);

        const temp = (force + this.poleMoment * this.thetaDot * this.thetaDot * sinTheta) / this.totalMass;
        const thetaAcc = (this.gravity * sinTheta - cosTheta * temp) / (this.length * (4 / 3 - this.massPole * cosTheta * cosTheta / this.totalMass));
        const xAcc = temp - this.poleMoment * thetaAcc * cosTheta / this.totalMass;
        
        //4状態変数をオイラー法を用いて更新
        this.x += this.tau * this.xDot;
        this.xDot += this.tau * xAcc;
        this.theta += this.tau * this.thetaDot;
        this.thetaDot += this.tau * thetaAcc;

        return this.isDone();
    }

    isDone(){
        /**
         * シミュレーションを終えるかの判断
         */

        return this.x < -this.xThreshold || this.x > this.xThreshold || this.theta < -this.thetaTheshold || this.theta > this.thetaTheshold;
    }


}


