import React from 'react'
import Base from '../../components/Base';
import {AddPost} from '../../components/AddPost';
import { Container } from 'reactstrap';

const UserDashboard=()=> {
   
  return (
    <Base>
    <Container className="mt-3">
     <AddPost/>
    </Container>
    </Base>
  )
}

export default UserDashboard;



// {/* ei part <Base> er por chilo.
// <div>
//   <Container>
//    <AddPost/>
//    </Container>
//     </div>
//  */}