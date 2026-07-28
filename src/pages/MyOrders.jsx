import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Badge, Button, Row, Col } from 'react-bootstrap'
import { fetchMyOrders, cancelOrder } from '../redux/slices/orderSlice'
import { formatCurrency, formatDate } from '../utils/formatDate'
import Loader from '../components/common/Loader'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../utils/constants'
import { toast } from 'react-toastify'

const MyOrders = () => {
  const dispatch = useDispatch()
  const { orders, isLoading } = useSelector((state) => state.orders)
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    dispatch(fetchMyOrders({ page: 1, limit: 20 }))
  }, [dispatch])

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await dispatch(cancelOrder(orderId)).unwrap()
        toast.success('Order cancelled successfully')
        dispatch(fetchMyOrders({ page: 1, limit: 20 }))
      } catch (error) {
        toast.error(error || 'Failed to cancel order')
      }
    }
  }

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.orderStatus === selectedStatus)

  if (isLoading) return <Loader text="Loading orders..." />

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Orders</h2>

      {/* Status Filter */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        <Button 
          variant={selectedStatus === 'all' ? 'primary' : 'outline-secondary'}
          size="sm"
          onClick={() => setSelectedStatus('all')}
        >
          All
        </Button>
        {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
          <Button
            key={key}
            variant={selectedStatus === key ? 'primary' : 'outline-secondary'}
            size="sm"
            onClick={() => setSelectedStatus(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h5>No orders found</h5>
            <p className="text-muted">Start shopping to place your first order</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </Card.Body>
        </Card>
      ) : (
        filteredOrders.map((order) => (
          <Card key={order._id} className="mb-3 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">Order #{order.orderNumber}</h6>
                      <p className="text-muted small mb-2">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge bg={ORDER_STATUS_COLORS[order.orderStatus] || 'secondary'}>
                      {ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus}
                    </Badge>
                  </div>

                  <div className="mt-2">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item._id} className="d-flex align-items-center gap-2 mb-1">
                        <img 
                          src={item.productImage ? `http://localhost:7001/${item.productImage}` : 'https://via.placeholder.com/40x40'}
                          alt={item.productName}
                          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                        />
                        <span className="small">
                          {item.productName} x {item.quantity}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <small className="text-muted">+ {order.items.length - 3} more items</small>
                    )}
                  </div>
                </Col>

                <Col md={4} className="text-end">
                  <div className="mb-2">
                    <strong>Total: {formatCurrency(order.totalAmount)}</strong>
                  </div>
                  <div className="d-flex gap-2 justify-content-end flex-wrap">
                    <Link to={`/order/${order._id}`}>
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </Link>
                    {order.orderStatus === 'placed' || order.orderStatus === 'confirmed' || order.orderStatus === 'processing' ? (
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Cancel Order
                      </Button>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  )
}

export default MyOrders