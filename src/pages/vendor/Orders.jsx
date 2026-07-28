import React, { useState, useEffect } from 'react'
import { Table, Badge, Card } from 'react-bootstrap'
import { getVendorOrdersApi } from '../../api/orderApi'
import { formatCurrency, formatDate } from '../../utils/formatDate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants'
import Loader from '../../components/common/Loader'
import { toast } from 'react-toastify'

const VendorOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await getVendorOrdersApi({ page: 1, limit: 20 })
      setOrders(response.data.orders || [])
      setStats(response.data.stats || {})
    } catch (error) {
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader text="Loading orders..." />

  return (
    <div>
      <h4 className="mb-4">My Orders</h4>

      {/* Stats */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <Card className="shadow-sm" style={{ flex: 1 }}>
          <Card.Body className="text-center">
            <h5>{stats.totalOrders || 0}</h5>
            <p className="text-muted small">Total Orders</p>
          </Card.Body>
        </Card>
        <Card className="shadow-sm" style={{ flex: 1 }}>
          <Card.Body className="text-center">
            <h5>{stats.totalItemsSold || 0}</h5>
            <p className="text-muted small">Items Sold</p>
          </Card.Body>
        </Card>
        <Card className="shadow-sm" style={{ flex: 1 }}>
          <Card.Body className="text-center">
            <h5>{formatCurrency(stats.totalRevenue || 0)}</h5>
            <p className="text-muted small">Total Revenue</p>
          </Card.Body>
        </Card>
      </div>

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
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.userId?.name || 'N/A'}</td>
                  <td>
                    {order.items.filter(item => item.vendorId === order.userId?._id).reduce(
                      (sum, item) => sum + item.quantity, 0
                    )}
                  </td>
                  <td>
                    {formatCurrency(
                      order.items
                        .filter(item => item.vendorId === order.userId?._id)
                        .reduce((sum, item) => sum + item.totalPrice, 0)
                    )}
                  </td>
                  <td>
                    <Badge bg={ORDER_STATUS_COLORS[order.orderStatus] || 'secondary'}>
                      {ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus}
                    </Badge>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No orders found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default VendorOrders