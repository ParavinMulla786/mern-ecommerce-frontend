import React, { useState, useEffect } from 'react'
import { Table, Button, Badge, Card, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from 'react-icons/fa'
import { getAllBrandsApi, updateBrandStatusApi, deleteBrandApi } from '../../api/brandApi'
import Loader from '../../components/common/Loader'
import { toast } from 'react-toastify'

const BrandList = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      setLoading(true)
      const response = await getAllBrandsApi({ search })
      setBrands(response.data.brands || [])
      setPagination(response.data.pagination || {})
    } catch (error) {
      toast.error('Failed to fetch brands')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (brandId, currentStatus) => {
    try {
      await updateBrandStatusApi(brandId, !currentStatus)
      toast.success('Brand status updated')
      fetchBrands()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  const handleDelete = async (brandId) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrandApi(brandId)
        toast.success('Brand deleted')
        fetchBrands()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete brand')
      }
    }
  }

  if (loading) return <Loader text="Loading brands..." />

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Brand Management</h4>
        <Link to="/admin/brands/add">
          <Button variant="primary">
            <FaPlus className="me-2" /> Add Brand
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by brand name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" className="w-100" onClick={fetchBrands}>
                Search
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
                <th>Brand Name</th>
                <th>Products</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id}>
                  <td>
                    {brand.brandImage ? (
                      <img
                        src={`http://localhost:7001/${brand.brandImage}`}
                        alt={brand.brandName}
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{brand.brandName}</td>
                  <td>{brand.productCount || 0}</td>
                  <td>
                    <Badge bg={brand.isActive ? 'success' : 'danger'}>
                      {brand.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>{brand.createdBy?.name || 'N/A'}</td>
                  <td>
                    <Link to={`/admin/brands/edit/${brand._id}`}>
                      <Button variant="outline-primary" size="sm" className="me-1">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-1"
                      onClick={() => handleStatusToggle(brand._id, brand.isActive)}
                    >
                      {brand.isActive ? <FaToggleOn /> : <FaToggleOff />}
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(brand._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No brands found</td>
                </tr>
              )}
            </tbody>
          </Table>
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Total: {pagination.totalBrands} brands</span>
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

export default BrandList