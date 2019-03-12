class FileListPlugin {
    constructor(options){
        this.options = options;
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb)=>{
             // compilation.assets {bundle.js: { source(){}, size(){} }}
             let fileList = '';
             for (let filename in compilation.assets) {
                fileList += filename +'\r\n';
             }
             compilation.assets[this.options && this.options.filename ? this.options.filename : 'filelist.md'] = {
                source(){
                    return fileList;
                },
                size(){
                    return Buffer.byteLength(fileList);
                }
            }
            cb();
        });
    }
}
module.exports = FileListPlugin;