import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Table, Badge } from 'react-bootstrap'
import { FaUsers, FaBox, FaTags, FaList, FaShoppingCart, FaDollarSign } from 'react-icons/fa'
import { getAdminDashboardApi } from '../../api/dashboardApi'
import { formatCurrency } from '../../utils/formatDate'
import Loader from '../../components/common/Loader'

const AdminDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await getAdminDashboardApi()
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
    { label: 'Total Users', value: data.stats?.totalUsers || 0, icon: <FaUsers />, color: 'primary' },
    { label: 'Total Products', value: data.stats?.totalProducts || 0, icon: <FaBox />, color: 'success' },
    { label: 'Total Categories', value: data.stats?.totalCategories || 0, icon: <FaList />, color: 'warning' },
    { label: 'Total Brands', value: data.stats?.totalBrands || 0, icon: <FaTags />, color: 'info' },
    { label: 'Total Orders', value: data.stats?.totalOrders || 0, icon: <FaShoppingCart />, color: 'danger' },
    { label: 'Total Sales', value: formatCurrency(data.stats?.totalSales || 0), icon: <FaDollarSign />, color: 'success' },
  ]

  return (
    <div>
      <h4 className="mb-4">Dashboard Overview</h4>

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={4} lg={2} className="mb-3">
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

      {/* Today's Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Today's Orders</h6>
              <h3>{data.today?.orders || 0}</h3>
              <p className="text-muted small">Revenue: {formatCurrency(data.today?.revenue || 0)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Pending Orders</h6>
              <h3>{data.stats?.pendingOrders || 0}</h3>
              <p className="text-muted small">Need attention</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Average Order Value</h6>
              <h3>{formatCurrency(data.stats?.averageOrderValue || 0)}</h3>
              <p className="text-muted small">Per order</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Card className="shadow-sm">
        <Card.Body>
          <h6 className="mb-3">Recent Orders</h6>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
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
                  <td colSpan="5" className="text-center text-muted">No recent orders</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AdminDashboard