import React from 'react';
import logo from './LOGO.jpeg';
import './help.css';
import { Link } from 'react-router-dom';

const Help = () => {
    return (
        <div className="help-container">
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
            <div className="help-content">
                <h1>About</h1>
                <p>
                    Welcome to this resume screening and ranking web application, designed with the intent of easing the recruitment process; removing the hassle of manually reviewing hundreds of thousands of resumes to find the candidate with the right skillset.
                </p>
                <p>
                    This page will guide you through the steps to follow and the measures to keep note of while using this webpage:
                </p>
                <ol>
                    <li>
                        <strong>Get Started:</strong> Click the "Get Started" button to go to the upload page.
                    </li>
                    <li>
                        <strong>Upload Resumes:</strong> Upload a zip folder containing all the resumes that you wish to screen and rank.
                    </li>
                    <li>
                        <strong>Enter Requirements:</strong> Once the upload is successful, you will be directed to the recruiter requirements page. Enter the requirements or skillset expected from the resumes.
                    </li>
                    <li>
                        <strong>Priority:</strong> Choose from a variety of options in the dropdowns. For each input, use the star rating method to prioritize.
                    </li>
                    <li>
                        <strong>Submit:</strong> After inputting requirements, click the submit button to view the final result.
                    </li>
                    <li>
                        <strong>View Resumes:</strong> Input the number of resumes you want to see. They will be returned in rank order from highest to lowest.
                    </li>
                </ol>
                <div className="standards">
                    <h2>Standards:</h2>
                    <ul>
                        <li>All resumes in the zip folder should be in PDF format.</li>
                        <li>All resumes must follow the specified format.</li>
                        <li>The resumes must not contain any images or text in the form of images.</li>
                        <li>The resumes should not contain typos.</li>
                        <li>Class 10 and 12 scores should be mentioned as percentages.</li>
                        <li>Name of the files in the zip folder should be in the format - "Name.pdf".</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Help;
