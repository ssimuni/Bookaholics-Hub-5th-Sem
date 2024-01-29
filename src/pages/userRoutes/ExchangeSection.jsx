import React from 'react'
import Base from '../../components/Base';
import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import MarketPlaceExchange from '../../components/MarketPlaceExchange';
const ExchangeSection=()=> {
   
  return (
    <Base>
    <Container className="mt-3">
    <MarketPlaceExchange/>
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

export default ExchangeSection;