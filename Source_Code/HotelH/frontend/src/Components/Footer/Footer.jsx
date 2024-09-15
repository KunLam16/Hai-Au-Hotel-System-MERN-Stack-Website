import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/Haiau.png";
import instagram_icon from "../Assets/instagram_icon.png";
import facebook_icon from "../Assets/facebook-icons.png";
import youtube_icon from "../Assets/youtube-icons.png";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>HAI AU HOTEL</p>
            </div>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                  <Link to='https://www.instagram.com/kunlam16/'><img src={instagram_icon} alt="" /></Link>  
                </div>
                <div className="footer-icons-container">
                   <Link to='https://www.facebook.com/kunlam16onthemic'><img src={facebook_icon} alt="" /></Link> 
                </div>
                <div className="footer-icons-container">
                    <Link to = 'https://www.youtube.com/channel/UCiEMixVwcy8D1OL-oqoU3Dw'><img src={youtube_icon} alt="" /></Link>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>&copy; {new Date().getFullYear()} HAI AU HOTEL by 11202005. All Rights Reserved</p>
            </div>
        </div>
    );
}
export default Footer;