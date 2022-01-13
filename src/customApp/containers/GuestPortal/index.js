import React, { useEffect, useState } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper.js";
import LayoutContent from "../../../components/utility/layoutContent";
import GuestPortalData from './GuestPortalData.json'
import axios from 'axios'
import "./GuestPortal.css"
import { Icon } from "antd";

const GuestPortal = () => {
  const [userInfo, setUserInfo] = useState({})

  const bookingCode = localStorage.getItem('bookingCode')

  useEffect(() => {
    axios.get(`https://bv-online-assessment.herokuapp.com/api/bookings/${bookingCode}`).then(response => {
      setUserInfo({
        guest_name: response.data.guest_name,
        profil_picture: response.data.profile_picture,
      })
    }).catch(error => {
      console.error(error.message)
    })
  }, [bookingCode])

  return (
    <LayoutContentWrapper style={{ height: "100vh", width: "100vw" }}>
      <LayoutContent className="container-own">
        {userInfo && userInfo.guest_name ?
          <>
            <div className="img-box">
              <img className="portal-img" src={userInfo.profil_picture} />
            </div>
            <h1 className="guest-name" style={{ textAlign: "center" }}>{userInfo.guest_name}</h1>
            <p className="guest-title-job" style={{ textAlign: "center" }}>{GuestPortalData.userJobTitle}</p>
            <p className="guest-desc" style={{ textAlign: "center" }}>{GuestPortalData.userDesc}</p>
            <div className="sosmed-box">
              <Icon type="facebook" />
              <Icon type="twitter" />
              <Icon type="google-plus" />
              <Icon type="linkedin" />
              <Icon type="dribbble" />
            </div>
          </>
          :
          <p className="guest-title-job" style={{ textAlign: "center" }}>Booking Code Invalid</p>
        }
      </LayoutContent>
    </LayoutContentWrapper>
  );
}

export default GuestPortal