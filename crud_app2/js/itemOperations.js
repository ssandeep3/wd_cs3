const itemOperations={
    items:[],
    add(itemObject){
        this.items.push(itemObject);
    },
    countTotalMark(){
        return this.items.filter(itemObject=>itemObject.isMarked).length;
    },
    markUnmark(id){
        this.search(id).toggle();
    },
    search(id){
        return this.items.find(itemObject=>itemObject.id==id);
    },
    remove(){
        this.items = this.items.filter(itemObject=>!itemObject.isMarked);   
        return this.items;
    }
    // searchItem(){
        
    // }
}

