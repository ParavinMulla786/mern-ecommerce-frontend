import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { updateProfileApi, uploadProfileImageApi } from '../api/userApi'
import { getLoggedInUser, updateUser } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    address: {
      houseNumber: '',
      area: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    }
  })
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        contactNumber: user.contactNumber || '',
        address: {
          houseNumber: user.address?.houseNumber || '',
          area: user.address?.area || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          country: user.address?.country || '',
          pincode: user.address?.pincode || ''
        }
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await updateProfileApi(formData)
      await dispatch(getLoggedInUser())
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('profileImage', file)
      await uploadProfileImageApi(file)
      await dispatch(getLoggedInUser())
      toast.success('Profile image updated!')
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setLoading(false)
    }
  }

  const profileImage = user?.profileImage 
    ? `http://localhost:7001/${user.profileImage}`
    : 'https://via.placeholder.com/150x150?text=User'

  return (
    <Container className="py-4">
      <Row>
        <Col lg={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <img 
                src={profileImage}
                alt={user?.name}
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h5>{user?.name}</h5>
              <p className="text-muted">{user?.email}</p>
              <p className="text-muted">Role: {user?.role}</p>
              <Form.Group>
                <Form.Label className="w-100">
                  <Button variant="outline-primary" size="sm" className="w-100">
                    Change Profile Photo
                  </Button>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </Form.Label>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Edit Profile</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <h6 className="mt-4 mb-3">Address</h6>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>House Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.houseNumber"
                        value={formData.address.houseNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Area</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.area"
                        value={formData.address.area}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.pincode"
                        value={formData.address.pincode}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile