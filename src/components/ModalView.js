import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from './useFetch'
import ShirtNoBg from './images/tshirtnobg.png'
import HatNoBg from './images/hat2nobg.png';
import HoodieNoBg from './images/hoodie2nobg.png';


const ModalView = () => {

  const { id } = useParams();
  const Navigate = useNavigate();
  const { data, pending, error } = useFetch(`http://localhost:8000/products/${id}`)

  const [cart, setCart] = useState([]);
  const [cartPending, setCartPending] = useState(true);
  const [cartError, setCartError] = useState(null);
  const ids = cart.map((item) => [item.product_id, item.id, item.quantity]);
  const filteredId = ids.filter(id => id[0] === data.id)

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

  const handleCreate = (e) => {

    e.preventDefault();

    if (formQuantity) {
      setQuantity(formQuantity)
  } 

    fetch('http://localhost:8000/cart', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then(res => {
      return res.json();
    })
    .then((data) => {
      setPatchid(data.id)
      alert("Items(s) added to cart")
    })

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
      <div className='modal-container'>
        <div className="modal-content">
          <img className='modal-img' src={data.category === "tshirt" ? ShirtNoBg : data.category === "hat" ? HatNoBg : HoodieNoBg}  alt="" />
          <div className="modal-details">
            <div className="modal-details-1">
              <h2>{data.name}</h2>
              <h2>{data.category}</h2>
              <h2>${data.price}.99</h2>
            </div>
            <div className="modal-details-2">
              <div className='color-map'>
                <h3>Colors:</h3>
                {data.color.map((color, index) => <div key={index} className='color-icon-small' style={{backgroundColor: `${color}`}}></div>)}
              </div>
              <div className='size-container'>
                <h3>Sizes:</h3>
                {data.size[0] ? <h3>S</h3> : ""}
                {data.size[1] ? <h3>M</h3> : ""}
                {data.size[2] ? <h3>L</h3> : ""}
              </div>
            </div>
            <div className="modal-buttons">
              <input type="text" placeholder="1" className="quantity" onChange={(e) => setFormQuantity(parseInt(e.target.value))} />
              <button onClick={!patchid && filteredId.length === 0 ? handleCreate : handleUpdate}>Add To Cart</button>
              <button onClick={() => Navigate(`/products/${data.id}`)}>View Details</button>
            </div>
          </div>
        </div>

      </div>
    }
  </>)
}

export default ModalView