/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import Base from '../../components/Base'
import {Table,Col,Row} from "reactstrap"
import {getMyLendRecords} from '../../services/user-service';
import { useParams } from 'react-router-dom';
import userContext from '../../context/userContext';

const MyLendRecords=()=> {
    const object=useContext(userContext);
    const [posts,setPosts]=useState();
    const {eEmail}=useParams();
  
  useEffect(()=>{
    getMyLendRecords(eEmail).then((response)=>{
      setPosts(response); 
    }).catch((error)=>{
      console.log(error);
    })
  },[eEmail]);
  return (
  <Base>
   <Row className="m-2">
        <Col>
        <h2 className="mb-4 mt-4">My Lend Records</h2>
        <Table responsive striped bordered={false} className="text-justify-center">
            <thead>
                <tr className='text-center'>
                    <th>Serial No</th>
                    <th>Book ID</th>
                    <th>Book Title</th>
                    <th>Borrower Name</th>
                    <th>Borrower Email</th>
                    <th>Borrower Phone Number</th>
                    <th>Request Time</th>
                    <th>Rental Fee</th>
                    <th>Pickup Point</th>
                    <th>Rent Period</th>
                </tr>
            </thead>
            {posts?(
            <tbody>            {posts.map((book) => (
              
               <tr key={book.bpId} className='text-center'> 
                        <td>{book.bpId}</td>
                        <td>{book.bbId}</td>
                        <td>{book.b_title}</td>
                        <td>{book.name}</td>
                        <td>{book.borrowerEmail}</td>
                        <td>{book.phone}</td>
                        <td>{book.borrowsAt}</td>
                        <td>{book.paymentForBorrow}</td>
                        <td>{book.pickupPoint}</td>
                        <td>{book.returnTime}</td>
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

export default MyLendRecords;