/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from 'react'
import Base from '../../components/Base'
import {Table,Col,Row} from "reactstrap"
import {getAllUser} from '../../services/user-service';

const AllUser=()=> {
    const [users,setUsers]=useState();
  
  useEffect(()=>{
    getAllUser().then((response)=>{
      setUsers(response); 
    }).catch((error)=>{
      console.log(error);
    })
  },[]);
  return (
  <Base>
   <Row className="m-4">
        <Col>
        <h2 className="mb-4">All User Records</h2>
        <Table responsive striped bordered={false} className="text-justify-center">
            <thead>
                <tr className='text-center'>
                    <th>User id</th>
                    <th>User name</th>
                    <th>User email</th>
                    <th>Registration time</th>
                    <th>Phone number</th>
                    <th>Address</th>
                    <th>Role</th>
                </tr>
            </thead>
            {users?(
            <tbody>            {users.map((user) => (
              
               <tr key={user.id} className='text-center'> 
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.createdAt}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>{user.role}</td>
                        
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

export default AllUser;

