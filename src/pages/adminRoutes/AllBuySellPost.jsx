/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Table, Col, Row } from "reactstrap"
import { getAllBuySellPost } from '../../services/user-service';

const AllBuySellPost = () => {
    const [buysellpost, setBuySellPost] = useState();

    useEffect(() => {
        getAllBuySellPost().then((response) => {
            setBuySellPost(response);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <Base>
            <Row className="m-4">
                <Col>
                    <h2 className="mb-4">All Buy Sell Posts</h2>
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
                                <th>Seller Email</th>
                            </tr>
                        </thead>
                        {buysellpost ? (
                            <tbody>            {buysellpost.map((buysellposts) => (

                                <tr key={buysellposts.sid} className='text-center'>
                                    <td>{buysellposts.sid}</td>
                                    <td>{buysellposts.b_title}</td>
                                    <td>{buysellposts.b_authorname}</td>
                                    <td>{buysellposts.b_edition}</td>
                                    <td>{buysellposts.b_price}</td>
                                    <td>{buysellposts.category}</td>
                                    <td>{buysellposts.postAt}</td>
                                    <td>{buysellposts.soldBy_Email}</td>
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

export default AllBuySellPost;