import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {




    return (
        <div className='footer-wrapper'>
            <div className="footer-item">
                <h2>Links</h2>
                <ul>
                   <Link to="/products/trending"><li>Popular Products</li></Link>
                   <Link to="/products/all"><li>All Products</li></Link>
                   <li>Shop By Category</li>
                </ul>
            </div>
            <div className="footer-item">
                <h2>Company</h2>
                <ul>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Careers</li>
                </ul>
            </div>

            <div className="footer-item-icons footer-item">
                <h2>Follow</h2>
                <ul>
                <li><div className="icon"><FaTwitter></FaTwitter></div></li>
                <li><div className="icon"><FaFacebookF></FaFacebookF></div></li>
                <li><div className="icon"><FaInstagram></FaInstagram></div></li>
                </ul>
            </div>


        </div>
    )
}

export default Footer