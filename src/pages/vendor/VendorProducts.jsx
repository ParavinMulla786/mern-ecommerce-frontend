import React, { useState, useEffect } from 'react'
import { Table, Button, Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { getMyProductsApi, deleteProductApi } from '../../api/productApi'
import { formatCurrency } from '../../utils/formatDate'
import Loader from '../../components/common/Loader'
import { toast } from 'react-toastify'

const VendorProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getMyProductsApi()
      setProducts(response.data || [])
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductApi(productId)
        toast.success('Product deleted')
        fetchProducts()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product')
      }
    }
  }

  if (loading) return <Loader text="Loading products..." />

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Products</h4>
        <Link to="/vendor/products/add">
          <Button variant="primary">
            <FaPlus className="me-2" /> Add Product
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.mainImage ? (
                      <img
                        src={`http://localhost:7001/${product.mainImage}`}
                        alt={product.productName}
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.categoryId?.categoryName || 'N/A'}</td>
                  <td>{product.brandId?.brandName || 'N/A'}</td>
                  <td>{formatCurrency(product.finalPrice)}</td>
                  <td>
                    <Badge bg={product.quantity > 10 ? 'success' : product.quantity > 0 ? 'warning' : 'danger'}>
                      {product.quantity}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={product.isAvailable ? 'success' : 'danger'}>
                      {product.isAvailable ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>
                    <Link to={`/vendor/products/edit/${product._id}`}>
                      <Button variant="outline-primary" size="sm" className="me-1">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-muted">No products found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default VendorProducts