import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaTachometerAlt, FaUsers, FaTags, FaList, FaBox, FaShoppingCart, FaStar } from 'react-icons/fa'

const AdminLayout = () => {
  const location = useLocation()

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/users', label: 'Users', icon: <FaUsers /> },
    { path: '/admin/brands', label: 'Brands', icon: <FaTags /> },
    { path: '/admin/categories', label: 'Categories', icon: <FaList /> },
    { path: '/admin/products', label: 'Products', icon: <FaBox /> },
    { path: '/admin/orders', label: 'Orders', icon: <FaShoppingCart /> },
    { path: '/admin/reviews', label: 'Reviews', icon: <FaStar /> },
  ]

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3">
          <h4>Admin Panel</h4>
          <hr className="border-secondary" />
          <Nav className="flex-column">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={`text-white py-2 ${location.pathname === item.path ? 'bg-primary rounded' : ''}`}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <Navbar bg="light" expand="lg" className="px-4 shadow-sm">
          <Container fluid>
            <Navbar.Brand>Welcome, Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">View Site</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout