import React, { useState, useEffect } from 'react'
import { Table, Button, Badge, Card, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from 'react-icons/fa'
import { getAllCategoriesApi, updateCategoryStatusApi, deleteCategoryApi } from '../../api/categoryApi'
import Loader from '../../components/common/Loader'
import { toast } from 'react-toastify'

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await getAllCategoriesApi({ search })
      setCategories(response.data.categories || [])
      setPagination(response.data.pagination || {})
    } catch (error) {
      toast.error('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (categoryId, currentStatus) => {
    try {
      await updateCategoryStatusApi(categoryId, !currentStatus)
      toast.success('Category status updated')
      fetchCategories()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategoryApi(categoryId)
        toast.success('Category deleted')
        fetchCategories()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete category')
      }
    }
  }

  if (loading) return <Loader text="Loading categories..." />

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Category Management</h4>
        <Link to="/admin/categories/add">
          <Button variant="primary">
            <FaPlus className="me-2" /> Add Category
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
                  placeholder="Search by category name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" className="w-100" onClick={fetchCategories}>
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
                <th>Category Name</th>
                <th>Products</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>
                    {category.categoryImage ? (
                      <img
                        src={`http://localhost:7001/${category.categoryImage}`}
                        alt={category.categoryName}
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{category.categoryName}</td>
                  <td>{category.productCount || 0}</td>
                  <td>
                    <Badge bg={category.isActive ? 'success' : 'danger'}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>{category.createdBy?.name || 'N/A'}</td>
                  <td>
                    <Link to={`/admin/categories/edit/${category._id}`}>
                      <Button variant="outline-primary" size="sm" className="me-1">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-1"
                      onClick={() => handleStatusToggle(category._id, category.isActive)}
                    >
                      {category.isActive ? <FaToggleOn /> : <FaToggleOff />}
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(category._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No categories found</td>
                </tr>
              )}
            </tbody>
          </Table>
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center">
              <span>Total: {pagination.totalCategories} categories</span>
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

export default CategoryList