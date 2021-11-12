import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import UserList from './components/UserList';
import Header from './components/Header';
import UserDetail from './components/UserDetail';
import Footer from './components/Footer';

const App = () => {

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<UserList />} />
            <Route path="user/:id" element={<UserDetail />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
