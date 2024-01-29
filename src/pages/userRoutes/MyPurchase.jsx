/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import Base from '../../components/Base'
import {Table,Col,Row} from "reactstrap"
import {getMyPurchase} from '../../services/user-service';
import { useParams} from 'react-router-dom';
import userContext from '../../context/userContext';
const MyPurchase=()=> {
    const object=useContext(userContext);
    const [posts,setPosts]=useState();
    const {eEmail}=useParams();
 
  
  useEffect(()=>{
    getMyPurchase(eEmail).then((response)=>{
      setPosts(response);
    }).catch((error)=>{
      console.log(error);
    })
  },[eEmail]);
  return (
  <Base>
   <Row className="m-4">
        <Col>
        <h2 className="mb-4">My Purchased Books</h2>
        <Table responsive striped bordered={false} className="text-justify-center">
            <thead>
                <tr className='text-center'>
                    <th>ID No</th>
                    <th>Book Title</th>
                    <th>Author of Book</th>
                    <th>Edition of Book</th>
                    <th>Quantity</th>
                    <th>Total Payment</th>
                    <th>Order Time</th>
                    <th>Pickup Point</th>
                    <th>Seller Email</th>
                    <th>State</th>
                </tr>
            </thead>
            {posts?(
            <tbody>            {posts.map((book) => (
              
               <tr key={book.orderId} className='text-center'> 
                        <td>{book.orderId}</td>
                        <td>{book.b_title}</td>
                        <td>{book.b_authorname}</td>
                        <td>{book.b_edition}</td>
                        <td>{book.quantity}</td>
                        <td>{book.total}</td>
                        <td>{book.orderedAt}</td>
                        <td>{book.pickupPoint}</td>
                        <td>{book.soldBy_Email}</td>
                        <td>{book.state}</td>
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

export default MyPurchase;