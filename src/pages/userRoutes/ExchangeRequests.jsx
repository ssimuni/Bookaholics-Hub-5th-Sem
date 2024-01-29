/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import Base from '../../components/Base'
import {Table,Col,Row,Button} from "reactstrap"
import {getExchangeRequests, deleteExchangeProcess, confirmRequest} from '../../services/user-service';
import { useParams,useNavigate } from 'react-router-dom';
import userContext from '../../context/userContext';
import {toast} from 'react-toastify';
const ExchangeRequests=()=> {
    const object=useContext(userContext);
    const [posts,setPosts]=useState();
    const {eEmail}=useParams();
    const navigate=useNavigate();
  
  useEffect(()=>{
    getExchangeRequests(eEmail).then((response)=>{
      setPosts(response);
    }).catch((error)=>{
      console.log(error);
    })
  },[eEmail]);
  const handleCancel=(epId)=>{
    deleteExchangeProcess(epId).then((response)=>{
      if(response.status === 200){
        toast.success("Cancelled successfully");
        navigate("/user/exchange");
      }
      else if(response.status ===204){
        toast.error("Try again later");
      }
    }).catch((error)=>{
      console.log(error);
      toast.error("Something went wrong. Try again later");
  })
  }

  const handleConfirm=(epId) => {
    confirmRequest(epId).then((response) => {
      if(response.status === 200){
        toast.success("Process Accomplished Successfully");
        navigate("/user/exchange");
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
        <Col>
        <h2>My Exchange Requests</h2>
        <Table responsive striped bordered={false} className="text-justify-center">
            <thead>
                <tr className='text-center'>
                    <th>Serial No</th>
                    <th>Book Title</th>
                    <th>Author of Book</th>
                    <th>Edition of Book</th>
                    <th>Request Time</th>
                    <th>Exchanger Email</th>
                    <th>Contact Number</th>
                    <th>State</th>
                    <th>Delete</th>
                </tr>
            </thead>
            {posts?(
            <tbody>
            {posts.map((book) => (
               <tr key={book.epId} className='text-center'> 
                        <td>{book.epId}</td>
                        <td>{book.b_title}</td>
                        <td>{book.b_authorname}</td>
                        <td>{book.b_edition}</td>
                        <td>{book.postAt}</td>
                        <td>{book.exchangerEmail}</td>
                        <td>{book.phone}</td>
                        <td><Button style={{backgroundColor:"#EE7214", border:"none"}} onClick={() => handleConfirm(book.epId)}    href="/user/exchange">Confirm</Button></td>
                        <td><Button color='danger' onClick={() => handleCancel(book.epId)} value={book.epId}>Cancel</Button></td>
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

export default ExchangeRequests