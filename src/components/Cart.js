import React, { useEffect, useState, useRef } from 'react'
import useFetch from './useFetch'
import ShirtNoBg from './images/tshirtnobg.png';
import HatNoBg from './images/hat2nobg.png';
import HoodieNoBg from './images/hoodie2nobg.png';
import { useGlobalContext } from './Context';


const Cart = () => {

  const { data, pending, error } = useFetch('http://localhost:8000/cart')
  const prices = data.map((item) => item.price * item.quantity)
  const itemtotal = prices.reduce((a, b) => a + b, 0).toFixed(2)
  const taxes = (itemtotal * 0.13).toFixed(2)
  const carttotal = (+itemtotal + +taxes + +9.99).toFixed(2);
  const [quantity, setQuantity] = useState();
  const [patchid, setPatchid] = useState();
  const { handleDelete } = useGlobalContext();

  useEffect(() => {
    fetch(`http://localhost:8000/cart/${patchid}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: quantity
        })

      }
    )

  }, [patchid, quantity]);

  const handleUpdate = (e) => {

    e.preventDefault();
    setPatchid(e.currentTarget.dataset.patchid);
    setQuantity(parseInt(e.target.value));
  }

  



  return (

<div className='cart-container'>

  <div className="cart-title"> 
    <h1>Shopping Cart ({data.length} items)</h1>
    <button className='update-cart' onClick={() => window.location.reload(false)}>Update Cart</button>
    </div>  

    {data.length === 0 ? <h1 className='empty'>Cart is Empty!</h1> :
      <div className="cart-content">
        <div className='cart'>
          {data.map(item =>
            <div key={item.id} className="cart-item">
              <img className='cart-img' src={item.category === "tshirt" ? ShirtNoBg : item.category === "hat" ? HatNoBg : HoodieNoBg} alt="" />
              <div className="cart-desc">
                <h2>{item.name}</h2>
                <h3>{item.category}</h3>
                <input type="text" data-patchid={item.id} placeholder={item.quantity} onChange={handleUpdate} />

              </div>


              <div className='cart-item-right'>
                <h3 className='cart-price'>${(item.price * item.quantity).toFixed(2)}</h3>
                <button className="remove" data-deleteid={item.id} onClick={handleDelete}>REMOVE</button>
              </div>

            </div>
          )}
        </div>

        <div className="summary">
          <h1>Summary</h1>
          <div className="summary-content">
            <div className="summary-left">
              <h3>Item(s):</h3>
              <h3>Delivery:</h3>
              <h3>Taxes:</h3>
            </div>
            <div className="summary-right">
              <h3>${itemtotal}</h3>
              <h3>$9.99</h3>
              <h3>${taxes}</h3>
            </div>
          </div>
          <div className="summary-total">
          <div className='summary-price'>
            <h2>Total:</h2>
            <h2>${carttotal}</h2>
          </div>  
            <button className="checkout">CHECKOUT</button>
            
          </div>




        </div>
      </div>
    }
  </div>)
}

export default Cart