import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShirtNoBg from './images/tshirtnobg.png';
import HatNoBg from './images/hat2nobg.png';
import HoodieNoBg from './images/hoodie2nobg.png';
import { FaFilter } from 'react-icons/fa'
import useFetch from './useFetch';
import { useGlobalContext } from './Context';


const Products = () => {

  const { data, pending, error } = useFetch('http://localhost:8000/products')
  const prices = [
    {
      "btn_text": "Less Than $30",
      "price_lower": 30,
      "price_upper": null
    },
    {
      "btn_text": "$30 - $50",
      "price_lower": 30,
      "price_upper": 50
    },
    {
      "btn_text": "$50 - $75",
      "price_lower": 50,
      "price_upper": 75
    },
    {
      "btn_text": "$75 - $100",
      "price_lower": 75,
      "price_upper": 100
    }
  ]
  const Categories = [...new Set(data.map((item) => item.category))];
  const Discounts = [...new Set(data.map(item => item.discount).filter(item => item !== null).sort())];
  let filteredData = [...data]


  const { FilterEqual,
    FilterBoolean,
    FilterLessThan,
    FilterCompare2,
    handleCategory,
    handleTrending,
    handlePrice,
    handlePrice2,
    handleDiscount,
    resetFilters,
    category,
    name,
    price,
    price2,
    price3,
    trending,
    discount,
    setName,
    activeCategory,
    activePrice,
    activeDiscount } = useGlobalContext();

  const [modalOpen, setModalOpen] = useState(false);


  //filter data based on data sub-type

  if (category) {
    filteredData = FilterEqual(filteredData, "category", category);
  }

  if (name) {
    filteredData = FilterEqual(filteredData, "name", name);
  }

  if (price) {
    filteredData = FilterLessThan(filteredData, "price", price);
  }

  if (price2) {
    filteredData = FilterCompare2(filteredData, "price", price2, price3);
  }

  if (trending) {
    filteredData = FilterBoolean(filteredData, "trending");

  }

  if (discount) {
    filteredData = FilterEqual(filteredData, "discount", discount);
  }


  return (

    <div className='products-container'>

      <button className="filter-modal-btn" onClick={!modalOpen ? () => setModalOpen(true) : () => setModalOpen(false) }>
        <FaFilter size={32}></FaFilter>
      </button>

      <div className='filter-container'>
        <h3>Search By Name</h3>
        <input className='name-input' value={name} type="text" onChange={(e) => setName(e.target.value)} />

        <div className="categories filter-group">
          <h3>Categories</h3>
          {Categories.map(category => (
            <button key={category} className={`${activeCategory === category ? 'filter-btn active' : "filter-btn"}`} onClick={handleCategory} data-category={category}>{category}</button>
          ))}
        </div>

        <div className="prices filter-group">
          <h3>By Price</h3>
          {prices.map(priceBtn => (
            <button className={`${activePrice === priceBtn.btn_text ? "filter-btn active" : "filter-btn"}`} key={priceBtn.btn_text} onClick={priceBtn.price_upper !== null ? handlePrice2 : handlePrice} data-price_lower={priceBtn.price_lower}
              data-price_upper={priceBtn.price_upper}
            >{priceBtn.btn_text}</button>
          ))}
        </div>

        <div className="discounts filter-group">
          <h3>By Discount</h3>
          {Discounts.map(discount => (
            <button className={`${activeDiscount === discount ? "filter-btn active" : "filter-btn"}`} key={discount} onClick={handleDiscount} data-discount={discount}>{discount}% off</button>
          ))}

        </div>

        <h3>Other</h3>
        <button className={`${trending ? "filter-btn active" : "filter-btn"}`} onClick={handleTrending}>Popular Products</button>
        <button className='filter-btn' onClick={resetFilters}>Reset All Filters</button>

      </div>

      {modalOpen && 
        <div className='filter-modal'>

        <div className='filter-container modal'>
          <button className="close-modal" onClick={() => setModalOpen(false)}>X</button>
        <h3>Search By Name</h3>
        <input className='name-input' value={name} type="text" onChange={(e) => setName(e.target.value)} />

        <div className="categories filter-group">
          <h3>Categories</h3>
          {Categories.map(category => (
            <button key={category} className={`${activeCategory === category ? 'filter-btn active' : "filter-btn"}`} onClick={handleCategory} data-category={category}>{category}</button>
          ))}
        </div>

        <div className="prices filter-group">
          <h3>By Price</h3>
          {prices.map(priceBtn => (
            <button className={`${activePrice === priceBtn.btn_text ? "filter-btn active" : "filter-btn"}`} key={priceBtn.btn_text} onClick={priceBtn.price_upper !== null ? handlePrice2 : handlePrice} data-price_lower={priceBtn.price_lower}
              data-price_upper={priceBtn.price_upper}
            >{priceBtn.btn_text}</button>
          ))}
        </div>

        <div className="discounts filter-group">
          <h3>By Discount</h3>
          {Discounts.map(discount => (
            <button className={`${activeDiscount === discount ? "filter-btn active" : "filter-btn"}`} key={discount} onClick={handleDiscount} data-discount={discount}>{discount}% off</button>
          ))}

        </div>

        <h3>Other</h3>
        <button className={`${trending ? "filter-btn active" : "filter-btn"}`} onClick={handleTrending}>Popular Products</button>
        <button className='filter-btn' onClick={resetFilters}>Reset All Filters</button>

      </div>  

        </div>
      }

      {filteredData.length === 0 ? <div className='no-results'><h1>No Results Found</h1></div> :

        <div className='item-grid'>
          {filteredData.map((item) =>
            <Link to={`/products/${item.id}`} key={item.id}>
              <div className="grid-item" >

                <img className='item-img' src=
                  {item.category === "tshirt" ? ShirtNoBg : item.category === "hat" ? HatNoBg : HoodieNoBg}
                  alt="" />

                <Link to={`/quick/${item.id}`}>
                  <button className="quick">Quick View</button>
                </Link>

                <div className="product-info">
                  <div className='primary-info'>
                    <h4>{item.category.toUpperCase()}</h4>
                    <h4>{item.name}</h4>
                    <h4>${item.price}.99</h4>
                  </div>
                  <div className='secondary-info'>
                    <div className='size-container'>
                      <h4>Sizes:</h4>
                      {item.size[0] ? <p>S</p> : ""}
                      {item.size[1] ? <p>M</p> : ""}
                      {item.size[2] ? <p>L</p> : ""}

                    </div>
                    <div className='color-map'>
                      <h4>Colors:</h4>
                      {item.color.map((color, index) => <div key={index} className='color-icon-small' style={{ backgroundColor: `${color}` }}></div>)}
                    </div>
                  </div>
                </div>
              </div>

            </Link>
          )}

        </div>}
    </div>

  )
}

export default Products