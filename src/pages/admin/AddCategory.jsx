import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { createCategoryApi, updateCategoryApi, getCategoryByIdApi } from '../../api/categoryApi'
import { toast } from 'react-toastify'

const AddCategory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryImage: null,
  })
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (id) {
      loadCategory()
    }
  }, [id])

  const loadCategory = async () => {
    try {
      setLoading(true)
      const response = await getCategoryByIdApi(id)
      setFormData({
        categoryName: response.data.categoryName || '',
        categoryImage: null,
      })
      if (response.data.categoryImage) {
        setPreview(`http://localhost:7001/${response.data.categoryImage}`)
      }
    } catch (error) {
      toast.error('Failed to load category')
      navigate('/admin/categories')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, categoryImage: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.categoryName.trim()) {
      setError('Category name is required')
      return
    }

    try {
      setLoading(true)
      const data = new FormData()
      data.append('categoryName', formData.categoryName)
      if (formData.categoryImage) {
        data.append('categoryImage', formData.categoryImage)
      }

      if (id) {
        await updateCategoryApi(id, data)
        toast.success('Category updated successfully!')
      } else {
        await createCategoryApi(data)
        toast.success('Category created successfully!')
      }
      navigate('/admin/categories')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h4 className="mb-4">{id ? 'Edit Category' : 'Add New Category'}</h4>
      
      <Card className="shadow-sm">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Category Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="categoryName"
                    placeholder="Enter category name"
                    value={formData.categoryName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                />
              </div>
            )}

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : (id ? 'Update Category' : 'Create Category')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/admin/categories')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddCategory