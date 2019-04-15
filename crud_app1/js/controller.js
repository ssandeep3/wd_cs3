window.addEventListener("load",bindEvents);

function bindEvents(){
    document.querySelector("#add").addEventListener("click",addRecord);
}

function addRecord(){
    var item = new Items();
    for(let key in item){
        item[key] = document.querySelector("#"+key).value;
    }
    console.log(item);
    printRecord(item);
}
function printRecord(item){
    var tb = document.querySelector("#tbody");
    var tr = tb.insertRow();
    var idx = 0;
    for(let key in item){
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

}
function edit(){

}
