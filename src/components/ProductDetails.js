import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from './useFetch';
import ShirtNoBg from './images/tshirtnobg.png'
import HatNoBg from './images/hat2nobg.png';
import { FaShoppingCart } from 'react-icons/fa'
import HoodieNoBg from './images/hoodie2nobg.png';

const ProductDetails = () => {

    const { id } = useParams();
    const { data, pending, error } = useFetch(`http://localhost:8000/products/${id}`)

    const [cart, setCart] = useState([]);
    const [cartPending, setCartPending] = useState(true);
    const [cartError, setCartError] = useState(null);
    const ids = cart.map((item) => [item.product_id, item.id, item.quantity]);
    const filteredId = ids.filter(id => id[0] === data.id)

    //fetch cart array for checking ids
    useEffect(() => {
        fetch('http://localhost:8000/cart')
          .then(res => {
            if(!res.ok) {
              throw Error('error')
            } return res.json()})
          .then(data => {
            setCart(data);
            setCartPending(false);
            setCartError(null);
          }).catch(err => {
            setCartError(err.message)
          });
      }, []);

    const name = data.name
    const product_id = data.id
    const category = data.category
    const price = data.price + 0.99
    const [formQuantity, setFormQuantity] = useState();
    const [quantity, setQuantity] = useState(1);
    const product = { name, product_id, category, price, quantity }
    const [patchid, setPatchid] = useState();
    const [hasPatched, setHasPatched] = useState(false);

    
//crud 

    const handleCreate = (e) => {
        e.preventDefault();

        if (formQuantity) {
            setQuantity(formQuantity)
        } 

        fetch('http://localhost:8000/cart', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }).then(res => {
            return res.json();
          })
          .then((data) => {
              setPatchid(data.id)
          })

          alert('Added Item(s) to Cart')
    }

    const handleUpdate = (e) => {

        e.preventDefault();

    //if page is not reloaded 

       if (formQuantity) {
           setQuantity(quantity + formQuantity)
       } else {setQuantity(quantity + 1)} 


    //if page is reloaded 


       //first input
       if(filteredId.length > 0) {
           setPatchid(filteredId[0][1])
           setQuantity(filteredId[0][2] + 1)
           setHasPatched(true)
        }

        if(formQuantity && filteredId.length > 0) {
            setPatchid(filteredId[0][1])
            setQuantity(filteredId[0][2] + formQuantity)
            setHasPatched(true) 
        }

        //after first input         
        if(hasPatched) 
        {setQuantity(quantity + 1)}

        if(hasPatched && formQuantity) 
        {setQuantity(quantity + formQuantity)}
        
       alert('Added Item(s) to Cart')
    }

    useEffect(() =>{
        //patch occurs when quantity state changes
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

    return (<>
        {!pending &&
            <div className='details-container' key={data.id} >
                <img className='details-img' src={data.category === "tshirt" ? ShirtNoBg : data.category === "hat" ? HatNoBg : HoodieNoBg}  alt="" />
                <div className='details'>
                    <div className='details-1'>
                        <h2>{data.name.toUpperCase()}</h2>
                        <h3>{data.category.toUpperCase()}</h3>
                        <h2>${data.price}.99</h2>
                    </div>
                    <div className='details-2'>
                        <div className='color-map'>
                            <h3>Colors:</h3>
                            {data.color.map(color => <div key={color} className='color-icon' style={{backgroundColor: `${color}`}} ></div>)}
                        </div>
                        <div className='size-container'>
                            <h3>Sizes:</h3>
                            {data.size[0] ? <h3>S </h3> : ""}
                            {data.size[1] ? <h3>M </h3> : ""}
                            {data.size[2] ? <h3>L</h3> : ""}
                        </div>
                    </div>
                    <div className="cart-options">
                        <input type="text" placeholder="1" className="quantity" onChange={(e) => setFormQuantity(parseInt(e.target.value))} />
                        <button onClick={!patchid && filteredId.length === 0
                            ? handleCreate : handleUpdate} className="cart-button">
                            Add To Cart
                            <FaShoppingCart></FaShoppingCart>
                        </button>
                    </div>
                </div>
            </div>
        }</>)
}

export default ProductDetails