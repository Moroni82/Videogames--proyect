import React from 'react';
import "./PageError.css"

const PageError = () => {
  return (
    <div className="pageerror">
      <a href="/home" className="error"> ← Return Home </a>
      <h1>Page not Found</h1>
      <h2>Error 404</h2>
    </div>
  )
}

export default PageError;