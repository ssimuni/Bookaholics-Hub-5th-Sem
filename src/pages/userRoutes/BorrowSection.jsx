import React from 'react'
import Base from '../../components/Base';
import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import MarketPlaceBorrow from '../../components/MarketPlaceBorrow';
const BorrowSection=()=> {
   
  return (
    <Base>
    <Container className="mt-3">
    <MarketPlaceBorrow/>
    </Container>
    <Container className="d-flex justify-content-center my-4">
    <Pagination >
      <PaginationItem>
        <PaginationLink previous>
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink >
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
    </Container>
    </Base>
  )
}

export default BorrowSection;