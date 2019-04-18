const itemOperations={
    items:[],
    add(itemObject){
        this.items.push(itemObject);
    },
    markUnmark(id){
        this.search(id).toggle();
    },
    search(id){
        return this.items.find(itemObject=>itemObject.id==id);
    },
    countMarked(){
        return this.items.filter(itemObject=>itemObject.marked).length;
    },
    remove(){
        this.items=this.items.filter(itemObject=>!itemObject.marked);
        return this.items;
    },
    searchAll(key,value){
        return this.items.filter(itemObject=>itemObject[key]==value);
    }
}
