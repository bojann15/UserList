import React, { useEffect, useState } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import API from '../api/index';
import User from './User';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Chart from '../utilis/Chart';

const UserList = () => {
    const [keyword, setKeyword] = useState('');
    const [userList, setUserList] = useState([]);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('user');
                if (!keyword && !filter) {
                    setUserList(response.data.data);
                } else if (keyword) {
                    let matches = response.data.data.filter((item) => {
                        const regex = new RegExp(`^${keyword}`, 'gi')
                        return item?.firstName?.match(regex);
                    });
                    setUserList(matches);
                } else if (filter) {
                    let matches = response.data.data.filter((item) => {
                        return item?.title === filter;
                    })
                    setUserList(matches);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [keyword, filter]);

    const dragEnd = (result) => {
        if (!result.destination) return;
        const usersItems = [...userList];
        const [orderedUsers] = usersItems.splice(result.source.index, 1);
        usersItems.splice(result.destination.index, 0, orderedUsers);
        setUserList(usersItems);
    };

    return (
        <div>
            <Row className="g-2" >
                <Col xl={4}>
                    <InputGroup >
                        <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value.toLowerCase())} placeholder="Search" />
                        <div className="search-icon">
                            <i className="fas fa-search" />
                        </div>
                    </InputGroup>
                </Col>
                <Col xl={3}>
                    <Form.Select aria-label="Floating label select example" value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value=''>Choose...</option>
                        <option value="mr">Mr</option>
                        <option value="ms">Ms</option>
                        <option value="mrs">Mrs</option>
                        <option value="miss">Miss</option>
                    </Form.Select>
                </Col>
            </Row>

            <DragDropContext onDragEnd={dragEnd}>
                <Droppable droppableId="usersSequence" direction="horizontal" type="column"  >
                    {(provided) => (
                        <Row  {...provided.droppableProps} ref={provided.innerRef} className={"row-cols-lg-5"}>
                            {userList.map((user, i) => (
                                <Draggable draggableId={`draggable-${i}`} key={`draggable-${i}`} index={i}>
                                    {(provided) => (
                                        <Col className="row_userlist" key={user.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                            <User user={user} />
                                        </Col>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Row>
                    )}
                </Droppable>
            </DragDropContext>
            <Row className="chart" xl={1} >
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Chart users={userList} />
                </Col>
            </Row>
        </div >
    )
};

export default UserList;
