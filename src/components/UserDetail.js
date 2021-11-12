import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import API from '../api/index';
import { userData } from '../utilis/UserData';
import PieChart from '../utilis/PieChart';

const UserDetail = () => {
    const { id } = useParams();
    const [userDetail, setUserDetail] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`user/${id}`);
                userData.forEach(item => {
                    if (item.id === response.data.id) {
                        setUserDetail(Object.assign(response.data, item))
                    }
                });
            } catch (err) {
                console.error(err.message);
            };
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Home Page</Link>
            <div>
                <Row md={3}>
                    <Col>
                        <Card>
                            <Image style={{ width: '100%' }} src={userDetail.picture} alt={userDetail.firstName} fluid rounded />
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{userDetail.firstName} {userDetail.lastName}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Birth Date: <strong style={{ fontWeight: 'bold' }} >{userDetail?.dateOfBirth?.substring(0, 10)}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Gender: <strong style={{ fontWeight: 'bold' }} >{userDetail.gender}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Title: <strong style={{ fontWeight: 'bold' }} >{userDetail.title}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Email: <strong style={{ fontWeight: 'bold' }} >{userDetail.email}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Phone: <strong style={{ fontWeight: 'bold' }} >{userDetail.phone}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    User since <strong style={{ fontWeight: 'bold' }} >{userDetail?.registerDate?.substring(0, 10)}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href={userDetail.cv} target={'_blank'} rel="noreferrer">Link to {userDetail.firstName} CV resume</a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col >
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>Location</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Country: </Col>
                                        <Col><strong style={{ fontWeight: 'bold' }} >{userDetail?.location?.country} </strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>State: </Col>
                                        <Col><strong style={{ fontWeight: 'bold' }} >{userDetail?.location?.state} </strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>City: </Col>
                                        <Col><strong style={{ fontWeight: 'bold' }} >{userDetail?.location?.city} </strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Streeet: </Col>
                                        <Col><strong style={{ fontWeight: 'bold' }} >{userDetail?.location?.street} </strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Time zone: </Col>
                                        <Col><strong style={{ fontWeight: 'bold' }} >{userDetail?.location?.timezone}</strong> </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col className='pie' >
                        <h3 >Task Percentege: {(userDetail.finishedTask / userDetail.assignedTask * 100).toFixed(0)}%</h3>
                        <PieChart data1={userDetail.finishedTask} data2={userDetail.assignedTask} />
                    </Col>
                </Row>
            </div>
        </div >
    )
};

export default UserDetail;
