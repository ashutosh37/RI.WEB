//Author : Ashutosh Nigam
//Date : 06/04/2018
import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import {GetPostCode} from './GetPageData'
import { Constants } from '../Common/Constants';

 class SearchProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allsuburbs : [],
            suggestion : [],
            searchtext : sessionStorage.getItem("searchtext"),
            postcode:'',
            cursor : 0
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        //this.handleEnterDown = this.handleEnterDown.bind(this);
    }
     


  componentDidMount() {
      

      
    }
     
 
    
    RetrieveSPData(text){

        GetPostCode(text, (response) =>{

            this.setState({ 
                allsuburbs: response
            });
        })
        }

    handleChange(e){
        var __searchText = e.target.value
        sessionStorage.setItem('postcodesearch','');
        sessionStorage.setItem('searchtext', '');
        this.setState({searchtext : __searchText});
        if(__searchText === ''){
           this.setState({suggestion: [] , postcode: ''});
           //this.props.onPostCodeChange(e.target.value);
        }
        else{
        
           GetPostCode(__searchText , (response) => {
                // var a = _.filter(this.state.allsuburbs , function(item){
                //     return item.Title.indexOf(e.target.value) !== -1 || item.Suburb.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
                // });
                var a  = response;
                if(typeof(a) !== 'undefined' && a.length > 5)
                a = a.slice(0,8);
    
                if(typeof(a) !== 'undefined')
                 this.setState({suggestion: a});
            });
            
        
    }
}

    handleClick(e){
        e.preventDefault();
        this.setState({suggestion: [] , searchtext : e.target.innerText , postcode :e.target.value});
        sessionStorage.setItem('postcodesearch',e.target.value);
        sessionStorage.setItem('searchtext', e.target.innerText);
        
    }
    handleMouseLeave = (e) =>{
        this.setState({suggestion: []});
    }
    handleSearchClick(e){
        e.preventDefault();
        this.props.onPostCodeChange(this.state.postcode);
    }

    handleKeyDown(e) {
        // arrow up/down button should select next/previous list element
        if ((e.key === 38 || e.key === 'ArrowUp') && this.state.cursor > 0) {
            let __cursor = this.state.cursor;
          this.setState({
            cursor: __cursor - 1
          })
        } else if ((e.key === 40 || e.key === 'ArrowDown') && this.state.cursor < this.state.suggestion.length - 1) {
            let __cursor = this.state.cursor;
          this.setState({
            cursor: __cursor + 1
          })

        }
        else if((e.key== 13 || e.key === 'Enter') && this.state.suggestion.length > 0){
            e.preventDefault();
            var currentitem = $("ul.suggestionList li:eq("+this.state.cursor+")")
            currentitem.click();
            $("#sb-search").removeClass("sb-search-open"); 
        }
        else if((e.key== 13 || e.key === 'Enter') && this.state.searchtext.length > 0 && this.state.searchtext.length > 0 && (window.location.href.toLowerCase().indexOf("/pages/home.aspx") > 0 || window.location.href.indexOf("/pages//map.aspx") > 0)){
            e.preventDefault();
            var currentitem = $(".SearchSectionForm .btn")
            currentitem.click();
 
        }
      }



    render() {
        return(
            <div className="SearchProject">
                <div className="SearchSection" >
                    <h3 style={{textTransform:`none`}}>What's happening in your area?</h3>
                    <div className="SearchSectionForm">
                        <input type="text" placeholder="Search for your suburb" value={this.state.searchtext} onChange={(e)=> this.handleChange(e)} onKeyDown={this.handleKeyDown }/> 
                        {/*  */}
                        <button type="button" className="btn btn-success" onClick={(this.handleSearchClick)}>
                            Search
                        </button>
                    </div>
                    <ul className="suggestionList" onMouseLeave={this.handleMouseLeave}> 
                        {
                           this.state.suggestion.length >0 &&  this.state.suggestion.map((suggestion , index) => {
                            return(<li key={index}  className={`${this.state.cursor === index ? 'activesuburb' : ''}`} onClick={(this.handleClick)}  value={suggestion.Title}>{suggestion.Title} , {suggestion.Suburb}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

 const suggestionliststyle = {
         
 }

export default SearchProject;