import React, { useState, useEffect } from 'react'
import { Table, Button, Badge, Card, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus, FaEye } from 'react-icons/fa'
import { getAllProductsApi, updateProductStatusApi, deleteProductApi } from '../../api/productApi'
import { getActiveCategoriesApi } from '../../api/categoryApi'
import { getActiveBrandsApi } from '../../api/brandApi'
import { formatCurrency } from '../../utils/formatDate'
import Loader from '../../components/common/Loader'
import { toast } from 'react-toastify'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    brandId: '',
    inStock: '',
  })
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        getAllProductsApi(filters),
        getActiveCategoriesApi(),
        getActiveBrandsApi(),
      ])
      setProducts(productsRes.data.products || [])
      setPagination(productsRes.data.pagination || {})
      setCategories(categoriesRes.data || [])
      setBrands(brandsRes.data || [])
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleStatusToggle = async (productId, currentStatus) => {
    try {
      await updateProductStatusApi(productId, !currentStatus)
      toast.success('Product status updated')
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductApi(productId)
        toast.success('Product deleted')
        fetchData()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product')
      }
    }
  }

  if (loading) return <Loader text="Loading products..." />

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Product Management</h4>
        <Link to="/admin/products/add">
          <Button variant="primary">
            <FaPlus className="me-2" /> Add Product
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search by name"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="categoryId"
                  value={filters.categoryId}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  name="brandId"
                  value={filters.brandId}
                  onChange={handleFilterChange}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>{brand.brandName}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="primary" className="w-100" onClick={fetchData}>
                Filter
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
                    <Link to={`/product/${product._id}`} target="_blank">
                      <Button variant="outline-info" size="sm" className="me-1">
                        <FaEye />
                      </Button>
                    </Link>
                    <Link to={`/admin/products/edit/${product._id}`}>
                      <Button variant="outline-primary" size="sm" className="me-1">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-1"
                      onClick={() => handleStatusToggle(product._id, product.isAvailable)}
                    >
                      {product.isAvailable ? <FaToggleOn /> : <FaToggleOff />}
                    </Button>
                    <Button
                      variant="outline-danger"
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
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Total: {pagination.totalProducts} products</span>
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

export default ProductList