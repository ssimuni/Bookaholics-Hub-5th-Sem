/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import Base from '../../components/Base'
import {Table,Col,Row,Button} from "reactstrap"
import {getBorrowRequests, deleteBorrowProcess, confirmBorrowRequest} from '../../services/user-service';
import { useParams,useNavigate } from 'react-router-dom';
import userContext from '../../context/userContext';
import {toast} from 'react-toastify';
const BorrowRequests=()=> {
    const object=useContext(userContext);
    const [posts,setPosts]=useState();
    const {eEmail}=useParams();
    const navigate=useNavigate();
  
  useEffect(()=>{
    getBorrowRequests(eEmail).then((response)=>{
      setPosts(response);
    }).catch((error)=>{
      console.log(error);
    })
  },[eEmail]);
  const handleCancel=(bpId)=>{
    deleteBorrowProcess(bpId).then((response)=>{
      if(response.status === 200){
        toast.success("Cancelled successfully");
        navigate("/user/borrow");
      }
      else if(response.status ===204){
        toast.error("Try again later");
      }
    }).catch((error)=>{
      console.log(error);
      toast.error("Something went wrong. Try again later");
  })
  }

  const handleConfirm=(bpId) => {
    confirmBorrowRequest(bpId).then((response) => {
      if(response.status === 200){
        toast.success("Process Accomplished Successfully");
        navigate("/user/borrow");
      }
      else if(response.status === 204){
        toast.error("Try again later");
      }
    }).catch((error)=>{
      console.log(error);
      toast.error("Something went wrong. Try again later");
    })  
  }
  
  return (
  <Base>
   <Row className="m-4">
        <Col >
        <h2>My Borrow Requests</h2>
        <Table responsive striped bordered={false} className="text-justify-center">
            <thead>
                <tr className='text-center'>
                    <th>Serial No</th>
                    <th>Book Title</th>
                    <th>Author of Book</th>
                    <th>Edition of Book</th>
                    <th>Request Time</th>
                    <th>Borrower Email</th>
                    <th>Contact Number</th>
                    <th>State</th>
                    <th>Delete</th>
                </tr>
            </thead>
            {posts?(
            <tbody>
            {posts.map((book) => (
               <tr key={book.bpId} className='text-center'> 
                        <td>{book.bpId}</td>
                        <td>{book.b_title}</td>
                        <td>{book.b_authorname}</td>
                        <td>{book.b_edition}</td>
                        <td>{book.postAt}</td>
                        <td>{book.borrowerEmail}</td>
                        <td>{book.phone}</td>
                        <td><Button style={{backgroundColor:"#EE7214", border:"none"}} onClick={() => handleConfirm(book.bpId)}>Confirm</Button></td>
                        <td><Button color='danger' onClick={() => handleCancel(book.bpId)} value={book.bpId}>Cancel</Button></td>
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

export default BorrowRequests;