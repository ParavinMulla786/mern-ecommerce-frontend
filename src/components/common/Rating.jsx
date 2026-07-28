import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ rating, totalReviews, showCount = true }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-warning" />)
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-warning" />)
  }

  const remainingStars = 5 - stars.length
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-muted" />)
  }

  return (
    <span className="d-inline-flex align-items-center">
      <span className="me-1">{stars}</span>
      <span className="ms-1 small">
        {rating.toFixed(1)}
        {showCount && totalReviews > 0 && (
          <span className="text-muted ms-1">({totalReviews})</span>
        )}
      </span>
    </span>
  )
}

export default Rating