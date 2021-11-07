import React from 'react'
import './UrlForm.css'


const UrlForm = () => {
  const handleSubmit = () => {

  }
  return (
    <>
    <main>
      <section className="form-wrapper">
        <form onSubmit={handleSubmit()}>
          <h2>Paste a Url You Would Like To Shorten</h2>
          <section className="url-wrapper"> 

        <input placeholder="Shorten Your Link" type="text" 
        size='url'/>
        <button type="submit" className="submit-btn" >Shorten Url </button>
        </section>
        </form>
      </section>
    </main>
    </>
  )
}

export default UrlForm;