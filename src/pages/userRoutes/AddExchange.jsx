import React from 'react'
import Base from '../../components/Base';
import { Container } from 'reactstrap';
import {AddPostExchange} from '../../components/AddPostExchange';

const AddExchange=()=> {
   
  return (
    <Base>
    <Container className="mt-3">
     <AddPostExchange/>
    </Container>
    </Base>
  )
}

export default AddExchange;



