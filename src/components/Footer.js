import React from "react";

import {
  FaDiscord,
  FaGithub,
  FaMediumM,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => (
  <div className="flex flex-col">
    <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto text-primary-100">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 hover:text-primary-200"
      >
        <FaGithub />
      </a>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 hover:text-primary-200"
      >
        <FaTwitter />
      </a>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 hover:text-primary-200"
      >
        <FaMediumM />
      </a>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 hover:text-primary-200"
      >
        <FaTelegramPlane />
      </a>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition duration-300 hover:text-primary-200"
      >
        <FaDiscord />
      </a>
    </div>
    <div className="flex flex-col items-center mx-auto mt-5 space-y-4 text-xs text-primary-100">
      <span>© XSRO NFT, 2021. All rights reserved.</span>
    </div>
  </div>
);

export default Footer;
