import React,{useEffect, useState} from 'react'
import { getBuyPosts } from '../services/user-service';
import { Button, Col, Row } from 'reactstrap';
import Post from './Post';
function MarketPlace() {
  const [posts,setPosts]=useState(null);
  
  useEffect(()=>{
    //load all the sell posts from server
    getBuyPosts().then((response)=>{
      setPosts(response);
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    posts?(
    <div className="container-fluid justify-center">
      <Row >
        <Col md={{size:9,offset:2}}>
          <h1>Market Place for Selling Books</h1>
          <Button style={{backgroundColor:"#EE7214", border:"none"}} href="/user/addsell">Add Books for Sell</Button>
         {
           posts.map((post) => {
             return <Post post={post} key={post.bid} />
          })
          
         }
        </Col>
      </Row>
    </div> 
    ) :"Loading..."
   
  )
}

export default MarketPlace;