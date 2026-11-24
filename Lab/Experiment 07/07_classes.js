// Experiment 07 & 08: Part A - 3.7 Classes

class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }

    speak() {
        return `${this.name} says ${this.sound}`;
    }

    static info() {
        return "Animals are living beings.";
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, "Woof");
    }

    fetch() {
        return `${this.name} is fetching the ball.`;
    }
}

const dog = new Dog("Rex");
console.log(dog.speak());   // "Rex says Woof"
console.log(dog.fetch());   // "Rex is fetching the ball."
console.log(Animal.info()); // "Animals are living beings."
