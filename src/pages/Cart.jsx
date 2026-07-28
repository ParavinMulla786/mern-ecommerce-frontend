import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap'
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import { getCart, updateCartQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice'
import { formatCurrency } from '../utils/formatDate'
import Loader from '../components/common/Loader'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalItems, totalQuantity, subtotal, totalDiscount, totalAmount, isLoading } = 
    useSelector((state) => state.cart)
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    dispatch(getCart())
  }, [dispatch, isAuthenticated, navigate])

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    dispatch(updateCartQuantity({ productId, quantity }))
  }

  const handleRemoveItem = (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      dispatch(removeFromCart(productId))
    }
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart())
    }
  }

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout')
    }
  }

  if (isLoading) return <Loader text="Loading cart..." />

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        <FaShoppingCart className="me-2" />
        Shopping Cart
      </h2>

      {items.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h5>Your cart is empty</h5>
            <p className="text-muted">Start shopping to add items to your cart</p>
            <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const product = item.productId
                      const imageUrl = product?.mainImage 
                        ? `http://localhost:7001/${product.mainImage}`
                        : 'https://via.placeholder.com/80x80?text=No+Image'

                      return (
                        <tr key={item._id || product?._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={imageUrl} 
                                alt={product?.productName}
                                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                className="me-2"
                              />
                              <div>
                                <Link to={`/product/${product?._id}`} className="text-decoration-none">
                                  <strong>{product?.productName}</strong>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleUpdateQuantity(product?._id, item.quantity - 1)}
                              >
                                <FaMinus />
                              </Button>
                              <span className="mx-2" style={{ minWidth: '30px', textAlign: 'center' }}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleUpdateQuantity(product?._id, item.quantity + 1)}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </td>
                          <td>{formatCurrency(item.totalPrice)}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleRemoveItem(product?._id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-between">
                  <Link to="/shop" className="btn btn-outline-primary">
                    Continue Shopping
                  </Link>
                  <Button variant="outline-danger" onClick={handleClearCart}>
                    Clear Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({totalQuantity}):</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount:</span>
                    <span>-{formatCurrency(totalDiscount)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="text-primary fs-5">{formatCurrency(totalAmount)}</strong>
                </div>
                <Button
                  variant="primary"
                  className="w-100"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Cart