import App from './app.js'

const startButton = document.getElementById('startButton');

function init(){
    startButton.remove();
    const app = new App();

    let comment = "キーボードの↓↑→←を押すと、ウルフが動きます(暫く時間が経つと動かなくなるので要リロード)。<br> "
    comment += "カメラは２つ切り替え可能。C（遠い視点）、W（1人称視点、Wを長押し中に画面をクリックすれば、キーボードの↓↑→←を押すとウルフ視点で動きます）<br>"
    comment += "ディスプレイに近づくとディスプレイ上部にコーンが出ますので、コーンをクリックすると画面が遷移します。<br>"

    $("#exp").html(comment)

    app.init();
};

startButton.addEventListener('click', init);




