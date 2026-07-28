import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { createBrandApi, updateBrandApi, getBrandByIdApi } from '../../api/brandApi'
import { toast } from 'react-toastify'

const AddBrand = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    brandName: '',
    brandImage: null,
  })
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (id) {
      loadBrand()
    }
  }, [id])

  const loadBrand = async () => {
    try {
      setLoading(true)
      const response = await getBrandByIdApi(id)
      setFormData({
        brandName: response.data.brandName || '',
        brandImage: null,
      })
      if (response.data.brandImage) {
        setPreview(`http://localhost:7001/${response.data.brandImage}`)
      }
    } catch (error) {
      toast.error('Failed to load brand')
      navigate('/admin/brands')
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
      setFormData({ ...formData, brandImage: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.brandName.trim()) {
      setError('Brand name is required')
      return
    }

    try {
      setLoading(true)
      const data = new FormData()
      data.append('brandName', formData.brandName)
      if (formData.brandImage) {
        data.append('brandImage', formData.brandImage)
      }

      if (id) {
        await updateBrandApi(id, data)
        toast.success('Brand updated successfully!')
      } else {
        await createBrandApi(data)
        toast.success('Brand created successfully!')
      }
      navigate('/admin/brands')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save brand')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h4 className="mb-4">{id ? 'Edit Brand' : 'Add New Brand'}</h4>
      
      <Card className="shadow-sm">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="brandName"
                    placeholder="Enter brand name"
                    value={formData.brandName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand Image</Form.Label>
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
                {loading ? 'Saving...' : (id ? 'Update Brand' : 'Create Brand')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/admin/brands')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddBrand