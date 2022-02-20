import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const Page404 = () => {

  return (
      <Fragment>
          <div style={{textAlign:'center',maxWidth:'100vw',minHeight:'50vh',overflow:'hidden'}}>
<img src='/404.jpg' style={{maxWidth:'100vw'}}/>
<div style={{fontSize:'3vmax'}}></div>
<Link to="/" style={{fontSize:'3vmax',textDecoration:'none',color:'black'}}> Your link seems to be broken <br/>{<HomeIcon fontSize="100"/>} Let's Go Home</Link>
</div>
      </Fragment>
  )
}

export default Page404