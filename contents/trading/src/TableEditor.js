import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved, get}
from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.14.0/firebase-database.js";


export default class TableEditor{
    constructor(tableId){
        this.tableId = tableId;
    }

    createTranTable = (db) => {
        let tableContent = '<tr>';
         
        this.tmpTableContent = [];
        let i = 0;
        let pre = 0;
        onChildAdded(db, (obj) => {
            let data = obj.val();
            localStorage.setItem("tmp", JSON.stringify(data));
            this.tmpTableContent.push(JSON.parse(localStorage.getItem("tmp")))
            i += 1;
            pre = i;
            console.log(i)
        })
        
        setTimeout(function(){console.log(this.tmpTableContent)
    },3000);


        

        // $(`#${this.tableId}`).html(
            `<td>登録日</td>
            <td>ID</td>
            <td>商品名</td>
            <td>買先</td>
            <td>買価格</td>
            <td>売先</td>
            <td>売価格</td>
            <td>数量</td>
            <td>ステータス</td>
            <td>詳細</td>
            <td>編集</td>`
        // )
    }
}