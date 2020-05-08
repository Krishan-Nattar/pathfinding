export class Queue {
	constructor(nodes = []) {
		this.nodes = nodes;
	}

	enqueue(node) {
		this.nodes.push(node);
	}

	dequeue() {
		if (this.isEmpty()) {
			return null;
		}
		return this.nodes.shift();
	}

	isEmpty() {
		return this.nodes.length === 0;
	}
}

export class Stack {
	constructor(nodes = []) {
		this.nodes = nodes;
	}

	push(node) {
		this.nodes.push(node);
	}
	pop() {
		return this.nodes.pop();
	}
	isEmpty() {
		return this.nodes.length === 0;
	}
}
