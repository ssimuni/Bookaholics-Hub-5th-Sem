import React,{useContext, useEffect, useState} from 'react'
import Base from '../../components/Base';
import userContext from '../../context/userContext';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/user-service';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
function ProfileInfo() {
  const object=useContext(userContext);
  const [user,setUser]=useState(null);
  const {userId} =useParams();
  
  useEffect(()=>{
    getUser(userId).then((response)=>{
      setUser({...response})
    })
  },[userId])
  const userView=()=>{
    return (
      <Row>
        <Col md={{size:8,offset:2}}>
         <Card style={{marginTop:'50px',marginBottom:"20px",zIndex:"-1"}}>
          <CardBody>
            <h3 className='font-extrabold'>
              MY INFORMATION
              </h3>
              <Container className="text-center">
                <img style={{maxWidth:'180px', maxHeight:'180px'}} src="../../../default_picture.jpg" alt="user_profile" className="img-fluid rounded" />
              </Container>
              <Table responsive striped hover bordered={true} className="mt-5 text-center">
                <tbody>
                  <tr>
                  <td>
                    ID:
                  </td>
                  <td>
                    {userId}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    Name:
                  </td>
                  <td>
                    {user.name}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    Email Address:
                  </td>
                  <td>
                    {user.email}
                  </td>
                  </tr>
                  <tr>
                  <td>
                   Address:
                  </td>
                  <td>
                    {user.address}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    Contact Number:
                  </td>
                  <td>
                    {user.phone}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    Registered At:
                  </td>
                  <td>
                    {user.createdAt}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    Role:
                  </td>
                  <td>
                    {user.role}
                  </td>
                  </tr>
                </tbody>
              </Table>
          </CardBody>
         </Card>
        </Col>
      </Row>
    )
  }
  return (
        <Base>
        {user?userView():""}
        </Base>
      )  
}

export default ProfileInfo;