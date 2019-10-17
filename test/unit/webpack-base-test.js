const assert = require('assert')

describe('webpack.base.js test case',()=>{
    const baseConfig = require('../../lib/webpack.base.js')
    it('entry',()=>{
        assert.equal(baseConfig.entry.index,'./src/index/index.js')
        assert.equal(baseConfig.entry.search,'./src/search/index.js')
    })
})