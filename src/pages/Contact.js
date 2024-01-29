import Base from '../components/Base';
import {Container} from "reactstrap";

function Contact() {
  return (
    <Base>
    <div
        style={{
          height: '120vh',
          backgroundImage: "url('../background6.jpg')", 
          marginTop:'-80px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
    <Container style={{marginTop: '80px'}}>
    <h1 style={{color: "white", marginLeft:"500px", marginTop:"50px"}}>
    Get In Touch
    </h1>

    <h4 style={{color:"white", textAlign:"justify"}}>
    We are here to help. Our team is ready to assist you with any inquiries. 
    Stay connected with our book-loving community. 
    Find our contact details below for easy communication.
    </h4>
   
            <section style={{display:'flex'}}>
                <div style={{paddingLeft:'100px'}}>
                <h5 style={{color:'white', paddingTop:'30px'}}>Our Location</h5>
                            <p style={{color:'white'}}>University of Chittagong, Chittagong 4331</p>
                </div>

                <div style={{paddingLeft:'180px'}}>
                <h5 style={{color:'white', paddingTop:'30px'}}>Our Phone Number</h5>
                            <p style={{color:'white'}}> Office: +600127890</p>
                </div>

                <div style={{paddingLeft:'180px'}}>
                <h5 style={{color:'white', paddingTop:'30px'}}>Our Email</h5>
                            <p style={{color:'white'}}>bookaholicshub@gmail.com</p>
                </div>
              
            </section>

    </Container>
    </div>
    </Base>
  )
};
export default Contact
;