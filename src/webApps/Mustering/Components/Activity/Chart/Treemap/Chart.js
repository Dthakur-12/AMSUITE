import React, { Component, useState } from 'react'
import { Treemap, XAxis, CartesianGrid, Line, Tooltip } from 'recharts'
import CustomizedContent from './CustomizedContent'

// const data = [
//   {
//     name: 'safe zone 1',
//     size:2054
//   },{
//     name: 'safe zone 2',
//     size:1692
//   },{
//     name: 'safe zone 3',
//     size:1966
//   },
//   {
//     name: 'safe zone 4',
//     size:2658
//   },{
//     name: 'safe zone 5',
//     size:1000
//   },{
//     name: 'safe zone 6',
//     size:2035
//   },
// ];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
        className='custom-tooltip'
        style={{ background: '#424242', padding: 5, borderRadius: 5 }}
      >
        <p className='label' style={{ color: '#fff' }}>{`${
          payload.length > 0 && payload[0].value
        }`}</p>
      </div>
    )
  }

  return null
}

const COLORS = [
  '#8889DD',
  '#9597E4',
  '#8DC77B',
  '#A5D297',
  '#E2CF45',
  '#F8C12D',
]

const SafeZones = (props) => {
  const { data, filter, isDesktop, selectedZone, zonesInResults} = props
  return (
    <Treemap
      isAnimationActive={false}
      width={
        isDesktop
          ? window.innerWidth - window.innerWidth * 0.6
          : window.innerWidth - window.innerWidth * 0.3
      }
      height={
        isDesktop
          ? window.innerHeight - window.innerHeight * 0.5
          : window.innerHeight - window.innerHeight * 0.5
      }
      data={data}
      dataKey='size'
      ratio={4 / 3}
      stroke='#fff'
      fill='#8884d8'
      onClick={(index) => {
        filter(index.Id)
      }}
      content={<CustomizedContent colors={COLORS} selectedId={selectedZone} zonesInResults={zonesInResults}/>}
    >
      <XAxis dataKey='name' />
      <Tooltip content={<CustomTooltip />} />
      <CartesianGrid stroke='#f5f5f5' />
      <Line type='monotone' dataKey='uv' stroke='#ff7300' yAxisId={0} />
      <Line type='monotone' dataKey='pv' stroke='#387908' yAxisId={1} />
    </Treemap>
  )
}

export default SafeZones
