// 单例模式：保证一个类只有一个实例，并提供一个访问它的全局访问点（调用一个类，任何时候返回的都是同一个实例）
class Singleton {
    constructor(name) {
        this.name = name;
        this.instance = null;
    }
    getName() {
        console.log(this.name);
    }
    static getInstance(name) {
        if(!this.instance) {
            this.instance = new Singleton(name)
        }
        return this.instance;
    }
}

const singleName = new Singleton('xxx');
singleName.getName();