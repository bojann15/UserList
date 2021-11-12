import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const User = ({ user }) => {
    return (
        <div className="row_user">
            <Card className="my-3 p-3 rounded">
                <Link to={`/user/${user.id}`}>
                    <Card.Img src={user.picture} alt={user.firstName} />
                </Link>
                <Card.Body>
                    <Link to={`/user/${user.id}`}>
                        <Card.Title as="div">
                            <strong>{user.title}  {user.firstName} {user.lastName}</strong>
                        </Card.Title>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
};
export default User;
