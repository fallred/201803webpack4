let util = require('util');
class HtmlInlinePlugin {
    constructor(options){
        this.options = options
    }
    apply(compiler){
        compiler.hooks.compilation.tap('HtmlInlinePlugin', (compilation)=>{
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlInlinePlugin',(htmlData,cb)=>{
                // htmlData是一个对象，我们就是基于它生成最终的html
                console.log(htmlData);
                /**
                 * { tagName: 'script',
                    closeTag: true,
                    attributes: { type: 'text/javascript', src: 'main.js' } }
                 */
                let tag = htmlData.body[0];
                tag.attributes.src='xxx.js';
                htmlData.body = [tag];
                console.log(util.inspect(htmlData.body[0]));
                // 必须要调用回调函数
                cb();
            });
        });
    }
}
module.exports = HtmlInlinePlugin;