import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RoleBasedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check if user exists and has a role
  if (!user || !user.role) {
    return <Navigate to="/login" replace />
  }

  // Check if user role is allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RoleBasedRoute