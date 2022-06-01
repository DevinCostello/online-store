import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import Pagination from './Pagination'

// images
import ShirtNoBg from './images/tshirtnobg.png'
import HatNoBg from './images/hat2nobg.png'
import HoodieNoBg from './images/hoodie2nobg.png'




const Home = ({ data }) => {

  const Discounted = data.filter(item => item.discount !== null)
  const Trending = data.filter(item => item.trending === true)

  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  const [postsPerPage, setPostsPerPage] = useState(4);

  const [activeDealPage, setActiveDealPage] = useState(1);
  const [activeTrendingPage, setActiveTrendingPage] = useState(1);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const indexOfLastPost2 = currentPage2 * postsPerPage;
  const indexOfFirstPost2 = indexOfLastPost2 - postsPerPage;

  const currentPosts = Discounted.slice(indexOfFirstPost, indexOfLastPost)
  const currentPosts2 = Trending.slice(indexOfFirstPost2, indexOfLastPost2)

  const NumberofDiscPages = Discounted.length / postsPerPage
  const NumberofTrendingPages = Trending.length / postsPerPage

  useEffect(() => {

    if(window.innerWidth < 1200) {
      setPostsPerPage(3)
    }

    if(window.innerWidth < 992) {
      setPostsPerPage(2)
    }
  
  },[postsPerPage])



  //Change page 

  //Discount slider

  const NextDisc = () => {
    setCurrentPage(currentPage === NumberofDiscPages ? 1 : currentPage + 1)
    setActiveDealPage(currentPage === NumberofDiscPages ? 1 : currentPage + 1)
  }

  const PrevDisc = () => {
    setCurrentPage(currentPage === 1 ? NumberofDiscPages : currentPage - 1)
    setActiveDealPage(currentPage === 1 ? NumberofDiscPages : currentPage - 1)
  }

  //Trending Slider

  const NextTrend = () => {

    setCurrentPage2(currentPage2 === NumberofTrendingPages ? 1 : currentPage2 + 1)
    setActiveTrendingPage(currentPage2 === NumberofTrendingPages ? 1 : currentPage2 + 1)
  }

  const PrevTrend = () => {
    setCurrentPage2(currentPage2 === 1 ? NumberofTrendingPages : currentPage2 - 1)
    setActiveTrendingPage(currentPage2 === 1 ? NumberofTrendingPages : currentPage2 - 1)
  }



  


  return (
    <div>

      <div className="hero">
        <div className="slogan">
          <h1>The Best Deals</h1>
          <h1>No Hassle</h1>
          <h1>Only Quality</h1>
        </div>
        <img src={ShirtNoBg} alt="" className="hero-image" />
      </div>

      <div className="deals-wrapper">
        <h1 className='home-header'>Browse Deals</h1>

        <div className="deals">
          <FaArrowAltCircleLeft className='left-arrow' onClick={PrevDisc} size={32}></FaArrowAltCircleLeft>
          <div className="deals-slider">
            {currentPosts.map(item =>
              <Link to={`/products/${item.id}`} key={item.id} >
                <div className='disc-grid-item'>
                  <img src={item.category === "tshirt" ? ShirtNoBg : item.category === "hat" ? HatNoBg : HoodieNoBg} alt="" />
                  <h2>{item.discount}% OFF</h2>
                </div>
              </Link>
            )}
          </div>
          <FaArrowAltCircleRight className='right-arrow' onClick={NextDisc} size={32}></FaArrowAltCircleRight>
        </div>

        <Pagination postsPerPage={postsPerPage} totalPosts={Discounted.length} activeDealPage={activeDealPage} />

      </div>

      <div className="popular-wrapper">
        <h1 className='home-header'>What's Popular</h1>
        <div className="popular">
          <FaArrowAltCircleLeft className='left-arrow' onClick={PrevTrend} size={32}></FaArrowAltCircleLeft>
          <div className="popular-slider">
            {currentPosts2.map(item =>
              <Link key={item.id} to={`/products/${item.id}`}>
                <div className='trending-grid-item'>
                  <img src={item.category === "tshirt" ? ShirtNoBg : item.category === "hat" ? HatNoBg : HoodieNoBg} alt="" />
                  <h2>{item.name}</h2>
                  <h3>{item.category}</h3>
                </div>
              </Link>
            )}
          </div>
          <FaArrowAltCircleRight className='right-arrow' onClick={NextTrend} size={32}></FaArrowAltCircleRight>
        </div>

        <Pagination postsPerPage={postsPerPage} totalPosts={Trending.length} activeTrendingPage={activeTrendingPage} />

      </div>

      <div className="home-cat">
        <h1 className='home-header'>Browse By Category</h1>
        <div className="categories">
          <Link to="products/hats">
            <div className="category">
              <img className='hat-img' src={HatNoBg} alt="" />
              <h3>Hats</h3>
            </div>
          </Link>
          <Link to="products/tshirts">
            <div className="category">
              <img className='tshirt-img' src={ShirtNoBg} alt="" />
              <h3>T-Shirts</h3>
            </div>
          </Link>
          <Link to="products/hoodies">
            <div className="category">
              <img className='hoodie-img' src={HoodieNoBg} alt="" />
              <h3>Hoodies</h3>
            </div>
          </Link>
        </div>
      </div>

      <div className="home-socials">
        <h1 className='home-header'>Connect With Us</h1>
        <div className="social-icon-container">

          <div className="insta home-social-icon">
            <FaInstagram color="Black" size={375}></FaInstagram>
          </div>

          <div className="facebook home-social-icon">
            <FaFacebookF color="White" size={275} ></FaFacebookF>
          </div>

          <div className="twitter home-social-icon">
            <FaTwitter color="#00ACEE" size={275}></FaTwitter>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home