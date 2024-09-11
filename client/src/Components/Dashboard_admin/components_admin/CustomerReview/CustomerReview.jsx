import React from 'react'
import './CustomerReview.css'
import Chart from 'react-apexcharts'

const CustomerReview = () => {
        const data = {
            series: [
                {name: "Review",
                    data:[10,50,12,30,35,100]
                },
            ],
            options: {
                chart: {
                    type: 'area',
                    height: 'auto'
                },
            },
            fill: {
                colors: ['#fff'],
                type: 'gradient'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                colors: ['#ff929f']
            },
            tooltip: {
                x:{
                    format: 'dd/MM/yy HH:mm'
                },
            },
            grid:{
                show: false
            },
            xaxis: {
                type : 'datetime',
                categories :[
                    '2024-06-19T00:00:00.000Z',
                    '2024-06-19T01:30:00.000Z',
                    '2024-06-19T02:30:00.000Z',
                    '2024-06-19T03:40:00.000Z',
                    '2024-06-19T04:50:00.000Z',
                    '2024-06-19T05:60:00.000Z',
                    '2024-06-19T06:70:00.000Z',
                ],
            },
            yaxis:{
                show: false
            },
            toolbar:{
                show: false
            },
        }

  return (
    <>
      <div className="CustomerReview">
            <Chart series={data.series} options={data.options} type='area'/>
      </div>
    </>
  )
}

export default CustomerReview



