window.addEventListener("load",init);
const showHideSearchBar = ()=> document.querySelector('#searchbox').classList.toggle('hide');
function init(){
    bindEvents();
    totalRecord()
}
function bindEvents(){
    document.querySelector("#add").addEventListener("click",addRecord);
    document.querySelector("#remove").addEventListener("click",deleteRecord);
    document.querySelector("#search").addEventListener("click",search);
}

function addRecord(){
    var item = new Item();
    for(let key in item){
        if(key=="isMarked") 
            continue;
        item[key]=document.querySelector("#"+key).value;
    }
    console.log("item object is",item);
    itemOperations.add(item);
    totalRecord();
    printRecord(item);
}
function printRecord(item){
    var tbody = document.querySelector("#items");
    console.log(tbody);
    var tr = tbody.insertRow();
    var idx=0;
    for(let key in item){
        if(key=="isMarked")
            continue;
        var td = tr.insertCell(idx);
        td.innerText=item[key];
        idx++;
    }
    var ttd = tr.insertCell(idx);
    ttd.appendChild(createIcon("fas fa-trash",trash, item.id));
    // ttd.appendChild('<i class="fas fa-trash-alt"></i>');
    // ttd.innerHTML='<i class="fas fa-trash-alt"></i>';
    ttd.appendChild(createIcon("fas fa-edit",edit, item.id));
}
function createIcon(className, fn, id){
    var iTag = document.createElement("i");
    iTag.className = className;
    iTag.addEventListener("click",fn);
    iTag.setAttribute("data-itemid",id);
    return iTag;
}
function trash(){
    let id=this.getAttribute("data-itemid");
    let tr = this.parentNode.parentNode;
    tr.classList.toggle("alert-danger");
    itemOperations.markUnmark(id);
    totalRecord();
    // console.log(id);
}
function edit(){
    
}
function totalRecord(){
    document.querySelector("#total").innerText="Total Records: "+itemOperations.items.length;
    document.querySelector("#mark").innerText="Marked Records: "+itemOperations.countTotalMark();
    document.querySelector("#unmark").innerText="Unmarked Records: "+(itemOperations.items.length-itemOperations.countTotalMark());
}
function deleteRecord(){
    var items = itemOperations.remove();
    printTable(items);
}
function printTable(items){
    var tbody =  document.querySelector('#items');
    tbody.innerHTML ='';
     items.forEach(item=>printRecord(item));
     totalRecord();
 }
 