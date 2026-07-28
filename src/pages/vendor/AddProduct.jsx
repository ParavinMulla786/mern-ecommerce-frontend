import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { createProductApi, updateProductApi, getProductByIdApi } from '../../api/productApi'
import { getActiveCategoriesApi } from '../../api/categoryApi'
import { getActiveBrandsApi } from '../../api/brandApi'
import { toast } from 'react-toastify'

const AddProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    categoryId: '',
    brandId: '',
    price: '',
    discount: '0',
    quantity: '',
    isFeatured: false,
    mainImage: null,
    productImages: [],
  })
  const [previewImages, setPreviewImages] = useState([])

  useEffect(() => {
    fetchOptions()
    if (id) {
      loadProduct()
    }
  }, [id])

  const fetchOptions = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        getActiveCategoriesApi(),
        getActiveBrandsApi(),
      ])
      setCategories(categoriesRes.data || [])
      setBrands(brandsRes.data || [])
    } catch (error) {
      toast.error('Failed to load options')
    }
  }

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await getProductByIdApi(id)
      const product = response.data
      setFormData({
        productName: product.productName || '',
        description: product.description || '',
        categoryId: product.categoryId?._id || '',
        brandId: product.brandId?._id || '',
        price: product.price || '',
        discount: product.discount || '0',
        quantity: product.quantity || '',
        isFeatured: product.isFeatured || false,
        mainImage: null,
        productImages: [],
      })
      if (product.mainImage) {
        setPreviewImages([`http://localhost:7001/${product.mainImage}`])
      }
    } catch (error) {
      toast.error('Failed to load product')
      navigate('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    setError('')
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (e.target.name === 'mainImage') {
      setFormData({ ...formData, mainImage: files[0] })
      if (files[0]) {
        setPreviewImages([URL.createObjectURL(files[0])])
      }
    } else {
      setFormData({ ...formData, productImages: files })
      const previews = files.map(file => URL.createObjectURL(file))
      setPreviewImages(previews)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setError('')
    
    const validationErrors = []
    
    if (!formData.productName.trim()) {
      validationErrors.push('Product name is required')
    } else if (formData.productName.trim().length < 3) {
      validationErrors.push('Product name must be at least 3 characters')
    }
    
    if (!formData.description.trim()) {
      validationErrors.push('Description is required')
    } else if (formData.description.trim().length < 10) {
      validationErrors.push('Description must be at least 10 characters')
    }
    
    if (!formData.categoryId) {
      validationErrors.push('Please select a category')
    }
    if (!formData.brandId) {
      validationErrors.push('Please select a brand')
    }
    if (!formData.price || Number(formData.price) <= 0) {
      validationErrors.push('Price must be greater than 0')
    }
    if (!formData.quantity || Number(formData.quantity) < 0) {
      validationErrors.push('Quantity cannot be negative')
    }
    if (!formData.mainImage && !id) {
      validationErrors.push('Main image is required')
    }
    
    if (validationErrors.length > 0) {
      setError(validationErrors.join('. '))
      toast.error(validationErrors.join('. '))
      return
    }

    try {
      setLoading(true)
      const data = new FormData()
      data.append('productName', formData.productName.trim())
      data.append('description', formData.description.trim())
      data.append('categoryId', formData.categoryId)
      data.append('brandId', formData.brandId)
      data.append('price', Number(formData.price).toString())
      data.append('discount', Number(formData.discount || 0).toString())
      data.append('quantity', Number(formData.quantity).toString())
      data.append('isFeatured', formData.isFeatured ? 'true' : 'false')
      
      if (formData.mainImage) {
        data.append('mainImage', formData.mainImage)
      }
      formData.productImages.forEach(file => {
        data.append('productImages', file)
      })

      console.log('Sending product data:', {
        productName: formData.productName.trim(),
        description: formData.description.trim(),
        categoryId: formData.categoryId,
        brandId: formData.brandId,
        price: Number(formData.price),
        discount: Number(formData.discount || 0),
        quantity: Number(formData.quantity),
        isFeatured: formData.isFeatured,
      })

      if (id) {
        await updateProductApi(id, data)
        toast.success('Product updated successfully!')
      } else {
        await createProductApi(data)
        toast.success('Product created successfully!')
      }
      navigate('/admin/products')
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(e => e.message).join('. ')
        setError(errorMessages)
        toast.error(errorMessages)
      } else {
        const errorMsg = error.response?.data?.message || 'Failed to save product'
        setError(errorMsg)
        toast.error(errorMsg)
      }
      console.error('Error saving product:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h4 className="mb-4">{id ? 'Edit Product' : 'Add New Product'}</h4>
      
      <Card className="shadow-sm">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name *</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                placeholder="Enter product name (minimum 3 characters)"
                value={formData.productName}
                onChange={handleChange}
                isInvalid={formData.productName && formData.productName.length < 3}
                required
              />
              <Form.Text className={formData.productName && formData.productName.length < 3 ? 'text-danger' : 'text-muted'}>
                {formData.productName.length}/3 characters minimum
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Product name must be at least 3 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                placeholder="Enter product description (minimum 10 characters)"
                value={formData.description}
                onChange={handleChange}
                isInvalid={formData.description && formData.description.length < 10}
                required
              />
              <Form.Text className={formData.description && formData.description.length < 10 ? 'text-danger' : 'text-muted'}>
                {formData.description.length}/10 characters minimum
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Description must be at least 10 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand *</Form.Label>
                  <Form.Select
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.brandName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    placeholder="Enter discount"
                    value={formData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Featured Product"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Main Image *</Form.Label>
              <Form.Control
                type="file"
                name="mainImage"
                accept="image/*"
                onChange={handleFileChange}
                required={!id && !formData.mainImage}
              />
              {!id && !formData.mainImage && (
                <Form.Text className="text-muted">
                  Please select an image (JPG, PNG, WEBP)
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Images (Max 5)</Form.Label>
              <Form.Control
                type="file"
                name="productImages"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>

            {previewImages.length > 0 && (
              <div className="mb-3 d-flex gap-2 flex-wrap">
                {previewImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'contain', border: '1px solid #ddd' }}
                  />
                ))}
              </div>
            )}

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : (id ? 'Update Product' : 'Create Product')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/admin/products')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddProduct