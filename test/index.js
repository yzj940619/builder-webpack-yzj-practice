
const path = require('path')

process.chdir(path.join(__dirname,'smoke/template'))

describe('builder-webpack test case',()=>{
    //单元测试目录下的测试文件
    require('./unit/webpack-base-test')
})