
export default class Camera{
    constructor(eye, lookAt, near = 1, far = 20000, fov=45, aspect = window.innerWidth/window.innerHeight){
        // cameraの生成
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        
        // cameraの位置
        this.camera.position.set(eye.x, eye.y, eye.z);

        // cameraが見る位置
        this.camera.lookAt(lookAt);

        // camera helper
        this.camera.helper = new THREE.CameraHelper(this.camera);

        // 周回軌道上にてcameraを制御
        //this.camera.createControls = this.createControls.bind(this);

        // リサイズ
        this.camera.resize = this.resize.bind(this);

        return this.camera;
    }

    // createControls = () => {
    //     const canvasElement = document.querySelector('#canvas')
    //     this.camera.controls = new THREE.OrbitControls(this.camera, canvasElement)
    //     return this.camera.controls;
    // }

    // アスペクト比の修正
    resize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix(); 
    }


}