class Done2Plugin {
    constructor(options){
        this.options = options;
    }
    apply(compiler) {
        console.log('开始挂载done2plugin');
        compiler.hooks.done.tapAsync('Done2Plugin', (stats, cb)=>{
            setTimeout(()=>{
                console.log('DONE2事件已经触发');
                cb();
            }, 3000);
        })
    }
}
module.exports = Done2Plugin;