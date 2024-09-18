import React from "react";
import { Container } from "reactstrap";
import Link from "next/link";

import Navigator from "../Elements/Navigator";
import MenuFunctionIcons from "../Elements/MenuFunctionIcons";
import { renderContainer } from "../../../common/utils";

const data = [
  { title: "Face Mask", to: `/shop/fullwidth-4col?category=Face Mask` },
  { title: "Cleansers", to: "/shop/fullwidth-4col?category=Cleansers" },
  { title: "Serums", to: "/shop/fullwidth-4col?category=Serums" },
  { title: "Sunscreen", to: "/shop/fullwidth-4col?category=Sunscreen" }
  
];

export default function MenuTwo({ container }) {
  return (
    <div className="menu -style-2">
      <div className={renderContainer(container)}>
        <div className="menu__wrapper">
          <MenuFunctionIcons hide="cart" />
          <div className="navigator">
            <Link href={process.env.PUBLIC_URL + "/homepages/homepage1"}>
              <a className="menu__wrapper__logo">
                <span className="text-medium font-semibold mr-4">Min Cosmetic </span >
              </a>
            </Link>
            <ul className="navigator_part -left">
              {data.slice(0, 4).map((item, index) => (
                <li key={index} >
                  <Link href={process.env.PUBLIC_URL + item.to}>
                    <span className="pt-2 text-medium font-thin cursor-pointer">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <ul className="navigator_part -right">
              {data.slice(4, 7).map((item, index) => (
                <li key={index}>
                  <Link href={process.env.PUBLIC_URL + item.to}>
                    <a>{item.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <MenuFunctionIcons hide="search" />
        </div>
      </div>
    </div>
  );
}
