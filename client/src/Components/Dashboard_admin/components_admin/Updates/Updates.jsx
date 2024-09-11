import React from 'react'
import './Updates.css'
import img from '../imgs/img.jpg'

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Updates = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    show_customers();
  }, []);

  async function show_customers() {
    let res = await fetch("http://127.0.0.1:8000/api/Show_Customers");
    let data = await res.json();
    setCustomer(data);
    console.log(data)
  }

  return (
    <>
      <div className="Updates">
          {customer.map((customer)=>{
            return(
              <>
              <div className='flex'>
                <div className="update">
                  <img src={img}/>
                </div>
                <div className="noti">
                    <span>{customer.username}&nbsp;</span><br />
                    <span>{customer.email}&nbsp;</span><br />
                    <span>{customer.phone_number}&nbsp;</span>
                </div>
              </div>
              </>
            )
          })}
      </div>
    </>
  )
}

export default Updates
