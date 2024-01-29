import React,{useState } from 'react'
import { Card, CardBody, Form, FormGroup, Col, Row, Label, Input, Button, Container, CardHeader } from 'reactstrap';
import {toast} from 'react-toastify';
 import { addSellPost } from '../services/user-service';
 import { useNavigate } from 'react-router-dom';


export  const AddPost=()=> {

    const navigate=useNavigate();
    const [title,setTitle]=useState('');
    const [authorname,setAuthorname]=useState('');
    const [edition,setEdition]=useState('');
    const [numOfPages,setNumOfPages]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState('');
    const [quantity,setQuantity]=useState('');
    const [category,setCategory]=useState('');
    const [email,setEmail]=useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(imageFile);
    
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('title', title);
        formData.append('authorname', authorname);
        formData.append('edition', edition);
        formData.append('description', description);
        formData.append('numOfPages', numOfPages);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('email', email);
        formData.append('category', category);
        // ... append other form data
        
        addSellPost(formData).then((response)=>{
       
            toast.success("Post added successfully. "+response.b_title);
                    setTitle('');
                    setAuthorname('');
                    setEdition('');
                    setNumOfPages('');
                    setDescription('');
                    setPrice('');
                    setQuantity('');
                    setCategory('');
                    setImageFile('');
                    setEmail('');
                    navigate('/user/buysell');
        }).catch((error)=>{
            console.log(error);
        })
       };

const handleReset=()=>{
    setTitle('');
    setAuthorname('');
    setEdition('');
    setNumOfPages('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setCategory('');
    setImageFile('');
    setEmail('')
}

return (
    <Container className="mb-5" >
    <Row className="mt-5">
        <Col sm={{size:6,offset:3}}>
        <Card color="dark" outline className="shadow-md">
        <CardHeader>
            <h3 className="text-center">Add New Book to Sell</h3>
        </CardHeader>
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="b_title">Enter Book Title</Label>
                    <Input 
                    type="text"
                    placeholder="Enter here"
                    id="b_title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_authorname">Enter Author Name</Label>
                    <Input 
                    type="text"
                    placeholder="Enter here"
                    id="b_authorname"
                    value={authorname}
                    onChange={(e) => setAuthorname(e.target.value)}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_edition">Enter Edition of Book</Label>
                    <Input 
                    type="text"
                    placeholder="Enter here e.g 6th. If this is a nonacademic book then write 'Not Required'."
                    id="b_edition"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_numOfPages">Enter Number of Pages of Book</Label>
                    <Input 
                    type="number"
                    placeholder="Enter here"
                    id="b_numOfPages"
                    value={numOfPages}
                    onChange={(e) => setNumOfPages(e.target.value)}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_quantity">Enter Quantity of Book</Label>
                    <Input 
                    type="number"
                    placeholder="Enter here"
                    id="b_quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_description">Enter Brief Description of Book</Label>
                    <Input 
                    type="textarea"
                    placeholder="Enter here"
                    id="b_description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="price">Enter Price of Book</Label>
                    <Input 
                    type="number"
                    placeholder="Enter here"
                    id="b_price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Enter Cover Picture Of Book</Label>
                    <Input 
                    type="file"
                    placeholder="Choose file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="category">Select Category</Label>
                    <Input 
                    type="select"
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                    required>
                        <option value={"Academic"}>
                            Academic
                        </option>
                        <option value={"Non Academic"}>
                            Non Academic
                        </option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Enter Email Address of Seller</Label>
                    <Input 
                    type="email"
                    placeholder="Enter your email address carefully"
                    id="b_soldBy_Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    ></Input>
                </FormGroup>
                <FormGroup check>
                <Input type="checkbox" required />
                <Label check>
                I have read the terms and policies of this platform carefully and I agree with these.
                </Label>
                </FormGroup>
                <Container className="text-center">
                    <Button style={{backgroundColor:"#EE7214", border:"none",color:"#fff"}} >
                        Submit
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
  )
};
