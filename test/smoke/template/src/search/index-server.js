'use strict';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import img1 from './img/p1.jpg'
// import './search.less'
// import '../../common/index'

const React = require('react')
const img1 = require('./img/p1.jpg')
require('./search.less')
    
class Search extends React.Component {
    constructor(){
        super(...arguments)
        
        this.state = {
            Text: null
        }

    }

    loadComponent(){
        import('./test.js').then(text=>{
            this.setState({
                Text:text.default
            })
        })
    }


    render() {
        const {Text} = this.state
        return <div className="search-text">
            <div>Search</div>
            {
                Text?<Text />:null
            }
             <span className="text" >text</span>  
             <img className="img" src={img1} onClick={this.loadComponent.bind(this)} />
             </div>;
    }
};

const Element = <Search />;

module.exports=Element