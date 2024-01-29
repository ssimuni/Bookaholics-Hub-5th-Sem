/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import Base from '../../components/Base'
import {Table,Col,Row} from "reactstrap"
import {getMyExchangeRecords} from '../../services/user-service';
import { useParams} from 'react-router-dom';
import userContext from '../../context/userContext';

const MyExchangeRecords=()=> {
    const object=useContext(userContext);
    const [posts,setPosts]=useState();
    const {eEmail}=useParams();
  
  useEffect(()=>{
    getMyExchangeRecords(eEmail).then((response)=>{
      setPosts(response); 
    }).catch((error)=>{
      console.log(error);
    })
  },[eEmail]);
  return (
  <Base>
   <Row className="m-2">
        <Col>
        <h2 className="mb-4 mt-4">My Exchange Records</h2>
        <Table responsive striped bordered={false} className="text-justify-center">
            <thead>
                <tr className='text-center'>
                    <th>Serial No</th>
                    <th>Book ID</th>
                    <th>Book Title</th>
                    <th>Exchanger Name</th>
                    <th>Exchanger Email</th>
                    <th>Exchanger Phone Number</th>
                    <th>Request Time</th>
                    <th>Desired Book</th>
                </tr>
            </thead>
            {posts?(
            <tbody>            {posts.map((book) => (
              
               <tr key={book.epId} className='text-center'> 
                        <td>{book.epId}</td>
                        <td>{book.eId}</td>
                        <td>{book.b_title}</td>
                        <td>{book.name}</td>
                        <td>{book.exchangerEmail}</td>
                        <td>{book.phone}</td>
                        <td>{book.postAt}</td>
                        <td>{book.wishedBook}</td>
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

export default MyExchangeRecords;