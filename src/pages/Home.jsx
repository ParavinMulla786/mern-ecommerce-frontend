import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getActiveCategoriesApi } from '../api/categoryApi'
import { getActiveBrandsApi } from '../api/brandApi'
import { getFeaturedProductsApi, getLatestProductsApi, getTopRatedProductsApi } from '../api/productApi'
import ProductCard from '../components/product/ProductCard'
import Loader from '../components/common/Loader'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [latestProducts, setLatestProducts] = useState([])
  const [topRatedProducts, setTopRatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [categoriesRes, brandsRes, featuredRes, latestRes, topRatedRes] = await Promise.all([
        getActiveCategoriesApi(),
        getActiveBrandsApi(),
        getFeaturedProductsApi(),
        getLatestProductsApi(),
        getTopRatedProductsApi(),
      ])

      setCategories(categoriesRes.data || [])
      setBrands(brandsRes.data || [])
      setFeaturedProducts(featuredRes.data?.products || featuredRes.data || [])
      setLatestProducts(latestRes.data?.products || latestRes.data || [])
      setTopRatedProducts(topRatedRes.data?.products || topRatedRes.data || [])
    } catch (error) {
      console.error('Error fetching home data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader text="Loading..." />

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-primary text-white py-5 mb-4">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold">Welcome to E-Commerce</h1>
              <p className="lead">Discover amazing products at great prices</p>
              <Link to="/shop" className="btn btn-light btn-lg">
                Start Shopping
              </Link>
            </Col>
            <Col md={6} className="text-center">
              <img 
                src="https://via.placeholder.com/400x300" 
                alt="Shopping" 
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Categories */}
        <section className="mb-5">
          <h2 className="mb-4">Shop by Category</h2>
          <Row>
            {categories.slice(0, 8).map((category) => (
              <Col key={category._id} xs={6} md={3} className="mb-3">
                <Card className="text-center h-100 shadow-sm hover-card">
                  <Link to={`/shop?category=${category._id}`} className="text-decoration-none">
                    <Card.Body>
                      {category.categoryImage && (
                        <img 
                          src={`http://localhost:7001/${category.categoryImage}`} 
                          alt={category.categoryName}
                          className="img-fluid mb-2"
                          style={{ height: '80px', objectFit: 'contain' }}
                        />
                      )}
                      <Card.Title className="text-dark">{category.categoryName}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Brands */}
        <section className="mb-5">
          <h2 className="mb-4">Popular Brands</h2>
          <Row>
            {brands.slice(0, 8).map((brand) => (
              <Col key={brand._id} xs={6} md={3} className="mb-3">
                <Card className="text-center h-100 shadow-sm">
                  <Link to={`/shop?brand=${brand._id}`} className="text-decoration-none">
                    <Card.Body>
                      {brand.brandImage && (
                        <img 
                          src={`http://localhost:7001/${brand.brandImage}`} 
                          alt={brand.brandName}
                          className="img-fluid mb-2"
                          style={{ height: '60px', objectFit: 'contain' }}
                        />
                      )}
                      <Card.Title className="text-dark">{brand.brandName}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="mb-5">
            <h2 className="mb-4">Featured Products</h2>
            <Row>
              {featuredProducts.slice(0, 8).map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </section>
        )}

        {/* Latest Products */}
        {latestProducts.length > 0 && (
          <section className="mb-5">
            <h2 className="mb-4">Latest Products</h2>
            <Row>
              {latestProducts.slice(0, 8).map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </section>
        )}

        {/* Top Rated Products */}
        {topRatedProducts.length > 0 && (
          <section className="mb-5">
            <h2 className="mb-4">Top Rated Products</h2>
            <Row>
              {topRatedProducts.slice(0, 8).map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>
    </div>
  )
}

export default Home