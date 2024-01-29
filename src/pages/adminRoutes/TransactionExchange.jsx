/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Table, Col, Row } from "reactstrap"
import { getTransactionExchange } from '../../services/user-service';

const TransactionExchange = () => {
    const [transaction, setTransaction] = useState();

    useEffect(() => {
        getTransactionExchange().then((response) => {
            setTransaction(response);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <Base>
            <Row className="m-4">
                <Col>
                    <h2 className="mb-4">All Exchange Transaction Records</h2>
                    <Table responsive striped bordered={false} className="text-justify-center">
                        <thead>
                            <tr className='text-center'>
                                <th>ID</th>
                                <th>Book Title</th>
                                <th>Exchange Proposer Email</th>
                                <th>Request Time</th>
                                <th>Desired Book</th>
                                <th>Acceptor Email</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        {transaction ? (
                            <tbody>            {transaction.map((transaction) => (

                                <tr key={transaction.epId} className='text-center'>
                                    <td>{transaction.epId}</td>
                                    <td>{transaction.b_title}</td>
                                    <td>{transaction.soldBy_Email}</td>
                                    <td>{transaction.postAt}</td>
                                    <td>{transaction.wishedBook}</td>
                                    <td>{transaction.exchangerEmail}</td>
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

export default TransactionExchange;