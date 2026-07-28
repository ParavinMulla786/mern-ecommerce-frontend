import React, { useState, useEffect } from 'react'
import { Table, Button, Badge, Card, Form, Row, Col } from 'react-bootstrap'
import { getAllReviewsApi, deleteReviewApi } from '../../api/reviewApi'
import { formatDate } from '../../utils/formatDate'
import Loader from '../../components/common/Loader'
import { toast } from 'react-toastify'

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
    limit: 10,
  })
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchReviews()
  }, [filters])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await getAllReviewsApi(filters)
      setReviews(response.data.reviews || [])
      setPagination(response.data.pagination || {})
    } catch (error) {
      toast.error('Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReviewApi(reviewId)
        toast.success('Review deleted')
        fetchReviews()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete review')
      }
    }
  }

  if (loading) return <Loader text="Loading reviews..." />

  return (
    <div>
      <h4 className="mb-4">Review Management</h4>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Reviews</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <Button variant="primary" className="w-100" onClick={fetchReviews}>
                Apply Filter
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
                <th>Product</th>
                <th>Customer</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.productId?.productName || 'N/A'}</td>
                  <td>{review.userId?.name || 'N/A'}</td>
                  <td>
                    <span className="text-warning">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </td>
                  <td style={{ maxWidth: '200px' }}>
                    <div className="text-truncate">{review.comment}</div>
                  </td>
                  <td>
                    <Badge bg={review.isActive ? 'success' : 'danger'}>
                      {review.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>{formatDate(review.createdAt)}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No reviews found</td>
                </tr>
              )}
            </tbody>
          </Table>
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Total: {pagination.totalReviews} reviews</span>
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

export default ReviewManagement