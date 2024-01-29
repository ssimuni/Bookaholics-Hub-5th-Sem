import CustomNavbar from "./CustomNavbar";


const Base=({title="Welcome to our website",children})=>{
    return(
        <div className="container-fluid p-0 m-0">
       <CustomNavbar />
      

            {children}
        {/* <h1>
                This is footer.
        </h1> */}
        </div>
    );
};
export default Base;

// import CustomNavbar from "./CustomNavbar";
// import {Col,Row} from 'reactstrap';
// import Sidebar from "./Sidebar";

// const Base=({title="Welcome to our website",children})=>{
//     return(
//         <div className="container-fluid p-0 m-0">
//             <Row>
//             <Col sm="2">
//         <Sidebar />
//       </Col>
//       <Col sm="10">  
//        <CustomNavbar />
//             {children}
//         {/* <h1>
//                 This is footer.
//         </h1> */}
//         </Col>
//         </Row>
//         </div>
//     );
// };
// export default Base;