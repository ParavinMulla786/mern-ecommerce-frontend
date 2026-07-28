import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { getProductByIdApi, updateProductApi } from '../../api/productApi'
import { getActiveCategoriesApi } from '../../api/categoryApi'
import { getActiveBrandsApi } from '../../api/brandApi'
import { toast } from 'react-toastify'

const EditProduct = () => {
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
  const [existingImages, setExistingImages] = useState([])

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [productRes, categoriesRes, brandsRes] = await Promise.all([
        getProductByIdApi(id),
        getActiveCategoriesApi(),
        getActiveBrandsApi(),
      ])
      
      const product = productRes.data
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
      
      setExistingImages(product.images || [])
      if (product.mainImage) {
        setPreviewImages([`http://localhost:7001/${product.mainImage}`])
      }
      setCategories(categoriesRes.data || [])
      setBrands(brandsRes.data || [])
    } catch (error) {
      toast.error('Failed to load product')
      navigate('/vendor/products')
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
      setPreviewImages([...existingImages.map(img => `http://localhost:7001/${img}`), ...previews])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.productName.trim()) {
      setError('Product name is required')
      return
    }
    if (!formData.categoryId) {
      setError('Category is required')
      return
    }
    if (!formData.brandId) {
      setError('Brand is required')
      return
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Price must be greater than 0')
      return
    }
    if (!formData.quantity || Number(formData.quantity) < 0) {
      setError('Quantity cannot be negative')
      return
    }

    try {
      setLoading(true)
      const data = new FormData()
      data.append('productName', formData.productName)
      data.append('description', formData.description)
      data.append('categoryId', formData.categoryId)
      data.append('brandId', formData.brandId)
      data.append('price', formData.price)
      data.append('discount', formData.discount)
      data.append('quantity', formData.quantity)
      data.append('isFeatured', formData.isFeatured)
      if (formData.mainImage) {
        data.append('mainImage', formData.mainImage)
      }
      formData.productImages.forEach(file => {
        data.append('productImages', file)
      })

      await updateProductApi(id, data)
      toast.success('Product updated successfully!')
      navigate('/vendor/products')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h4 className="mb-4">Edit Product</h4>
      
      <Card className="shadow-sm">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name *</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                required
              />
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
                      <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
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
                      <option key={brand._id} value={brand._id}>{brand.brandName}</option>
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
              <Form.Label>Main Image</Form.Label>
              <Form.Control
                type="file"
                name="mainImage"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Form.Text className="text-muted">Leave empty to keep current image</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Images</Form.Label>
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
                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                  />
                ))}
              </div>
            )}

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : 'Update Product'}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/vendor/products')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default EditProduct