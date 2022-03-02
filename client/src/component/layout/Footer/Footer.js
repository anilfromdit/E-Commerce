import React from "react";
import playstore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4> Download Our App </h4>
        <p>Download App For Android and IOS Devices</p>
        <img src={playstore} alt="Download app from playstore banner" />
        <img src={appStore} alt="Download app from App Store banner" />
      </div>
      <div className="midFooter">
        <h1>E-Mart</h1>
        <p>High quality and customer satisfaction is our first priority</p>
        <p>
          anilfromdit&copy; 2021-{new Date().getFullYear()}. &nbsp; All Rights
          Reserved
        </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a
          href={`https://github.com/anilfromdit`}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Github
        </a>
        <a
          href={`https://www.linkedin.com/in/anilfromdit/`}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:anilfromdit@gmail.com`}
          target="_blank"
          rel="noreferrer"
        >
          email
        </a>
      </div>
    </footer>
  );
};

export default Footer;
