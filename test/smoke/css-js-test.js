const glob = require('glob-all')

describe('验证是否生成css和js文件',()=>{
    it('生成了css和js文件',(done)=>{
        const files = glob.sync([
            './dist/index_*.js',
            './dist/search_*.js',
            './dist/index_*.css',
            './dist/search_*.css',
        ])

        if(files.length>0){
            done()
        } else{
            throw new Error('没有生成css和js文件')
        }
    })
})