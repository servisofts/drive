
const delay = ms => new Promise(res => setTimeout(res, ms));

var HILOS = {};
export default class SThread {

    constructor(time, key) {
        this.key = key;
        if (HILOS[key]) {
            this.active = true;
        } else {
            HILOS[key] = this;
            this.active = false;
        }
        this.time = time;
    }

    hilo = async () => {
        await delay(this.time)
        delete HILOS[this.key];
        this.cb();
    }

    start(cb) {
        this.cb = cb;
        if(this.active){
            return;
        }
        this.hilo()
    }

}
