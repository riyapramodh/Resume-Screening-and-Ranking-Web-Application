import React from 'react';
import logo from './LOGO.jpeg';
import './contact.css';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="contact-container">
            <header className="header">
                <nav className="nav">
                    <img src={logo} className="logo" alt="Logo" />
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/help">Help</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="contact-content">
                <h1>Contact</h1>
                <p>We wish to extend our maximum support to improve our webpage and render a good experience to all its users.</p>
                <p>Feel free to contact us through any of the below e-mail ids:</p>
                <ul>
                    <li><strong>Riya Pramodh:</strong> <a href="mailto:riyapramodh2002@gmail.com">riyapramodh2002@gmail.com</a></li>
                    <li><strong>Sai Pramod VVNS:</strong> <a href="mailto:saipramod.vvns@gmail.com">saipramod.vvns@gmail.com</a></li>
                    <li><strong>Vignesh KVK:</strong> <a href="mailto:vignesh.77278@gmail.com">vignesh.77278@gmail.com</a></li>
                    <li><strong>Vishaline AR:</strong> <a href="mailto:vishalinearv@gmail.com">vishalinearv@gmail.com</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Contact;
