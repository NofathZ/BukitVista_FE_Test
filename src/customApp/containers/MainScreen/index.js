import React, { useEffect, useState } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper.js";
import LayoutContent from "../../../components/utility/layoutContent";
import axios from 'axios'
import moment from "moment";
import MainScreenData from './MainScreenData.json'
import {
  Fieldset,
  Form,
  ComponentTitle,
} from '../../../containers/FirestoreCRUD/Article/articles.style.js';
import { TimePicker } from 'antd';
import "./MainScreen.css"

const MainScreen = () => {

  const [userInfo, setUserInfo] = useState({})
  const [bookingCode, setBookingCode] = useState("")

  useEffect(() => {
    axios.get(`https://bv-online-assessment.herokuapp.com/api/bookings/${bookingCode}`).then(response => {
      setUserInfo({
        arrival_time: response.data.arrival_time,
        booking_code: response.data.booking_code,
        check_in_date: response.data.check_in_date,
        check_out_date: response.data.check_out_date,
        guest_name: response.data.guest_name,
        profile_picture: response.data.profile_picture,
        property_name: response.data.property_name,
      })
    }).catch(error => { })
  }, [bookingCode])

  useEffect(() => {
    if (!bookingCode) {
      localStorage.setItem('bookingCode', bookingCode)
    }
  }, [])

  const setCodeFunc = (value) => {
    setBookingCode(value)
    localStorage.setItem('bookingCode', value)
  }

  const setArrival = (e) => {
    let hoursTemp = e._d.getHours().toString()
    let minutesTemp = e._d.getMinutes().toString()
    let hours = hoursTemp.length < 2 ? `0${hoursTemp}` : `${hoursTemp}`
    let minutes = minutesTemp.length < 2 ? `0${minutesTemp}` : `${minutesTemp}`
    const time = `${hours}:${minutes}`

    axios.put(`https://bv-online-assessment.herokuapp.com/api/bookings/${bookingCode}/update-eta`, {
      arrival_time: time
    }).then(response => {
      window.location.reload()
    }).catch(error => {
      alert("Error when set arrival time")
    })
  }

  return (
    <LayoutContentWrapper style={{ height: "100vh", width: "100vw" }}>
      <LayoutContent className="layout-content" style={{ padding: "100px" }}>
        <ComponentTitle style={{ textAlign: "center" }}>{MainScreenData.bookingCodeTitle}</ComponentTitle>
        <Form>
          <Fieldset className="field-set" >
            <input
              onChange={e => setCodeFunc(e.target.value.toUpperCase())}
              label="Title"
              placeholder="KJSH87HGDK"
              required
              style={{ textTransform: "uppercase", width: "300px" }}
              pattern="(/^[A-Za-z]+$/)"
            />
          </Fieldset>
        </Form>

        {
          userInfo && userInfo.guest_name ?
            <div className="user-info">
              <div className="img-user">
                <img src={userInfo.profile_picture} />
              </div>
              <p className="user-info-text">Hi, {userInfo.guest_name}!</p>
              <p className="user-info-text">{MainScreenData.sayThank}</p>
              <p className="user-info-text">Property name: <b>{userInfo.property_name}</b></p>
              <p className="user-info-text">
                <span className="check-date">Check in date: <b>{userInfo.check_in_date}</b></span>
                <t></t>
                <span className="check-date">Check in date: <b>{userInfo.check_out_date}</b></span>
              </p>
              <p className="user-info-text">Arrival Time: {userInfo.arrival_time ? `${userInfo.arrival_time} (${MainScreenData.thankArrival})` : `--:-- (${MainScreenData.waitingArrival})`}</p>
              <TimePicker onChange={e => setArrival(e)} defaultOpenValue={moment("00:00", 'HH:mm')} format={'HH:mm'} />
            </div>
            : <p>{MainScreenData.bookingCodeInvalid}</p>
        }
      </LayoutContent>
    </LayoutContentWrapper>
  );
}

export default MainScreen