import React from 'react'
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material"

const CustomMessage = (props) =>  {
    return (
            <Button style={{color:"red"}}>
                {props.message}
            </Button>
    )
}

export default CustomMessage