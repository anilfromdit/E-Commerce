import React, {useState,Fragment} from 'react'
import "./Search.css"
import history from "./history.js"
import MetaData from "../layout/MetaData";

const Search = () => {
    const [keyword, setKeyword]= useState("");

    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
        window.location.href=`/products/${keyword}`;
      }else{
        window.location.href=`/products/`;
        }

    };


  return <Fragment>
    
<MetaData title="Search | E-Mart"/>
<form className='searchBox' onSubmit={searchSubmitHandler}>
    <input type="text" placeholder='search your product...' onChange={(e)=>setKeyword(e.target.value)}/>
    <input type="submit" value="Search"/>
</form>

  </Fragment>;
};

export default Search