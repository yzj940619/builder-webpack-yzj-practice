const glob = require('glob-all')

describe('验证是否生成HTML文件',()=>{
    it('生成了HTML文件',(done)=>{
        const files = glob.sync([
            './dist/index.html',
            './dist/search.html'
        ])

        if(files.length>0){
            done()
        } else{
            throw new Error('没有生成HTML文件')
        }
    })
})