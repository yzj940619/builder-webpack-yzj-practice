const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

//检测时间限定10s内
const mocha = new Mocha({
    timeout:'100000ms'
})

//定义模版路径
process.chdir(path.join(__dirname,'template'))

//删除模版下dist文件夹后执行回调
rimraf('./dist',()=>{
    //打包配置
    const prodConfig = require('../../lib/webpack.prod.js')
    //开始打包
    webpack(prodConfig,(err,stats)=>{
        if(err){
            console.error(err)
            process.exit(2)
        }
        console.log(stats.toString({
            colors:true,
            modules:false,
            children:false
        }))

        console.log('开始执行测试用例')
        
        mocha.addFile(path.join(__dirname,'html-test.js'))
        mocha.addFile(path.join(__dirname,'css-js-test.js'))

        mocha.run()
    })
})