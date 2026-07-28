import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { getActiveCategoriesApi } from '../api/categoryApi'
import { getActiveBrandsApi } from '../api/brandApi'
import { filterProductsApi } from '../api/productApi'
import ProductCard from '../components/product/ProductCard'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [filters, setFilters] = useState({
    categoryId: searchParams.get('category') || '',
    brandId: searchParams.get('brand') || '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sort: 'newest',
    page: 1,
    limit: 12,
  })

  useEffect(() => {
    fetchFilters()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchFilters = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        getActiveCategoriesApi(),
        getActiveBrandsApi(),
      ])
      setCategories(categoriesRes.data || [])
      setBrands(brandsRes.data || [])
    } catch (error) {
      console.error('Error fetching filters:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await filterProductsApi(filters)
      setProducts(response.data.products || [])
      setPagination(response.data.pagination || {})
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value, page: 1 })
    
    if (name === 'categoryId' || name === 'brandId') {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name === 'categoryId' ? 'category' : 'brand', value)
      } else {
        params.delete(name === 'categoryId' ? 'category' : 'brand')
      }
      setSearchParams(params)
    }
  }

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setFilters({
      categoryId: '',
      brandId: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sort: 'newest',
      page: 1,
      limit: 12,
    })
    setSearchParams({})
  }

  return (
    <Container className="py-4">
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="mb-4">
          <div className="bg-white p-3 rounded shadow-sm sticky-top" style={{ top: '20px' }}>
            <h5 className="mb-3">Filters</h5>
            
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="categoryId"
                value={filters.categoryId}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select
                name="brandId"
                value={filters.brandId}
                onChange={handleFilterChange}
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <Row>
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
              >
                <option value="">All Ratings</option>
                <option value="4">4 &amp; Above</option>
                <option value="3">3 &amp; Above</option>
                <option value="2">2 &amp; Above</option>
                <option value="1">1 &amp; Above</option>
              </Form.Select>
            </Form.Group>

            <Button variant="secondary" className="w-100 mb-2" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </Col>

        {/* Products Grid */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5>Products ({pagination.totalProducts || 0})</h5>
            <Form.Select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              style={{ width: '200px' }}
            >
              <option value="newest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </Form.Select>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found</h5>
              <p className="text-muted">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} xs={12} sm={6} md={4} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${filters.page === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(filters.page - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                        const pageNum = i + 1
                        return (
                          <li key={pageNum} className={`page-item ${filters.page === pageNum ? 'active' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          </li>
                        )
                      })}
                      <li className={`page-item ${filters.page === pagination.totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(filters.page + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Shop