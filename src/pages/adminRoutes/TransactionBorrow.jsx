/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Table, Col, Row } from "reactstrap"
import { getTransactionBorrow } from '../../services/user-service';

const TransactionBorrow = () => {
    const [transaction, setTransaction] = useState();

    useEffect(() => {
        getTransactionBorrow().then((response) => {
            setTransaction(response);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <Base>
            <Row className="m-4">
                <Col>
                    <h2 className="mb-4">All Borrow Transaction Records</h2>
                    <Table responsive striped bordered={false} className="text-justify-center">
                        <thead>
                            <tr className='text-center'>
                                <th>ID</th>
                                <th>Book Title</th>
                                <th>Lender Email</th>
                                <th>Request Time</th>
                                <th>Contact Number Of Borrower</th>
                                <th>Borrower Email</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        {transaction ? (
                            <tbody>            {transaction.map((transaction) => (

                                <tr key={transaction.bpId} className='text-center'>
                                    <td>{transaction.bpId}</td>
                                    <td>{transaction.b_title}</td>
                                    <td>{transaction.soldBy_Email}</td>
                                    <td>{transaction.borrowsAt}</td>
                                    <td>{transaction.phone}</td>
                                    <td>{transaction.borrowerEmail}</td>
                                    <td>{transaction.state}</td>
                                </tr>
                            ))}
                            </tbody>) :
                            <>
                                <h3>No records found...</h3>
                            </>
                        }
                    </Table>
                </Col>
            </Row>
        </Base>
    )
}

export default TransactionBorrow;