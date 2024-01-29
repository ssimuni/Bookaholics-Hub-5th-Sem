/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import Base from '../../components/Base'
import {Table,Col,Row} from "reactstrap"
import {getMySellRecords} from '../../services/user-service';
import { useParams} from 'react-router-dom';
import userContext from '../../context/userContext';

const MySellRecords=()=> {
    const object=useContext(userContext);
    const [posts,setPosts]=useState();
    const {eEmail}=useParams();
  
  useEffect(()=>{
    getMySellRecords(eEmail).then((response)=>{
      setPosts(response); 
    }).catch((error)=>{
      console.log(error);
    })
  },[eEmail]);
  return (
  <Base>
   <Row className="m-4">
        <Col>
        <h2 className="mb-4">My Sell Records</h2>
        <Table responsive striped bordered={false} className="text-justify-center">
            <thead>
                <tr className='text-center'>
                    <th>Order No</th>
                    <th>Book ID</th>
                    <th>Book Title</th>
                    <th>Buyer Name</th>
                    <th>Buyer Email</th>
                    <th>Buyer Phone Number</th>
                    <th>Order Time</th>
                    <th>Quantity</th>
                    <th>Total Payment</th>
                    <th>Pickup Point</th>
                   
                </tr>
            </thead>
            {posts?(
            <tbody>            {posts.map((book) => (
              
               <tr key={book.orderId} className='text-center'> 
                        <td>{book.orderId}</td>
                        <td>{book.sbId}</td>
                        <td>{book.b_title}</td>
                        <td>{book.name}</td>
                        <td>{book.takenBy_Email}</td>
                        <td>{book.phone}</td>
                        <td>{book.orderedAt}</td>
                        <td>{book.quantity}</td>
                        <td>{book.total}</td>
                        <td>{book.pickupPoint}</td>
                    </tr>
                    ))}
                    </tbody>):
                    <>
                    <h3>No records found...</h3>
                    </>
            }
        </Table>
   </Col>
   </Row>
    </Base>
  )
}

export default MySellRecords;