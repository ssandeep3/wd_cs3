class Item{
    constructor(id, name, price, desc, color, url){
        this.id=id;
        this.name=name;
        this.price=price;
        this.desc=desc;
        this.color=color;
        this.url=url;
        this.isMarked = false;
    }
    toggle(){
        this.isMarked = !this.isMarked;
    }
}