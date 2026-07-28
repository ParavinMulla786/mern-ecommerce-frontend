import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>🛒 E-Commerce</h5>
            <p className="text-muted">Your one-stop shop for everything you need.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/shop" className="text-muted text-decoration-none">Shop</a></li>
              <li><a href="/cart" className="text-muted text-decoration-none">Cart</a></li>
              <li><a href="/my-orders" className="text-muted text-decoration-none">Orders</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p className="text-muted">Email: support@ecommerce.com</p>
            <p className="text-muted">Phone: +91 98765 43210</p>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <p className="text-center text-muted mb-0">
          &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}

export default Footer