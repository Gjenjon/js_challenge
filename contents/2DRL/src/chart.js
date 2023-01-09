

export default class lineChart{
    constructor(id, labels, data, label){
        const context = document.querySelector(`#${id}`).getContext('2d');
        this.chart = new Chart(context, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: label,
              data: data,
              borderColor: 'rgb(25, 99, 132)',
            }],
          },
          
          options: {
            responsive: false,
            animation: false,
            legend: {
                display: false
            },
            scales: {                          // 軸設定
                xAxes: [                           // Ｘ軸設定
                    {
                        scaleLabel: {                 // 軸ラベル
                            display: true,                // 表示設定
                            labelString: '学習回数',    // ラベル
                            fontColor: "red",             // 文字の色
                            fontFamily: "sans-serif",
                            fontSize: 16                  // フォントサイズ
                        },
                        // gridLines: {                   // 補助線
                        //     color: "rgba(255, 0, 0, 0.2)", // 補助線の色
                        // },
                        // ticks: {                      // 目盛り
                        //     fontColor: "red",             // 目盛りの色
                        //     fontSize: 14                  // フォントサイズ
                        // }
                    }
                ],
                yAxes: [                           // Ｙ軸設定
                    {
                        scaleLabel: {                  // 軸ラベル
                            display: true,                 // 表示の有無
                            labelString: 'ステップ回数',     // ラベル
                            fontColor: "blue",             // 文字の色
                            fontFamily: "sans-serif",
                            fontSize: 16                   // フォントサイズ
                        },
                        // gridLines: {                   // 補助線
                        //     color: "rgba(0, 0, 255, 0.2)", // 補助線の色
                        //     zeroLineColor: "black"         // y=0（Ｘ軸の色）
                        // },
                        // ticks: {                       // 目盛り
                        //     min: 0,                        // 最小値
                        //     max: 25,                       // 最大値
                        //     stepSize: 5,                   // 軸間隔
                        //     fontColor: "blue",             // 目盛りの色
                        //     fontSize: 14                   // フォントサイズ
                        // }
                    }
                ]
            }
        }
    }   
    )}
       
        

    addData = (label, data) =>  {
        this.chart.data.labels.push(label);
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        this.chart.update();
    }

    removeData = () => {
        this.chart.data.labels.pop();
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        this.chart.update();
    }

    updateConfigByMutating = (title) => {
        this.chart.options.title.text = title;
        this.chart.update();
    }
    
    updateConfigAsNewObject = (options) => {
        this.chart.options = options;
        this.chart.update();
    }


}