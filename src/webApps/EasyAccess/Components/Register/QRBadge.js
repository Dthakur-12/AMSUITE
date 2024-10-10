import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

class QRBadge extends React.Component  {
    constructor(props){
        super(props)
    }
    render()
    {return (
        <div>
            <Typography style={{width:150, textAlign:"center", marginBottom:5}}>
                {this.props.personName}
            </Typography>
            <div style={{width:150,height:150}}>
                <img alt="preview" src={"data:image/jpeg;base64," + this.props.url }/>
            </div>
        </div>
    )}
}

export default QRBadge 

