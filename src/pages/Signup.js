import React, { useState } from 'react'
import Base from '../components/Base'
import {Card, CardBody, Col, Row, CardHeader, Container, Form, FormGroup, Label, Input, Button} from "reactstrap";
import { signUp } from '../services/user-service';
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'
function Signup() {
    const [data, setData]=useState({
        name:'',
        email:'',
        address:'',
        phone:'',
        role:'',
        password:'',
    })
    const navigate =useNavigate();
  const handleChange = (event,property)=> {
    setData({...data,[property]:event.target.value})
  }
  const submitForm = (event)=>{
    event.preventDefault();
    signUp(data).then((response)=>{
        if(response.status===204){
            toast.info("Email already exists.");
            navigate("/signin");
        }
        else{
        toast.success("You are registered successfully.");
        setData({
            name:'',
            email:'',
            address:'',
            phone:'',
            role:'',
            password:'',
        })
        navigate("/signin");}
    }).catch((error)=>{
        console.log(error);
        navigate("/");
    })
  }
  const handleReset=()=>{
    setData(
        {
        name:'',
        email:'',
        address:'',
        phone:'',
        role:'',
        password:'',
        }
    )
  }
    return (
    <Base>
    <Container >
    <Row className="mt-4">
        <Col sm={{size:6,offset:3}}>
        <Card color="dark" outline>
        <CardHeader>
            <h3 className="text-center">Sign up for creating new account</h3>
        </CardHeader>
        <CardBody>
            <Form onSubmit={submitForm}>
                <FormGroup>
                    <Label for="name">Enter your full name</Label>
                    <Input 
                    type="text"
                    placeholder="Enter here"
                    id="name"
                    onChange={(e)=>handleChange(e,'name')}
                    value={data.name}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Enter your email address</Label>
                    <Input 
                    type="email"
                    placeholder="Enter here"
                    id="email"
                    onChange={(e)=>handleChange(e,'email')}
                    value={data.email}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Enter your address</Label>
                    <Input 
                    type="text"
                    placeholder="Enter here"
                    id="address"
                    onChange={(e)=>handleChange(e,'address')}
                    value={data.address}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Enter your phone number</Label>
                    <Input 
                    type="number"
                    placeholder="Enter here"
                    id="phone"
                    onChange={(e)=>handleChange(e,'phone')}
                    value={data.phone}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="role">Select your role</Label>
                    <Input 
                    type="select"
                    id="role"
                    name="role"
                    onChange={(e)=>handleChange(e,'role')}
                    required>
                        <option value={"General"}>
                            General
                        </option>
                        <option value={"Publisher"}>
                            Publisher
                        </option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Enter password </Label>
                    <Input 
                    type="password"
                    placeholder="Enter here"
                    id="password"
                    onChange={(e)=>handleChange(e,'password')}
                    value={data.password}
                    required></Input>
                </FormGroup>
                <FormGroup check>
                <Input type="checkbox" required />
                <Label check>
                I have read the terms and policies of this platform carefully and I agree with these.
                </Label>
                </FormGroup>
                <Container className="text-center">
                    <Button style={{backgroundColor:"#EE7214", border:"none",color:"#fff"}}>
                        Sign up
                    </Button>
                    <Button onClick={handleReset} color="secondary" outline className="m-4">
                        Reset
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

export default Signup;