import Base from '../components/Base';
import { Container } from "reactstrap";
function About() {
  return (
    <Base>
      <div
        style={{
          height: '120vh',
          backgroundImage: "url('../background6.jpg')",
          marginTop: '-80px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container style={{ marginTop: '80px' }}>
          <h1 style={{ color: "white", marginLeft: "400px", marginTop: "50px" }}>
            About Bookaholics' Hub
          </h1>
          <h4 style={{ color: "white", textAlign: "justify" }}>
            At Bookaholics' Hub, we're a passionate team of bibliophiles who understand the joy and significance of reading. Our platform offers a wide range of features to enhance your book journey and fellow bookaholics. With Bookaholics' Hub you can exchange, buy, sell, and borrow books, creating a vibrant community for avid readers. Our mission is to connect readers, foster literary discussions, and create a thriving community united by the love of books. Whether you're a seasoned reader or just embarking on your literary journey. Bookaholics' Hub is here to enhance your reading adventures. Happy reading!"
          </h4>

        </Container>
      </div>
    </Base>
  )
};
export default About;