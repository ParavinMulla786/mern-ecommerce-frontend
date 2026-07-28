import React, { useState, useEffect } from 'react'
import { Table, Button, Badge, Card, Form, Row, Col } from 'react-bootstrap'
import { getAllOrdersApi, updateOrderStatusApi } from '../../api/orderApi'
import { formatCurrency, formatDate } from '../../utils/formatDate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants'
import Loader from '../../components/common/Loader'
import { toast } from 'react-toastify'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    startDate: '',
    endDate: '',
  })
  const [pagination, setPagination] = useState({})
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await getAllOrdersApi(filters)
      setOrders(response.data.orders || [])
      setPagination(response.data.pagination || {})
      setStats(response.data.stats || {})
    } catch (error) {
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatusApi(orderId, newStatus)
      toast.success('Order status updated')
      fetchOrders()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  if (loading) return <Loader text="Loading orders..." />

  return (
    <div>
      <h4 className="mb-4">Order Management</h4>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h5>{stats.orderCount || 0}</h5>
              <p className="text-muted small">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h5>{formatCurrency(stats.totalAmount || 0)}</h5>
              <p className="text-muted small">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h5>{formatCurrency(stats.averageOrderValue || 0)}</h5>
              <p className="text-muted small">Avg Order Value</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Statuses</option>
                  {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Payment Status</Form.Label>
                <Form.Select
                  name="paymentStatus"
                  value={filters.paymentStatus}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button variant="primary" onClick={fetchOrders}>
                Apply Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.userId?.name || 'N/A'}</td>
                  <td>{order.totalItems}</td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <Badge bg={ORDER_STATUS_COLORS[order.orderStatus] || 'secondary'}>
                      {ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={order.paymentStatus === 'paid' ? 'success' : 'warning'}>
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <Form.Select
                      size="sm"
                      value={order.orderStatus}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      style={{ width: '130px' }}
                    >
                      {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </Form.Select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-muted">No orders found</td>
                </tr>
              )}
            </tbody>
          </Table>
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Total: {pagination.totalOrders} orders</span>
              <div>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={pagination.currentPage === 1}
                >
                  Previous
                </Button>
                <span className="mx-2">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default OrderList