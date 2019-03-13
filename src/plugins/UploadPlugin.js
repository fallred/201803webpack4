// 在文件保存完成之后自动把打包好的文件上传到CDN上
//https://developer.qiniu.com/kodo/sdk/1289/nodejs

https://portal.qiniu.com/bucket/cnpmjs/resource
const path = require('path');
const qiniu = require('qiniu');
class UploadPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tap('UploadPlugin', (compliation) => {
            console.log('afterEmit');
            // 先拿到药上传的资源
            let assets = compliation.assets;
            // 获取到的是一个待上传的文件组成的数组['xxx.js','index.html']
            let files = Object.keys(assets);
            console.log('files', files);
            let promises = files.map(asset => this.upload(asset, path.resolve(__dirname, '../../dist', asset)));
            return Promise.all(promises);

            // console.log(files);
            // cb();
        });
    }
    upload(filename, localFile) {
        console.log('filename,localFile', filename, localFile);
        return new Promise(function (resolve, reject) {
            let {
                bucket = 'video',
                domain = "img.fallred.cn",
                accessKey = '7C6jVynZPzaYwsQBxR4zdbi27WllPeWuGRugmhPW',
                secretKey = '2iWe6FcYztZkwWfVrD5jnJ-BMriiWJEaMnuyFu-g'
            } = {};
            let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            let options = {
                scope: bucket,
            };

            let putPolicy = new qiniu.rs.PutPolicy(options);
            let uploadToken = putPolicy.uploadToken(mac);
            let config = new qiniu.conf.Config();
            let formUploader = new qiniu.form_up.FormUploader(config);
            let putExtra = new qiniu.form_up.PutExtra();
            formUploader.putFile(uploadToken, filename, localFile, putExtra, (err, body, info) => {
                console.log(err);
                console.log(body);
                err ? reject(err) : resolve(body);
            });
        });
    }
}
module.exports = UploadPlugin;