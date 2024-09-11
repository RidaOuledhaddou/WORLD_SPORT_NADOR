import React, { useState } from 'react'
import {motion} from 'framer-motion'
import './Card.css'

import {UilTimes} from '@iconscout/react-unicons'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from 'react-apexcharts'

const Card = (props) => {

    const [expanded, setExpanded] = useState(false)

  return (
    <>
      <motion>
            {
                <CompactCard param={props} setExpanded={()=>setExpanded(true)}/>
            }
      </motion>
    </>
  )
}

function CompactCard ({param}){
    const Png = param.png;
        return (
            <motion.div className="CompactCard" 
            style={{
                background : param.color.backGround,
                boxShadow :param.color.boxShadow
            }}
            
            >
                <div className="radialBar">
                    <CircularProgressbar 
                    value={param.barValue}
                    text={`${param.barValue.toFixed(2)}%`}
                     />
                     <span>{param.title}</span>
                </div>
                <div className="detail">
                    <Png/>
                    <span style={{fontSize : '16px'}}>{param.value}</span>
                    <span>Last Year</span>
                </div>
            </motion.div>
        )
}

export default Card
