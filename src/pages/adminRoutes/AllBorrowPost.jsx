/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Table, Col, Row } from "reactstrap"
import { getAllBorrowPost } from '../../services/user-service';

const AllBorrowPost = () => {
    const [borrowpost, setBorrowPost] = useState();

    useEffect(() => {
        getAllBorrowPost().then((response) => {
            setBorrowPost(response);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <Base>
            <Row className="m-4">
                <Col>
                    <h2 className="mb-4">All Borrow Posts</h2>
                    <Table responsive striped bordered={false} className="text-justify-center">
                        <thead>
                            <tr className='text-center'>
                                <th>Book ID</th>
                                <th>Book title</th>
                                <th>Author name</th>
                                <th>Book Edition</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Posted At</th>
                                <th>Lender Email</th>
                            </tr>
                        </thead>
                        {borrowpost ? (
                            <tbody>            {borrowpost.map((borrowposts) => (

                                <tr key={borrowposts.borrId} className='text-center'>
                                    <td>{borrowposts.borrId}</td>
                                    <td>{borrowposts.b_title}</td>
                                    <td>{borrowposts.b_authorname}</td>
                                    <td>{borrowposts.b_edition}</td>
                                    <td>{borrowposts.b_price}</td>
                                    <td>{borrowposts.category}</td>
                                    <td>{borrowposts.postAt}</td>
                                    <td>{borrowposts.soldBy_Email}</td>
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

export default AllBorrowPost;