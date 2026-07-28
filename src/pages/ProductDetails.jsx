import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Button, Badge, Form, Alert } from 'react-bootstrap'
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
import { getProductByIdApi } from '../api/productApi'
import { getProductReviewsApi, addReviewApi } from '../api/reviewApi'
import { addToCart } from '../redux/slices/cartSlice'
import { formatCurrency } from '../utils/formatDate'
import Loader from '../components/common/Loader'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState('')
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [reviewError, setReviewError] = useState('')

  useEffect(() => {
    fetchProduct()
    fetchReviews()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await getProductByIdApi(id)
      setProduct(response.data)
      if (response.data?.mainImage) {
        setSelectedImage(`http://localhost:7001/${response.data.mainImage}`)
      }
    } catch (error) {
      toast.error('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await getProductReviewsApi(id, { limit: 10 })
      setReviews(response.data?.reviews || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart')
      navigate('/login')
      return
    }
    try {
      await dispatch(addToCart({ productId: id, quantity })).unwrap()
      toast.success('Product added to cart!')
    } catch (error) {
      toast.error(error || 'Failed to add to cart')
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.info('Please login to review')
      navigate('/login')
      return
    }

    if (!reviewData.comment.trim()) {
      setReviewError('Please enter a comment')
      return
    }

    try {
      setSubmitting(true)
      await addReviewApi({
        productId: id,
        rating: reviewData.rating,
        comment: reviewData.comment
      })
      toast.success('Review added successfully!')
      setReviewData({ rating: 5, comment: '' })
      fetchReviews()
      fetchProduct() // Refresh product rating
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add review')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader text="Loading product..." />

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h4>Product not found</h4>
        <Link to="/shop" className="btn btn-primary mt-3">Back to Shop</Link>
      </Container>
    )
  }

  const imageUrls = product.images?.map(img => `http://localhost:7001/${img}`) || []

  return (
    <Container className="py-4">
      <Row>
        {/* Product Images */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <img 
                src={selectedImage || 'https://via.placeholder.com/500x500?text=No+Image'} 
                alt={product.productName}
                className="img-fluid"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </Card.Body>
          </Card>
          {imageUrls.length > 0 && (
            <div className="d-flex gap-2 mt-2 overflow-auto">
              {imageUrls.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="border rounded"
                  style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </Col>

        {/* Product Info */}
        <Col lg={6}>
          <h2 className="mb-2">{product.productName}</h2>
          <div className="mb-3">
            <span className="text-warning">
              {'★'.repeat(Math.floor(product.averageRating || 0))}
              {'☆'.repeat(5 - Math.floor(product.averageRating || 0))}
            </span>
            <span className="ms-2 text-muted">
              ({product.totalReviews || 0} reviews)
            </span>
          </div>

          <div className="mb-3">
            {product.discount > 0 ? (
              <>
                <span className="text-primary fw-bold fs-3">
                  {formatCurrency(product.finalPrice)}
                </span>
                <span className="text-muted text-decoration-line-through ms-2">
                  {formatCurrency(product.price)}
                </span>
                <Badge bg="danger" className="ms-2">{product.discount}% OFF</Badge>
              </>
            ) : (
              <span className="text-primary fw-bold fs-3">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <div className="mb-3">
            <Badge bg={product.isAvailable ? 'success' : 'danger'} className="me-2">
              {product.isAvailable && product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </Badge>
            {product.isFeatured && (
              <Badge bg="warning">Featured</Badge>
            )}
          </div>

          <div className="mb-3">
            <p className="text-muted">
              <strong>Brand:</strong> {product.brandId?.brandName || 'N/A'}
            </p>
            <p className="text-muted">
              <strong>Category:</strong> {product.categoryId?.categoryName || 'N/A'}
            </p>
            <p className="text-muted">
              <strong>Vendor:</strong> {product.vendorId?.name || 'N/A'}
            </p>
          </div>

          <div className="mb-3">
            <h6>Description</h6>
            <p>{product.description}</p>
          </div>

          {product.isAvailable && product.quantity > 0 && (
            <div className="d-flex align-items-center gap-3 mb-3">
              <Form.Group style={{ width: '120px' }}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(Number(e.target.value), product.quantity))}
                />
              </Form.Group>
              <Button 
                variant="primary" 
                size="lg" 
                className="mt-2"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="me-2" /> Add to Cart
              </Button>
            </div>
          )}
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col>
          <h4 className="mb-3">Customer Reviews</h4>
          
          {isAuthenticated && user?.role === 'customer' && (
            <Card className="mb-4">
              <Card.Body>
                <h6>Write a Review</h6>
                {reviewError && <Alert variant="danger">{reviewError}</Alert>}
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={reviewData.rating}
                      onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Terrible</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Share your experience with this product..."
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <Card key={review._id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="text-warning">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                      <strong>{review.userId?.name || 'Anonymous'}</strong>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetails