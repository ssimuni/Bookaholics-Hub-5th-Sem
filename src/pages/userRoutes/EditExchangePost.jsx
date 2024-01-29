import React,{useEffect,useState} from 'react';
import Base from '../../components/Base';
import {Container,Row,Col,Card,Form,FormGroup,Label,Input,Button,CardHeader,CardBody} from 'reactstrap';
import { editExchangePost, getExchangeBook } from '../../services/user-service';
import { useParams,useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';

const EditExchangePost=()=> {
    const {ebId}=useParams();
    const [post,setPost]=useState({
        b_title:'',
        b_authorname:'',
        b_edition:'',
        b_description:'',
        b_numOfPages:'',
        b_price:'',
        category:'',
        wishedBook:'',
        wishedBookAuthor:'',
        wishedBookEdition:'',
        ebId:ebId,
    });
    const [initialPost,setInitialPost]=useState({
        b_title:'',
        b_authorname:'',
        b_edition:'',
        b_description:'',
        b_numOfPages:'',
        b_price:'',
        category:'',
        wishedBook:'',
        wishedBookAuthor:'',
        wishedBookEdition:'',
        ebId:ebId,
    });

    const navigate =useNavigate();
    useEffect(()=>{
        getExchangeBook(ebId).then((response)=>{
        setPost({...response});
        setInitialPost({...response});
        })
    },[ebId])

    const handleChange = (event, field) => {
        const actualValue = event.target.value;
        setPost((prevPost) => ({
          ...prevPost,
          [field]: actualValue,
          ebId:ebId,
          ...(prevPost[field] !== initialPost[field] && { // Only include if changed
            [field]: actualValue,
          }),
        }));
      };
      
    const handleSubmit=(event)=>{
        event.preventDefault();
        editExchangePost(post).then((response)=>{
        if(response.status===200){
            toast.success("Updated successfully");
            navigate("/user/exchange");
        }
        else{
            toast.error("Could not update.Try again later");
            navigate("/user/exchange");
        }
    }).catch((error)=>{
        console.log(error);
        toast.error("Something went wrong. Try again later.");
    });
    }
   
  return (
    post?(
    <Base>
    <Container className='mt-3'>
    <Row className="mt-4">
        <Col sm={{size:8,offset:2}}>
        <Card color="dark" outline>
        <CardHeader>
            <h3 className="text-center">Information Of Your Book</h3> 
        </CardHeader>
        <CardBody>
            <Form onSubmit={handleSubmit} >
            <FormGroup>
                    <Label for="b_title">Title of Book</Label>
                    <Input 
                    type="text"
                    id="b_title"
                    value={post.b_title}
                     onChange={(e)=>handleChange(e,'b_title')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_authorname">Author of Book</Label>
                    <Input 
                    type="text"
                    id="b_authorname"
                    value={post.b_authorname}
                    onChange={(e)=>handleChange(e,'b_authorname')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_edition">Edition of Book</Label>
                    <Input 
                    type="text"
                    id="b_edition"
                    value={post.b_edition}
                    onChange={(e)=>handleChange(e,'b_edition')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_numOfPages">Number of Pages</Label>
                    <Input 
                    type="number"
                    id="b_numOfPages"
                    value={post.b_numOfPages}
                    onChange={(e)=>handleChange(e,'b_numOfPages')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_description">Description of Book</Label>
                    <Input 
                    type="text"
                    id="b_description"
                    value={post.b_description}
                    onChange={(e)=>handleChange(e,'b_description')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="b_price">Price of Book</Label>
                    <Input 
                    type="number"
                    id="b_price"
                    value={post.b_price}
                    onChange={(e)=>handleChange(e,'b_price')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="wishedBook">Your Desired Book</Label>
                    <Input 
                    type="text"
                    id="wishedBook"
                    value={post.wishedBook}
                    onChange={(e)=>handleChange(e,'wishedBook')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="wishedBookAuthor">Your Desired Book's Author</Label>
                    <Input 
                    type="text"
                    id="wishedBookAuthor"
                    value={post.wishedBookAuthor}
                    onChange={(e)=>handleChange(e,'wishedBookAuthor')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="wishedBookEdition">Your Desired Book's Edition</Label>
                    <Input 
                    type="text"
                    id="wishedBookEdition"
                    value={post.wishedBookEdition}
                    onChange={(e)=>handleChange(e,'wishedBookEdition')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="category">Category of Book</Label>
                    <Input 
                    type="text"
                    id="category"
                    value={post.category}
                    onChange={(e)=>handleChange(e,'category')}
                    required></Input>
                </FormGroup>
                <Container className="text-center">
                    <Button style={{backgroundColor:"#EE7214", border:"none"}}  className='mr-2'  >
                        Save
                    </Button>
                    {' '}
                    <Button color="danger"  href={"/user/exchange"}>
                        Cancel
                    </Button>
                </Container>
            </Form>
        </CardBody>
    </Card>
        </Col>
    </Row>
    </Container>
    </Base>
    ) : (
      <Base>
      <div>
        <h1>Loading....</h1>
      </div>
      </Base>
    )
  );
}

export default EditExchangePost;