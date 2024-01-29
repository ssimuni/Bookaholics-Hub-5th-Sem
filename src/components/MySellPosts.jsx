/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import Base from './Base'
import {Table,Col,Row,Button} from "reactstrap"
import {getMySellPosts, editSellPost} from '../services/user-service';
import { useParams,useNavigate } from 'react-router-dom';
import userContext from '../context/userContext';
import {toast} from 'react-toastify';
const MySellPosts=()=> {
    const object=useContext(userContext);
    const [posts,setPosts]=useState();
    const {eEmail}=useParams();
    const navigate=useNavigate();
  
  useEffect(()=>{
    getMySellPosts(eEmail).then((response)=>{
      setPosts(response);
    }).catch((error)=>{
      console.log(error);
    })
  },[eEmail]);


  return (
  <Base>
   <Row className="m-4">
        <Col>
        <h2 className="mb-4">My Books For Sell</h2>
        <Table responsive striped bordered={false} className="text-justify-center">
            <thead>
                <tr className='text-center'>
                    <th>ID No</th>
                    <th>Book Title</th>
                    <th>Author of Book</th>
                    <th>Edition of Book</th>
                    <th>Number of Pages</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>State</th>
                    <th>Edit Post</th>
                   
                </tr>
            </thead>
            {posts?(
            <tbody>            {posts.map((book) => (
              
               <tr key={book.sid} className='text-center'> 
                        <td>{book.sid}</td>
                        <td>{book.b_title}</td>
                        <td>{book.b_authorname}</td>
                        <td>{book.b_edition}</td>
                        <td>{book.b_numOfPages}</td>
                        <td>{book.b_price}</td>
                        <td>{book.b_quantity}</td>
                        <td>{book.category}</td>
                        <td> { (book.b_quantity>0)?"Available":"Unavailable"}</td>
                        <td>{(book.b_quantity>0)?<Button style={{backgroundColor:"#EE7214", border:"none"}} href={`/user/edit-sell-post/${book.sid}`}>Edit</Button>:<Button color='secondary' disabled>Edit</Button>}</td>
                    </tr>
                    ))}
                    </tbody>):
                    <>
                    <h3>No requests found...</h3>
                    </>
            }
        </Table>
   </Col>
   </Row>
    </Base>
  )
}

export default MySellPosts;