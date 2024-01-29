import React from 'react'
import { Button, Card, CardBody, CardText, Badge, Row, Col } from 'reactstrap'

function PostExchange({ post = { b_title: "This is default post title", b_authorname: "Author", b_edition: "Edition", b_numOfPages: "number", b_price: "unknown", b_description: "This is default post description", image: "coverPage" } }) {
  const imageSource = '/' + post.image.replace(/^.*?\\public\\/, '').replace(/\\/g, '/');
  return (
    <Card className='border-1 shadow-sm my-3 w-1/2 px-3'
      style={{
        width: '95%'
      }}>
      <CardBody>
        <Row className='justify-between' >
          <Col className='gap-4 my-2 mr-15'>
            <h4>
              <Badge style={{ backgroundColor: '#EE7214' }} pill>Available</Badge>
            </h4>
            <h5>Book ID: {post.borrId}</h5>
            <h2>
              {post.b_title}
            </h2>
            <h4>
              Written By {post.b_authorname}
            </h4>
            <h5>
              Edition: {post.b_edition}<br />Number of Pages: {post.b_numOfPages}
            </h5>
            <h5>Category: {post.category}</h5>
            <CardText>
              {post.b_description}...
            </CardText>
            <h6>Exchange with: {post.wishedBook} written by {post.wishedBookAuthor} , edition: {post.wishedBookEdition}</h6>
            <div className='text-start'>
              <Button style={{ backgroundColor: '#EE7214', border: 'none' }} href={`/user/exchange-book-info/${post.ebId}`}>Exchange</Button>
            </div>
          </Col>
          <Col className='mt-5 pr-4 ml-5'>
            <img src={imageSource} alt="cover page" width="300px" height="300px" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default PostExchange;