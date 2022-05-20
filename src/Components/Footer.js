import React from "react";
import "./CSS/Footer.css";
import PrivacyModal from "./PrivacyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faGithub,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="item1">
                    <PrivacyModal />
                </div>
                {/* <img className="img-rounded mt-5"  width="40px" height="40px"
                                src={process.env.REACT_APP_PHOTOPATH+'dota2icon.png'} ></img> */}
                <div className="item2">
                    { <img className="FooterImage" width="40px" height="40px" src={process.env.REACT_APP_PHOTOPATH+'dota2icon.png'} ></img> }
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <FontAwesomeIcon icon={faCopyright} />{" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} Salary App. All Rights
                        Reserved.
                    </span>
                </div>
                <a
                    href="https://github.com/dumitrulaurentiu64/Emp-React-FE"
                    target="_blank"
                    className="item3"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    href="http://fb.com"
                    target="_blank"
                    className="item4"
                >
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    className="item5"
                >
                    <FontAwesomeIcon icon={faYoutube} />
                </a>

                {false && <PrivacyModal click={true} />}
            </div>
        </footer>
    );
};

export default Footer;