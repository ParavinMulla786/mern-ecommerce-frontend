import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Card, Row, Col, Badge, Button, Table } from 'react-bootstrap'
import { fetchOrderById, cancelOrder } from '../redux/slices/orderSlice'
import { formatCurrency, formatDate } from '../utils/formatDate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../utils/constants'
import Loader from '../components/common/Loader'
import { toast } from 'react-toastify'

const OrderDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrder()
  }, [id])

  const loadOrder = async () => {
    try {
      setLoading(true)
      const response = await dispatch(fetchOrderById(id)).unwrap()
      setOrder(response)
    } catch (error) {
      toast.error('Failed to load order')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await dispatch(cancelOrder(id)).unwrap()
        toast.success('Order cancelled successfully')
        loadOrder()
      } catch (error) {
        toast.error(error || 'Failed to cancel order')
      }
    }
  }

  if (loading) return <Loader text="Loading order details..." />

  if (!order) {
    return (
      <Container className="py-5 text-center">
        <h4>Order not found</h4>
        <Link to="/my-orders" className="btn btn-primary mt-3">Back to Orders</Link>
      </Container>
    )
  }

  const isCancellable = order.orderStatus === 'placed' || order.orderStatus === 'confirmed' || order.orderStatus === 'processing'

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order #{order.orderNumber}</h2>
        <Link to="/my-orders" className="btn btn-outline-secondary">Back to Orders</Link>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h6 className="mb-3">Order Items</h6>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.productImage ? `http://localhost:7001/${item.productImage}` : 'https://via.placeholder.com/50x50'}
                            alt={item.productName}
                            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            className="me-2"
                          />
                          <span>{item.productName}</span>
                        </div>
                      </td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h6 className="mb-3">Order Summary</h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount:</span>
                  <span>-{formatCurrency(order.discountAmount)}</span>
                </div>
              )}
              {order.deliveryCharge > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery:</span>
                  <span>{formatCurrency(order.deliveryCharge)}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary fs-5">{formatCurrency(order.totalAmount)}</strong>
              </div>

              <div className="mb-2">
                <Badge bg={ORDER_STATUS_COLORS[order.orderStatus] || 'secondary'}>
                  {ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus}
                </Badge>
              </div>

              <p className="text-muted small">
                Placed on {formatDate(order.createdAt)}
              </p>

              {isCancellable && (
                <Button 
                  variant="danger" 
                  className="w-100 mt-2"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="mb-3">Shipping Address</h6>
              <p className="mb-1"><strong>{order.shippingAddress.name}</strong></p>
              <p className="mb-1">{order.shippingAddress.contactNumber}</p>
              <p className="mb-0">
                {order.shippingAddress.houseNumber}, {order.shippingAddress.area}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                {order.shippingAddress.country} - {order.shippingAddress.pincode}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderDetails