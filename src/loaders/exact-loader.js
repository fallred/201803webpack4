// 把css文件单独放置到一个文件中去，然后在页面中通过link标签引入
let loader= function (source) {
    // 发射或者说输出一个文件，这个文件的内容就是css文件的内容
    this.emitFile('main.css', source);
    let script = `
        let link = document.createElement('link');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('href','main.css');
        document.head.append(link);
    `;
    return script;
}
module.exports = loader;