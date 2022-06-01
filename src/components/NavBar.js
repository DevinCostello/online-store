import React, { useState } from 'react'
import useFetch from './useFetch'
import { Link, NavLink } from 'react-router-dom'
import { FaShoppingBag, FaShoppingCart, FaBars } from 'react-icons/fa'

const NavBar = ({ loggedIn }) => {

    const { data, pending, error } = useFetch('http://localhost:8000/cart')
    const [dropDown, setDropDown] = useState(false);

    return (
        <nav>
            <div className="nav-center">
                {/* nav header */}
                <div className="nav-header">
                    <Link to="/"><FaShoppingBag className='nav-icon' size={36}></FaShoppingBag></Link>

                    <button className="nav-drop-btn" onClick={!dropDown ? () => setDropDown(true) : () => setDropDown(false) }><FaBars className='nav-dropdown' size={36}></FaBars></button>


                    {dropDown &&
                        <div className="nav-drop">
                            <ul className="links-dropdown">
                                <Link to="/"><li>Home</li></Link>
                                <Link to="/products/all"><li>Products</li></Link>
                                <Link to="/products/discounts"><li>Deals</li></Link>
                                <Link to="/products/trending"><li>Popular</li></Link>
                            </ul>
                        </div>
                    }

                    <Link to="/"><h3>OnlineStore</h3></Link>
                </div>
                {/* Links */}
                <ul className="links">
                    <NavLink to="/"><li>Home</li></NavLink>
                    <NavLink to="/products/all"><li>Products</li></NavLink>
                    <NavLink to="/products/discounts"><li>Deals</li></NavLink>
                    <NavLink to="/products/trending"><li>Popular</li></NavLink>

                </ul>
                {/* login */}
                {loggedIn ?

                    <Link to="/cart">
                        <div className="cart-nav">
                            <FaShoppingCart size={32}><button className="cart-btn"></button></FaShoppingCart>
                            <div>
                                <h3>{data.length} item(s)</h3>
                                {/* <h3>$179.97</h3> */}
                            </div>
                        </div>
                    </Link>


                    :
                    <div className="login-btns">
                        <Link to="/login"><button className='login-btn'>Login</button></Link>
                        <Link to="/login"><button className='signup-btn'>Signup</button></Link>
                    </div>}

            </div>
        </nav>
    )
}

export default NavBar
