import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  async componentDidMount() {

    let url = "https://newsapi.org/v2/everything?q=apple&from=2023-02-24&to=2023-02-24&sortBy=popularity&apiKey=d2efbac716ef4cd29f9d62237244d3f7&page=1&pageSize=15"
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState(
      {articles:parsedData.articles}
      )
  }

  constructor() {
    super();
    this.state = {
      articles:[],
      loading : false,
      page :1
    }
  }

  goToPrev = async ()=>{
    console.log("clicked on Prev")

    let url = `https://newsapi.org/v2/everything?q=apple&from=2023-02-24&to=2023-02-24&sortBy=popularity&apiKey=d2efbac716ef4cd29f9d62237244d3f7&page=${this.state.page-1}&pageSize=15`
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page:this.state.page - 1,
      articles:parsedData.articles

    })
  }
  
  goToNext = async ()=> {
    console.log("clicked on Next")

    let url = `https://newsapi.org/v2/everything?q=apple&from=2023-02-24&to=2023-02-24&sortBy=popularity&apiKey=d2efbac716ef4cd29f9d62237244d3f7&page=${this.state.page+1}&pageSize=15`
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page:this.state.page + 1,
      articles:parsedData.articles

    })
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>NewsMonkey -Top Headlines</h1>

  
        <div className="row">

          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title? element.title: ""} description={element.description ? element.description.slice(0,88) : ""} imageUrl ={element.urlToImage?element.urlToImage : "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/3/7/0/6/2/1/1/homepod-mini_tre-e3eee5a1b47b6c2b.jpg"} newsUrl={element.url} />
            
          </div>
          })}
          
        </div>

        <div className="container d-flex justify-content-between">

        <button disabled={this.state.page <=1} type="button" onClick={this.goToPrev} className="btn btn-dark">&larr; Previous </button>

        <button type="button" onClick={this.goToNext} className="btn btn-dark">Next &rarr;</button>
        </div>

      </div>
      
    )
  }
}

export default News