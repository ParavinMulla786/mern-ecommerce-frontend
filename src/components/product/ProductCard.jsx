import React from 'react'
import { Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import { formatCurrency } from '../../utils/formatDate'
import { addToCart } from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    try {
      await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap()
      toast.success('Product added to cart!')
    } catch (error) {
      toast.error(error || 'Failed to add to cart')
    }
  }

  const imageUrl = product.mainImage 
    ? `http://localhost:7001/${product.mainImage}`
    : 'https://via.placeholder.com/300x300?text=No+Image'

  return (
    <Card className="h-100 shadow-sm hover-card">
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        <div className="position-relative">
          <Card.Img 
            variant="top" 
            src={imageUrl} 
            alt={product.productName}
            style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
          />
          {product.discount > 0 && (
            <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
              {product.discount}% OFF
            </Badge>
          )}
          {product.isFeatured && (
            <Badge bg="warning" className="position-absolute top-0 end-0 m-2">
              Featured
            </Badge>
          )}
        </div>
        <Card.Body>
          <Card.Title className="text-dark text-truncate">{product.productName}</Card.Title>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <span className="text-primary fw-bold fs-5">
                {formatCurrency(product.finalPrice)}
              </span>
              {product.discount > 0 && (
                <span className="text-muted text-decoration-line-through ms-2">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
          </div>
          <div className="mb-2">
            <span className="text-warning">
              {'★'.repeat(Math.floor(product.averageRating || 0))}
              {'☆'.repeat(5 - Math.floor(product.averageRating || 0))}
            </span>
            <span className="ms-1 text-muted small">({product.totalReviews || 0})</span>
          </div>
          <div className="text-muted small">
            {product.brandId?.brandName || 'No Brand'}
          </div>
        </Card.Body>
      </Link>
      <Card.Footer className="bg-transparent border-0 pt-0">
        <Button 
          variant="primary" 
          className="w-100"
          onClick={handleAddToCart}
          disabled={!product.isAvailable || product.quantity === 0}
        >
          <FaShoppingCart className="me-2" />
          {product.isAvailable && product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default ProductCard