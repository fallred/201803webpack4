const {SyncHook} = require('tapable');
class DonePlugin {
    constructor(options){
        this.options = options;
        this.hooks = {
            show: new SyncHook()
        };
    }
    apply(compiler) {
        console.log('开始挂载doneplugin');
        this.hooks.show.tap('监听我自己的show事件',()=>{
            console.log('Done3Plugin自己的show事件触发了');
        });
        compiler.hooks.done.tapAsync('DonePlugin', (stats, cb)=>{
            // debugger;
            // console.log(stats);
            // console.log('DONE事件已经触发');

            compiler.start = Date.now();
            setTimeout(()=>{
                console.log('DONE事件已经触发');
                cb();
                this.hooks.show.call();
            }, 3000);
        })
    }
}
module.exports = DonePlugin;