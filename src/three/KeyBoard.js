
export default class KeyBoard {
    constructor(){
        
        // キーの状態を格納するobject
        this.keys = {};
        
        // キーが押された場合、trueを格納する
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            e.preventDefault();
            e.stopPropagation();
        });

        // キーが話された場合、falseを格納する
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            e.preventDefault();
            e.stopPropagation();
        });
    }

        // キーの状態取得 true or false
        getKey = (code) => {
            return this.keys[code];
        }

        // キーの状態判定 ture or false
        isPressEnter = () => this.getKey("Enter")
        isPressSpace = () => this.getKey("Space")
        isPressA = () => this.getKey("KeyA")
        isPressD = () => this.getKey("KeyD")
        isPressW = () => this.getKey("KeyW")
        isPressS = () => this.getKey("KeyS")
        isPressC = () => this.getKey("KeyC")
        isPressLeft = () => this.getKey("ArrowLeft")
        isPressRight = () => this.getKey("ArrowRight")
        isPressUp = () => this.getKey("ArrowUp")
        isPressDown = () => this.getKey("ArrowDown")

        // 初期化
        init = () => {
            this.keys['ArrowLeft'] = false;
            this.keys['ArrowRight'] = false;
            this.keys['ArrowUp'] = false;
            this.keys['ArrowDown'] = false;
        }
        


    
}