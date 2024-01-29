import React,{useContext,useEffect,useState} from 'react'
import Base from '../../components/Base';
import userContext from '../../context/userContext';
import {Card, CardBody, Col, Row, CardHeader, Container, Form, FormGroup, Label, Input, Button, Table} from "reactstrap";
import { getExchangeBook, exchangePlace } from '../../services/user-service';
import { useParams,useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
const ExchangeForm=()=> {
  const object=useContext(userContext);
  const [book,setBook]=useState(null);
  const {ebId} =useParams(); 
 

  useEffect(()=>{
      getExchangeBook(ebId).then((response)=>{
      setBook({...response})
      })
  },[ebId])

  const [exchangeDetail,setExchangeDetail]=useState({
    exchangerEmail:'',
    phone:'',
    ebId:ebId,
    
})
const navigate =useNavigate();
const handleChange=(event,field)=>{
    let actualValue=event.target.value
    setExchangeDetail({
        ...exchangeDetail,
        [field]: actualValue
    })

}
const handleSubmit=(event)=>{
  event.preventDefault();
  exchangePlace(exchangeDetail).then((response)=>{
    if(response.status===200){
      toast.success("Request has been sent to the owner of the book.");
      navigate("/user/exchange");
      }else{
          toast.error("Process Could Not Be Completed! Try Again later");
          navigate("/user/exchange");
      }
      setExchangeDetail({
        exchangerEmail:'',
         ebId:ebId,
      })
  }).catch((error)=>{
      console.log(error);
      toast.error("Something went wrong. Try again later.");
      navigate("/user/exchange");
      setExchangeDetail({
        exchangerEmail:'',
        ebId:ebId,
        phone:''
      })
  })
}

  return (
    book ?(
    <Base>
    <Container className="mt-3">
    <Row className="mt-4">
        <Col sm={{size:8,offset:2}}>
        <Card color="dark" outline>
        <CardHeader>
            <h3 className="text-center">Details of Exchanging Book</h3> 
            <p className="text-center">Please Fill Out Your Information Carefully</p>
        </CardHeader>
        <CardBody>
        <Table responsive striped bordered={false} className="text-justify-center">
                <tbody>
                  <tr>
                  <td>
                    <h6>Book ID:</h6>
                  </td>
                  <td>
                    {ebId}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Title of Book:</h6>
                  </td>
                  <td>
                    {book.b_title}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Author of Book:</h6>
                  </td>
                  <td>
                    {book.b_authorname}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Edition:</h6>
                  </td>
                  <td>
                    {book.b_edition}
                  </td>
                  </tr>
                  <tr>
                  <td>
                   <h6>Number of Pages:</h6>
                  </td>
                  <td>
                    {book.b_numOfPages}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Price:</h6>
                  </td>
                  <td>
                    {book.b_price}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Owner's Email:</h6>
                  </td>
                  <td>
                    {book.soldBy_Email}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>The Book Owner Wants To Have:</h6>
                  </td>
                  <td>
                    {book.wishedBook}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>The Author Of The Book Owner Wants To Have:</h6>
                  </td>
                  <td>
                    {book.wishedBookAuthor}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>The Edition Of The Book Owner Wants To Have:</h6>
                  </td>
                  <td>
                    {book.wishedBookEdition}
                  </td>
                  </tr>
                  
                </tbody>
              </Table>
            <Form onSubmit={handleSubmit}>
            <FormGroup>
                    <Label for="phone">Enter Your Contact Number</Label>
                    <Input 
                    type="number"
                    placeholder="Enter here"
                    id="phone"
                    value={exchangeDetail.phone}
                    onChange={(e)=>handleChange(e,'phone')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Enter Your Email Address</Label>
                    <Input 
                    type="email"
                    placeholder="Enter here"
                    id="exchangerEmail"
                    value={exchangeDetail.exchangerEmail}
                    onChange={(e)=>handleChange(e,'exchangerEmail')}
                    required></Input>
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
  )
}

export default ExchangeForm;



