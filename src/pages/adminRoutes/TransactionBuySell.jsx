/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Table, Col, Row } from "reactstrap"
import { getTransactionBuySell } from '../../services/user-service';

const TransactionBuySell = () => {
    const [transactionbuysell, setTransactionBuySell] = useState();

    useEffect(() => {
        getTransactionBuySell().then((response) => {
            setTransactionBuySell(response);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <Base>
            <Row className="m-4">
                <Col>
                    <h2 className="mb-4">All Transaction Records</h2>
                    <Table responsive striped bordered={false} className="text-justify-center">
                        <thead>
                            <tr className='text-center'>
                                <th>Order ID</th>
                                <th>Book Title</th>
                                <th>Seller Email</th>
                                <th>Order date</th>
                                <th>Pickup Point</th>
                                <th>Total Payment</th>
                                <th>Buyer Email</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        {transactionbuysell ? (
                            <tbody>            {transactionbuysell.map((transactionbuysells) => (

                                <tr key={transactionbuysells.orderId} className='text-center'>
                                    <td>{transactionbuysells.orderId}</td>
                                    <td>{transactionbuysells.b_title}</td>
                                    <td>{transactionbuysells.soldBy_Email}</td>
                                    <td>{transactionbuysells.orderedAt}</td>
                                    <td>{transactionbuysells.pickupPoint}</td>
                                    <td>{transactionbuysells.total}</td>
                                    <td>{transactionbuysells.takenBy_Email}</td>
                                    <td>{transactionbuysells.state}</td>
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

export default TransactionBuySell;