let input=document.getElementById("input");
let from=document.getElementById("from");
let to=document.getElementById("to");
let result=document.getElementById("result");
let historyList=document.getElementById("historyList");
let clacBtn=document.getElementById("calc-btn");


function createOption(x,y,z){
    let o=document.createElement("option");
    let t=document.createTextNode(y);
    o.setAttribute("value",toNum(z));
    o.appendChild(t);
    x.appendChild(o);
}
function toNum(x){
    return Number(x.replace(",",""));
}
for(x in data.rates){
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
    // console.log(x,data.rates[x]);
}
let id=1;
let key=Object.keys(localStorage);
console.log("key="+key);
let lastkey=key[key.length-1];
console.log("lastkey="+lastkey);
if(key!=""){
    id=Number(lastkey.substring(6,7))+1;
}
// if(id>1){
//     // id=Number(Object.keys(localStorage)[Object.keys(localStorage).length-1])+1;
    
// }
function createTr(x){
    let rowSpacer=document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }
    

    let tr=document.createElement("tr");

    x.map(function(el){
        let td=document.createElement("td");
        let text=document.createTextNode(el);
    
        td.appendChild(text);
        tr.appendChild(td);
    });
    let td=document.createElement("td");
    let btn=document.createElement("button");
    let btnText=document.createTextNode("Delete");
    btn.appendChild(btnText);
    btn.setAttribute("class","btn");
    btn.setAttribute("onclick","DeleteRow("+id+")");
    // td.setAttribute("id","DeleteBtn");
    td.appendChild(btn);
    tr.appendChild(td);
    

    tr.setAttribute("id","Tr"+id);
    // document.getElementById("DeleteBtn").addEventListener("click",DeleteRow(id));

    // id++;
   historyList.appendChild(tr);
}

function DeleteRow(x){
    localStorage.removeItem("record"+x);
    let current=document.getElementById("Tr"+x);
    current.remove();
    let count=localStorage.length;
    if(count==0){
        historyList.innerHTML=`<tr id="rowSpacer"><td colspan="5">There is no Record</td></tr>`;
        id=1;
    }
}

function store(x){
    localStorage.setItem("record"+x,historyList.innerHTML);
    console.log("record"+x+"  stored");
    id++;
}
 
// document.getElementById("calc").addEventListener("submit",function(e){
    clacBtn.addEventListener("click",function(e){
    e.preventDefault();    
    //get state
        let x=input.value;
        let y=from.value;
        let z=to.value;
        console.log(x,y,z);

        //process
        let fromText=x+from.options[from.selectedIndex].innerText;
        let toText=to.options[to.selectedIndex].innerText;
        let first=x*y;
        // console.log(first);
        let second=first/z;
        let res=second.toFixed(2);
        
        // console.log(second.toFixed(2));
        let date=new Date().toLocaleString();
        let arr=[date,fromText,toText,res];
        createTr(arr);
        store(id);
        
        //  id++;
        //set state
        result.innerHTML=res;
        input.value="";
        input.focus();
        from.value="";
        to.value="1";
        
});

(function(){
    let count=localStorage.length;
    console.log(count);
    let i=count;
    if(localStorage.getItem("record"+i)){
        
           console.log(localStorage.getItem("record"+i));
           historyList.innerHTML+=localStorage.getItem("record"+i);
         
       
    }else{
        historyList.innerHTML=`<tr id="rowSpacer"><td colspan="5">There is no Record</td></tr>`;
        id=1;
    }
})();
function test(){
    // console.log(from.options[from.selectedIndex].innerText);
}
function changeMode(){
    document.body.classList.toggle("night-mode");
    document.getElementById("modeIcon").classList.toggle("fa-sun")
}