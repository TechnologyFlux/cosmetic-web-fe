import React, { useState } from "react";
import { Container } from "reactstrap";
import Link from "next/link";

import SocialIcons from "../../Other/SocialIcons";
import Select from "../../Control/Select";
import { renderContainer } from "../../../common/utils";
import { useRouter } from "next/router";



export default function TopNavOne({ container }) {
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("ENG");
  const router =useRouter()
  const handleLogout = () => {
    localStorage.clear()
    router.reload();
  }


const DataUser = JSON.parse(localStorage.getItem('userData'))
  return (
    <div className="top-nav .-style-1">
      <div className={renderContainer(container)}>
        <div className="top-nav__wrapper">
          <SocialIcons className="-white" />
          <div className="top-nav__wrapper__selectors">
            
            
            <div className="top-nav__auth">
              {DataUser ? (
                <div className="top-nav__auth">{DataUser.userName}</div>
              ) : (
                <Link href="/login" className="top-nav__auth">
                  Login/Register
                </Link>
              )}
              {DataUser && (
                <div className="text-red-500" onClick={handleLogout}>
                  Logout
                </div>
              )}
            </div>
            <div className="ml-4 text-white">
            {DataUser ? (
                <div onClick={()=>{router.push("/user/userProfile")}} className="top-nav__auth">Your account</div>
              ) : (
                ""
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
