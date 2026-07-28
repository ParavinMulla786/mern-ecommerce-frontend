import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'  // <-- ADD THIS IMPORT
import { placeOrder } from '../redux/slices/orderSlice'
import { clearCart } from '../redux/slices/cartSlice'
import { formatCurrency } from '../utils/formatDate'
import Loader from '../components/common/Loader'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { items, totalAmount, isLoading: cartLoading } = useSelector((state) => state.cart)
  const { isLoading: orderLoading } = useSelector((state) => state.orders)

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    houseNumber: '',
    area: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [isAuthenticated, items, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const requiredFields = ['name', 'contactNumber', 'houseNumber', 'area', 'city', 'state', 'pincode']
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      }
    })

    if (formData.contactNumber && !/^[0-9]{10,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10-15 digits'
    }

    if (formData.pincode && !/^[0-9]{5,6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 5 or 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const orderData = {
        shippingAddress: formData,
        paymentMethod
      }
      
      await dispatch(placeOrder(orderData)).unwrap()
      await dispatch(clearCart())
      
      toast.success('Order placed successfully!')  // Now toast is defined
      navigate('/my-orders')
    } catch (error) {
      toast.error(error || 'Failed to place order')  // Now toast is defined
    }
  }

  if (cartLoading || orderLoading) return <Loader text="Processing..." />

  return (
    <Container className="py-4">
      <h2 className="mb-4">Checkout</h2>
      
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-3">Shipping Address</h5>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="contactNumber"
                        placeholder="Enter contact number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        isInvalid={!!errors.contactNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>House Number / Building *</Form.Label>
                  <Form.Control
                    type="text"
                    name="houseNumber"
                    placeholder="Enter house number"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.houseNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.houseNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Area / Street *</Form.Label>
                  <Form.Control
                    type="text"
                    name="area"
                    placeholder="Enter area"
                    value={formData.area}
                    onChange={handleChange}
                    isInvalid={!!errors.area}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.area}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State *</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode *</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        isInvalid={!!errors.pincode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pincode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Form.Group>

                <h5 className="mt-4 mb-3">Payment Method</h5>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Online Payment"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" size="lg">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Order Summary</h5>
              <div className="mb-2">
                <span className="text-muted">Items:</span>
                <span className="float-end">{items.length}</span>
              </div>
              <hr />
              <div className="mb-3">
                <strong>Total Amount:</strong>
                <strong className="float-end text-primary fs-5">
                  {formatCurrency(totalAmount)}
                </strong>
              </div>
              <Link to="/cart" className="btn btn-outline-secondary w-100">
                Back to Cart
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout