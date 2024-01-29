import React,{useEffect, useState} from 'react'
import { getBorrowPosts } from '../services/user-service';
import { Col, Row, Button} from 'reactstrap';
import PostBorrow from './PostBorrow';
function MarketPlaceBorrow() {
  const [posts,setPosts]=useState(null);
  
  useEffect(()=>{
    //load all the borrow posts from server
    getBorrowPosts().then((response)=>{
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
          <h1>Borrowable Books</h1>
          <Button style={{backgroundColor:"#EE7214", border:"none"}} href="/user/addborrow">Add Books to Give for Borrow</Button>
         {
           posts.map((post) => {
             return <PostBorrow post={post} key={post.borrId} />
          })
          
         }
        </Col>
      </Row>
    </div> 
    ) :"Loading..."
   
  )
}

export default MarketPlaceBorrow;