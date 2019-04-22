window.addEventListener("load",init);
function init(){
    bindEvents();
    totalRecords();
}
function bindEvents(){
    document.querySelector("#add").addEventListener("click",addRecord);
    document.querySelector("#delete").addEventListener("click",deleteRecord);
    document.querySelector("#search").addEventListener("click",searchRecord);
    document.querySelector("#update").addEventListener("click",updateRecord);
    document.querySelector("#sort").addEventListener("click",sortRecord);
    document.querySelector("#save").addEventListener("click",saveRecord);
    document.querySelector("#loadServer").addEventListener("click",loadFromServer);
    document.querySelector("#load").addEventListener("click",loadRecords);
}

function addRecord(){
    var item = new Items();
    for(let key in item){
        if(key=="marked"){
            continue;
        }

        item[key] = document.querySelector("#"+key).value;
    }
    itemOperations.add(item);
    console.log(item);
    printRecord(item);
    totalRecords();
}
function printRecord(item){
    var tb = document.querySelector("#tbody");
    var tr = tb.insertRow();
    var idx = 0;
    for(let key in item){
        if(key=="marked")
            continue;
        let cell = tr.insertCell(idx);
        cell.innerText=item[key];
        idx++;
    }
    let cell = tr.insertCell(idx);
    cell.appendChild(createIcon("fas fa-trash-alt",trash,item.id));
    cell.appendChild(createIcon("fas fa-edit",edit,item.id));
    // cell.appendChild('<i class="fas fa-trash-alt"></i>');
    // cell.appendChild('<i class="fas fa-edit"></i>');
}
function createIcon(cl, fn, id){
    var iTag = document.createElement("i");
    iTag.className=cl;
    iTag.addEventListener("click",fn);
    iTag.setAttribute("iTagID",id);
    return iTag;
}
function trash(){
    let id = this.getAttribute("iTagID");
    let tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    
    itemOperations.markUnmark(id);
    totalRecords();
}
var item;
function edit(){
    let id = this.getAttribute("iTagID");
    item = itemOperations.search(id);
    for (let key in item){
        if(key=="marked"){
            continue;
        }
        document.querySelector("#"+key).value = item[key];
    }
    console.log(id);
}
function totalRecords(){
    document.querySelector("#total").innerText="Total Records:"+itemOperations.items.length;
    document.querySelector("#marked").innerText=" Marked Records:"+itemOperations.countMarked();
    document.querySelector("#unmarked").innerText=" Unmarked Records:"+(itemOperations.items.length-itemOperations.countMarked());

}
function printTable(items){
    var tbody=document.querySelector("tbody");
    tbody.innerHTML='';
    items.forEach(item=>printRecord(item));
}
function deleteRecord(){
    var items = itemOperations.remove();
    printTable(items);
    totalRecords();
}
function searchRecord(){
    var sb = document.querySelector("#searchbox");
    sb.classList.toggle('showhide');
    if(sb.classList.contains('showhide')){
        var items = itemOperations.searchAll(document.querySelector("#searchkey").value ,document.querySelector("#searchvalue").value);
        printTable(items);
        totalRecords();
    }

}
function updateRecord(){
    for(let key in item){
        if(key=="marked"){
            continue;
        }
        item[key] = document.querySelector("#"+key).value;
    }
    printTable(itemOperations.items);
}
function sortRecord(){
    let items = itemOperations.sortRecord();
    printTable(items);
}
function saveRecord(){
    if(localStorage){
        localStorage.myitems = JSON.stringify(itemOperations.items);
    }
    else{
        console.log("No Local Storage...");
    }
}
function loadFromServer(){
    const url = 'https://raw.githubusercontent.com/ssandeep3/wd_cs3/master/mydata.JSON';
    var promise = fetch(url);
    promise.then(response  => {
        response.json().then(item=> {
            itemOperations.items=item.myitems;
            printTable(itemOperations.items);
            totalRecords();
        }
        ).catch(err=>{
            console.log("Data Not in JSON Format...",err);
        });
    }).catch(err=>{
        console.log("Server Issue...",err);
    });

    console.log("Hello");
}
function loadRecords(){
    if(localStorage){
        itemOperations.items = JSON.parse(localStorage.myitems);
        printTable(itemOperations.items);
        totalRecords();
    }
    else{
        console.log("No Local Storage...");
    }
}
