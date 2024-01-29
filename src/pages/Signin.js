import React, { useState } from 'react'
import Base from '../components/Base';
import {Card, CardBody, Col, Row, CardHeader, Container, Form, FormGroup, Label, Input, Button} from "reactstrap";
import { signIn } from '../services/user-service';
import { toast} from 'react-toastify';
import { doLoggedIn } from '../auth';
import { useNavigate } from 'react-router-dom'
function Signin() {
    const [loginDetail,setLoginDetail]=useState({
        email:'',
        password:''
    })
    const navigate =useNavigate();
    const handleChange=(event,field)=>{
        let actualValue=event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue
        })
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        signIn(loginDetail).then((response)=>{
            if(response.status===200){
            toast.success("Welcome "+response.data.name);
                    if(response.data.role==="Admin"){
                        doLoggedIn(response.data,()=>{
                            console.log("login detail is saved to local storage");
                            navigate("/admin/all-user");
                        })
                    }else{
                    doLoggedIn(response.data,()=>{
                        console.log("login detail is saved to local storage");
                        navigate("/user/buysell");
                    })
            }}else{
                toast.error("Not found.Enter correct email and password or create new account if you don't have one.");
            }
            setLoginDetail({
                email:'',
                password:'',
            })
        }).catch((error)=>{
            console.log(error);
            toast.error("Something went wrong. Try again later");
            setLoginDetail({
                email:'',
                password:'',
            })
        })
    }
  return (
    <Base>
    <Container >
    <Row className="mt-4">
        <Col sm={{size:6,offset:3}}>
        <Card color="dark" outline>
        <CardHeader>
            <h3 className="text-center">Sign in to your account</h3>
        </CardHeader>
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Enter your email address</Label>
                    <Input 
                    type="email"
                    placeholder="Enter here"
                    id="email"
                    value={loginDetail.email}
                    onChange={(e)=>handleChange(e,'email')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input 
                    type="password"
                    placeholder="Enter here"
                    id="password"
                    value={loginDetail.password}
                    onChange={(e)=>handleChange(e,'password')}
                    required></Input>
                </FormGroup>
                <Container className="text-center">
                    <Button style={{backgroundColor:"#EE7214", border:"none",color:"#fff"}}>
                        Sign in
                    </Button>
                </Container>
            </Form>
        </CardBody>
    </Card>
        </Col>
    </Row>
    </Container>
    </Base>
  )
};

export default Signin;