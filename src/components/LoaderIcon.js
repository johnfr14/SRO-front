import React from 'react'
import "../css/loaderIcon.css"

const LoaderIcon = () => {
  return (
    <div>
      <div className="svg-loader pr-4">
        <svg className="svg-container" height="40" width="40" viewBox="0 0 100 100">
          <circle className="loader-svg bg" cx="50" cy="50" r="45"></circle>
          <circle className="loader-svg animate" cx="50" cy="50" r="45"></circle>
        </svg>
      </div>
    </div>
  )
}

export default LoaderIcon
