import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Table, Badge } from 'react-bootstrap'
import { FaBox, FaShoppingCart, FaDollarSign, FaTag } from 'react-icons/fa'
import { getVendorDashboardApi } from '../../api/dashboardApi'
import { formatCurrency } from '../../utils/formatDate'
import Loader from '../../components/common/Loader'

const VendorDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await getVendorDashboardApi()
      setData(response.data)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader text="Loading dashboard..." />

  if (!data) return <div>No data available</div>

  const stats = [
    { label: 'Total Products', value: data.stats?.totalProducts || 0, icon: <FaBox />, color: 'primary' },
    { label: 'Active Products', value: data.stats?.activeProducts || 0, icon: <FaTag />, color: 'success' },
    { label: 'Total Orders', value: data.stats?.totalOrders || 0, icon: <FaShoppingCart />, color: 'warning' },
    { label: 'Total Revenue', value: formatCurrency(data.stats?.totalRevenue || 0), icon: <FaDollarSign />, color: 'success' },
  ]

  return (
    <div>
      <h4 className="mb-4">Vendor Dashboard</h4>

      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={3} className="mb-3">
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center">
                <div className={`text-${stat.color} fs-2`}>{stat.icon}</div>
                <h5 className="mt-2">{stat.value}</h5>
                <p className="text-muted small mb-0">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Today's Revenue</h6>
              <h3>{formatCurrency(data.today?.revenue || 0)}</h3>
              <p className="text-muted small">Orders: {data.today?.orders || 0}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Monthly Revenue</h6>
              <h3>{formatCurrency(data.monthly?.revenue || 0)}</h3>
              <p className="text-muted small">Orders: {data.monthly?.orders || 0}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <h6 className="mb-3">Recent Orders</h6>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders?.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.userId?.name || 'N/A'}</td>
                  <td>{order.totalItems}</td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <Badge bg={order.orderStatus === 'delivered' ? 'success' : 'warning'}>
                      {order.orderStatus}
                    </Badge>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {(!data.recentOrders || data.recentOrders.length === 0) && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No recent orders</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default VendorDashboard