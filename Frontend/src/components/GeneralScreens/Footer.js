import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Logo from "../UI/Logo";
import "../../Css/Footer.css";

const Footer = () => (
  <footer className="to-footer">
    <div className="to-container">
      <div className="to-footer__grid">
        <div>
          <Link to="/" aria-label="TechOrcas Home">
            <Logo />
          </Link>
          <p className="to-footer__desc">
            Software engineering, full-stack digital products, and AI-powered business automation
            built for clarity, scalability, and long-term reliability.
          </p>
          <div className="to-footer__socials">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="to-footer__social-btn"
              aria-label="TechOrcas on LinkedIn"
            >
              <FiLinkedin size={17} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="to-footer__social-btn"
              aria-label="TechOrcas on GitHub"
            >
              <FiGithub size={17} />
            </a>
            <a
              href="mailto:info@techorcas.com"
              className="to-footer__social-btn"
              aria-label="Email TechOrcas"
            >
              <FiMail size={17} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="to-footer__heading">Company</h4>
          <ul className="to-footer__list">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/#process">Our Process</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="to-footer__heading">Services</h4>
          <ul className="to-footer__list">
            <li><Link to="/services/custom-software-development">Custom Software Development</Link></li>
            <li><Link to="/services/web-application-development">Web Development</Link></li>
            <li><Link to="/services/mobile-application-development">Mobile App Development</Link></li>
            <li><Link to="/services/ai-powered-business-automation">AI Automation</Link></li>
            <li><Link to="/services/saas-product-development">SaaS Development</Link></li>
            <li><Link to="/services/api-development-and-integration">API Integration</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="to-footer__heading">Contact</h4>
          <ul className="to-footer__list">
            <li><a href="mailto:info@techorcas.com">info@techorcas.com</a></li>
            <li><Link to="/contact">Contact Page</Link></li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="to-footer__bottom">
        <span>© {new Date().getFullYear()} TechOrcas. All rights reserved.</span>
        <div className="to-footer__legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
