import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
export default class News extends Component {
  articles = []

  constructor(props) {
    super(props)
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults:0
    }
   
    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - TodayNews`
  }
  async updateNews() {
    this.props.setProgress(0)
    const url = `https://newsapi.o
    rg/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    // console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      
    })
    this.props.setProgress(100)

  }

  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    // console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  }

  fetchMoreData = async () => {
   this.setState({page:this.state.page + 1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
   this.setState({ loading: true })
   let data = await fetch(url)
   let parsedData = await data.json()
   // console.log(parsedData)
   this.setState({
     articles: this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults,
     loading: false,
     
   })
   
  };

  render() {
    return (
      <div className="container my-5 ">
        <div className="" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
          <h1 className="text-center mb-4" style={{ fontSize: '5rem' ,marginTop:"100px"}}>
            Today's News Top Headlines
          </h1>
          <h2 className="text-center mb-4">
            ~{' '}
            {this.props.category.charAt(0).toUpperCase() +
              this.props.category.slice(1)}{' '}
            ~
          </h2>
        </div>
        <hr />


        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
        <div className="container">
          
      
          <div className="row d-flex ">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ''}
                    description={
                      element.description
                        ? element.description.slice(0, 150)
                        : ''
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              )
            })}
          </div>
          </div>
        </InfiniteScroll>
       
      </div>
    )
  }
}

News.defaultProps = {
  pageSize: 5,
  country: 'in',
  category: 'general',
}
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}
