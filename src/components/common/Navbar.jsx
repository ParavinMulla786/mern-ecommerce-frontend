import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { logoutUser } from '../../redux/slices/authSlice'  // Changed from logout to logoutUser
import { resetCartState } from '../../redux/slices/cartSlice'

const MainNavbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { totalItems } = useSelector((state) => state.cart)

  const [expanded, setExpanded] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUser())  // Changed from logout to logoutUser
    dispatch(resetCartState())
    navigate('/login')
    setExpanded(false)
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          🛒 E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : true)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/shop" onClick={() => setExpanded(false)}>
              Shop
            </Nav.Link>
            
            <Nav.Link as={Link} to="/cart" className="position-relative" onClick={() => setExpanded(false)}>
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown
                title={
                  <span>
                    <FaUser className="me-1" />
                    {user?.name}
                  </span>
                }
                id="basic-nav-dropdown"
                align="end"
              >
                {user?.role === 'admin' && (
                  <NavDropdown.Item as={Link} to="/admin" onClick={() => setExpanded(false)}>
                    Admin Dashboard
                  </NavDropdown.Item>
                )}
                {user?.role === 'vendor' && (
                  <NavDropdown.Item as={Link} to="/vendor" onClick={() => setExpanded(false)}>
                    Vendor Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/profile" onClick={() => setExpanded(false)}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/my-orders" onClick={() => setExpanded(false)}>
                  My Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavbar