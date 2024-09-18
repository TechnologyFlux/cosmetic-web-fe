import React, { useState } from "react";
import { Container } from "reactstrap";
import Link from "next/link";

import Select from "../../Control/Select";
import { renderContainer } from "../../../common/utils";

const quickLinks = [
  { name: "About us", to: "/about" },
  
  { name: "Contact", to: "/contact" },
];

export default function TopNavTwo({ container }) {
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  
  return (
    <div className="top-nav -style-2">
      <div className={renderContainer(container)}>
        <div className="top-nav__wrapper">
          <div className="top-nav__wrapper__quick-links">
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={process.env.PUBLIC_URL + link.to}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="top-nav__wrapper__selectors">
            
            <Link href={process.env.PUBLIC_URL + "#"}>
           { dataUser ? (<span className="text-red-500">{dataUser.userName}</span>):(
              <a className="top-nav__auth">Login/Register</a>)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
