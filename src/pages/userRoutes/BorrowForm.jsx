import React,{useContext,useEffect,useState} from 'react'
import Base from '../../components/Base';
import userContext from '../../context/userContext';
import {Card, CardBody, Col, Row, CardHeader, Container, Form, FormGroup, Label, Input, Button, Table} from "reactstrap";
import { getBorrowBook, borrowPlace } from '../../services/user-service';
import { useParams,useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
const BorrowForm=()=> {
  const object=useContext(userContext);
  const [book,setBook]=useState(null);
  const {borrId} =useParams(); 
 

  useEffect(()=>{
      getBorrowBook(borrId).then((response)=>{
      setBook({...response})
      })
  },[borrId])

  const [borrowDetail,setBorrowDetail]=useState({
    borrowerEmail:'',
    phone:'',
    borrId:borrId,
    
})
const navigate =useNavigate();
const handleChange=(event,field)=>{
    let actualValue=event.target.value
    setBorrowDetail({
        ...borrowDetail,
        [field]: actualValue
    })

}
const handleSubmit=(event)=>{
  event.preventDefault();
  borrowPlace(borrowDetail).then((response)=>{
    if(response.status===200){
      toast.success("Request has been sent to lender.");
      navigate("/user/borrow");
      }else{
          toast.error("Process Could Not Be Completed! Try Again later");
          navigate("/user/borrow");
      }
      setBorrowDetail({
        borrowerEmail:'',
        phone:'',
         borrId:borrId,
      })
  }).catch((error)=>{
      console.log(error);
      toast.error("Something went wrong. Try again later.");
      navigate("/user/borrow");
      setBorrowDetail({
        borrowerEmail:'',
        phone:'',
        borrId:borrId,
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
            <h3 className="text-center">Details of Borrowing Book</h3> 
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
                    {borrId}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Book Title:</h6>
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
                    <h6>Lender Email:</h6>
                  </td>
                  <td>
                    {book.soldBy_Email}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Place From Where Borrower Have To Pick the Book:</h6>
                  </td>
                  <td>
                    {book.pickupPoint}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Rental Period :</h6>
                  </td>
                  <td>
                    {book.returnTime}
                  </td>
                  </tr>
                  <tr>
                  <td>
                    <h6>Rental Fee:</h6>
                  </td>
                  <td>
                    {book.paymentForBorrow}
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
                    value={borrowDetail.phone}
                    onChange={(e)=>handleChange(e,'phone')}
                    required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="borrowerEmail">Enter Your Email Address</Label>
                    <Input 
                    type="email"
                    placeholder="Enter here"
                    id="borrowerEmail"
                    value={borrowDetail.borrowerEmail}
                    onChange={(e)=>handleChange(e,'borrowerEmail')}
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

export default BorrowForm;



