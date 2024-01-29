import React from 'react';
import Base from '../components/Base';
import { Row } from 'reactstrap';

function Policy() {
  const containerStyle = {
    backgroundColor: '#DCF2F1',
    padding: '40px',
    borderRadius: '8px',
  };

  return (
    <Base>
      <Row className="m-4">
        <div className="policy-container" style={containerStyle}>
          <h1 className="text-center policy-heading">Our Terms and Policies</h1>
          <p className="policy-intro">
            Welcome to Bookaholics'Hub! Please read the following policies carefully to ensure a positive experience for all users. By using our Platform, you agree to abide by these policies. We reserve the right to modify these policies as needed to ensure a safe and positive environment for all users. Wishing you joyful transactions in Bookaholics'Hub!
          </p>
          <ol className="policy-list">
          <li>Users should be careful when selecting images for buying,borrowing or exchanging purposes, as once a user posts an image, they can't change it.</li>
            <li>Users can update post information but cannot delete the post.</li>
            <li>Users should provide correct information when posting and confirming books for sale, exchange, or borrow.</li>
            <li>For borrow, exchange, or order purposes, users should use the email that was used to register on our platform.</li>
            <li>Users should use a valid email and provide the necessary personal information (such as address and contact number) required to access our platform's services.</li>
            <li>Users cannot post anything illegal, harassing, or controversial, including images or text on our platform. If such content is posted, necessary actions will be taken.</li>
            <li>Our system is entirely based on cash on delivery. Therefore, when borrowing, exchanging, buying, or selling any books, users should contact the respective person via email or contact number. They should establish the medium or location for committing the transaction.</li>
            <li>If any user becomes a victim of harassment or fraud, they can contact our support team for assistance. Here is our support team email: <a href="mailto:xyz@gmail.com">akthernejum2070@gmail.com</a>.</li>
            <li>Users must respect copyright laws and not engage in the exchange of pirated or unauthorized materials.</li>
            <li>Any form of fraudulent activity, including scams or misrepresentation, is strictly prohibited.</li>
            <li>Borrowers are expected to treat borrowed books with care and respect the owner's property.</li>
          </ol>
        </div>
      </Row>
    </Base>
  );
}

export default Policy;
