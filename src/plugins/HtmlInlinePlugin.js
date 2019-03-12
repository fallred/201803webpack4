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


                    { tagName: 'link',
                    closeTag: true,
                    attributes: { rel: 'stylesheet', href: 'main.css' } }
                 */
                // let tag = htmlData.body[0];
                // tag.attributes.src='xxx.js';
                // htmlData.body = [tag];
                // console.log(util.inspect(htmlData.body[0]));

                htmlData.body = htmlData.body.map(tag=>{
                    if (tag.tagName == 'script') {
                        let newTag = {
                            tagName: 'script',
                            closeTag: true,
                            attributes: {
                                type: 'text/javascript'
                            }
                        }
                        newTag.innerHTML = compilation.assets[tag.attributes.src].source();
                        return newTag;
                    } else if (tag.tagName == 'link') {
                        let newTag = {
                            tagName: 'style',
                            closeTag: true,
                            attributes: {
                                type: 'text/css'
                            }
                        }
                        newTag.innerHTML = compilation.assets[tag.attributes.href].source();
                        return newTag;
                    }
                });
                // 必须要调用回调函数
                cb();
            });
        });
    }
}
module.exports = HtmlInlinePlugin;