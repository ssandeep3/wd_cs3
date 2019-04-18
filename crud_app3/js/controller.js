window.addEventListener("load",init);
function init(){
    bindEvents();
    totalRecords();
}
function bindEvents(){
    document.querySelector("#add").addEventListener("click",addRecord);
    document.querySelector("#delete").addEventListener("click",deleteRecord);
    document.querySelector("#search").addEventListener("click",searchRecord);
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
function edit(){

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