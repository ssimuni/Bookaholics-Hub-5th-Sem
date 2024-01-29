import React,{useEffect, useState} from 'react'
import { getExchangePosts } from '../services/user-service';
import { Col, Row, Button } from 'reactstrap';
import PostExchange from './PostExchange';
function MarketPlaceExchange() {
  const [posts,setPosts]=useState(null);
  
  useEffect(()=>{
    //load all the exchange posts from server
    getExchangePosts().then((response)=>{
      console.log(response);
      setPosts(response);
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    posts?(
    <div className="container-fluid">
      <Row >
      <Col md={{size:9,offset:2}}>
          <h1>Exchangeable Books</h1>
          <Button style={{backgroundColor:"#EE7214", border:"none"}} href="/user/addexchange">Add Books to Exchange</Button>
         {
           posts.map((post) => {
             return <PostExchange post={post} key={post.ebId} />
          })
          
         }
        </Col>
      </Row>
    </div> 
    ) :"Loading..."
   
  )
}

export default MarketPlaceExchange;