import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date ,source} = this.props

    return (
      <div className="card m-3 my-3" >
       <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger" style={{left:"80%" ,zIndex:"5"}}>
              {source}
            
            </span>
        <img
          src={
            !imageUrl
              ? 'https://static.politico.com/78/c6/e87739054d02bae736d7a84811bd/california-wildfire-lawsuit-16819.jpg'
              : imageUrl
          }
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">
            {title}{' '}
           
          </h5>
          <p className="card-text">{description}...</p>

          <p className="card-text">
            <small className="text-muted">
              By{' '}
              <span className="text-dark"> {!author ? 'unknown' : author}</span>{' '}
              on {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <a href={newsUrl} target="_blank" className=" btn btn-outline text-dark">
            Read More {'>'}
          </a>
        </div>
      </div>
    )
  }
}
