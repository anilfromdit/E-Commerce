import React, {useState,Fragment} from 'react'
import "./Search.css"
// import { createHashHistory } from 'history'
import history from "./history.js"
import { Link } from 'react-router-dom'

const Search = () => {
    // const history = createHashHistory()
    const [keyword, setKeyword]= useState("");

    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
        // history.push(`/products/${keyword}`);
        // <Link to={history}/>
        window.location.href=`/products/${keyword}`;
        }else{
            history.push("/products");
        }

    };


  return <Fragment>
<form className='searchBox' onSubmit={searchSubmitHandler}>
    <input type="text" placeholder='search your product...' onChange={(e)=>setKeyword(e.target.value)}/>
    <input type="submit" value="Search"/>
</form>

  </Fragment>;
};

export default Search