import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base';
import userContext from '../../context/userContext';
import { Card, CardBody, Col, Row, CardHeader, Container, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import { getABook, orderPlace } from '../../services/user-service';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const OrderPlaceForm = () => {
  const object = useContext(userContext);
  const [book, setBook] = useState(null);
  const { sid } = useParams();


  useEffect(() => {
    getABook(sid).then((response) => {
      setBook({ ...response })
    })
  }, [sid])

  const [orderDetail, setOrderDetail] = useState({
    takenBy_Email: '',
    phone: '',
    b_quantity: '',
    pickupPoint: '',
    sbID: sid,
  })
  const navigate = useNavigate();
  const handleChange = (event, field) => {
    let actualValue = event.target.value
    setOrderDetail({
      ...orderDetail,
      [field]: actualValue,
      price: book.b_price
    })

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sid);
    orderPlace(orderDetail).then((response) => {
      if (response.status === 205) {
        toast.info("Not enough stock of this book. You can order maximum " + book.b_quantity)
        navigate("/user/buysell");
      }
      else if (response.status === 200) {
        toast.success("Request has been sent to seller. You have ordered books of Tk." + response.data.total);
        navigate("/user/buysell");
      } else {
        toast.error("Process could not be completed. Try again later.");
      }
      setOrderDetail({
        takenBy_Email: '',
        phone: '',
        b_quantity: '',
        pickupPoint: '',
      })
    }).catch((error) => {
      console.log(error);
      toast.error("Something went wrong. Try again later.");
      setOrderDetail({
        takenBy_Email: '',
        phone: '',
        b_quantity: '',
        pickupPoint: '',
      })
    })
  }
  return (
    book ? (
      <Base>
        <Container className="mt-3">
          <Row className="mt-4">
            <Col sm={{ size: 8, offset: 2 }}>
              <Card color="dark" outline>
                <CardHeader>
                  <h3 className="text-center">Order Details</h3>
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
                          {sid}
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
                          <h6>Seller Email:</h6>
                        </td>
                        <td>
                          {book.soldBy_Email}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="b_quantity">Enter Quantity</Label>
                      <Input
                        type="number"
                        id="b_quantity"
                        value={orderDetail.b_quantity}
                        onChange={(e) => handleChange(e, 'b_quantity')}
                        required></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="phone">Enter Your Contact Number</Label>
                      <Input
                        type="tel"
                        placeholder="Enter here"
                        id="phone"
                        value={orderDetail.phone}
                        onChange={(e) => handleChange(e, 'phone')}
                        required></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="pickupPoint">Enter Address from Where You Will Receive the Order</Label>
                      <Input
                        type="address"
                        placeholder="Enter here"
                        id="pickupPoint"
                        value={orderDetail.pickupPoint}
                        onChange={(e) => handleChange(e, 'pickupPoint')}
                        required></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Enter Your Email Address</Label>
                      <Input
                        type="email"
                        placeholder="Enter here"
                        id="takenBy_Email"
                        value={orderDetail.takenBy_Email}
                        onChange={(e) => handleChange(e, 'takenBy_Email')}
                        required></Input>
                    </FormGroup>
                    <FormGroup check>
                      <Input type="checkbox" required />
                      <Label check>
                        I have read the terms and policies of this platform carefully and I agree with these.
                      </Label>
                    </FormGroup>
                    <Container className="text-center">
                      <Button style={{ backgroundColor: "#EE7214", border: "none", color: "#fff" }} >
                        Place Order
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

export default OrderPlaceForm;



