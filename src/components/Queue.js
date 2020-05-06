export class Queue {
    constructor()
    {
        this.nodes = []
    }

    enqueue(node){
        this.nodes.push(node);
    }

    dequeue(){
        if(this.isEmpty()){
            return null;
        }
        return this.nodes.shift();
    }

    isEmpty(){
        return this.nodes.length === 0;
    }
}