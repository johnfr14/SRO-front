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
      <div className="flex flex-row items-center justify-between w-full max-w-xs">
        <a
          href="https://github.com/SRO-SarahRo/xsro-front"
          rel="noopener noreferrer"
          className="transition duration-300 hover:text-primary-200"
          target="_blank"
        >
          <FaGithub />
        </a>
        <a
          href="/"
          rel="noopener noreferrer"
          className="transition duration-300 hover:text-primary-200"
          target="_blank"
        >
          <FaTwitter />
        </a>
        <a
          href="/https://twitter.com/Sarahro_Sro"
          rel="noopener noreferrer"
          className="transition duration-300 hover:text-primary-200"
          target="_blank"
        >
          <FaMediumM />
        </a>
        <a
          href="/https://medium.com/@sarahro_sro"
          rel="noopener noreferrer"
          className="transition duration-300 hover:text-primary-200"
          target="_blank"
        >
          <FaTelegramPlane />
        </a>
        <a
          href="/"
          rel="noopener noreferrer"
          className="transition duration-300 hover:text-primary-200"
          target="_blank"
        >
          <FaDiscord />
        </a>
      </div>
    </div>
    <div className="flex flex-col items-center mx-auto mt-5 space-y-4 text-xs text-primary-100">
      <span>© XSRO NFT, 2021. All rights reserved.</span>
    </div>
  </div>
);

export default Footer;
