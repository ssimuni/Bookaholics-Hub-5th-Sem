import React from 'react'
import Base from '../../components/Base';
import {AddPostBorrow} from '../../components/AddPostBorrow';
import { Container } from 'reactstrap';

const AddBorrow=()=> {
   
  return (
    <Base>
    <Container className="mt-3">
     <AddPostBorrow/>
    </Container>
    </Base>
  )
}

export default AddBorrow;



