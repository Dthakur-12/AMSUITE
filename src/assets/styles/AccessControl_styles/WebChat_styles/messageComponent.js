import { emphasize } from "@mui/system";
const styles = theme => ({
    rightMessage:{
        position:'absolut',
        justifySelf:'flex-end',
        margin:'0 7px 0 7px',
        marginLeft:'auto',
        display:'flex',
        justifyContent:'flex-end',       
        '& .messageContent':{
            background: theme.palette.primary.main,
            padding: '10px 20px 0 20px'
        },
       

    },
    leftMessage:{
        position:'absolut',
        margin:'0 7px 0 7px',
        '& .messageContent':{
            background: theme.palette.backgroundSecondary.main,
            padding: '10px 20px 0 20px'
        }
    },
    messageCard:{
        borderRadius:10,
        marginBottom:15,
        display:'inline-block',
        maxWidth:'100%'
    },
    messageText:{
        color:theme.palette.text.main,
    },
    messageActions:{
        display:'flex',
        flexDirection:'row',
        padding:5,
        justifyContent:'flex-end',
        background: theme.palette.primary.main,
    },
    messageActionsLeft:{
        display:'flex',
        flexDirection:'row',
        padding:5,
        justifyContent:'flex-end',
        background: theme.palette.backgroundSecondary.main,
    },
    messageDate:{
        color:theme.palette.textSecondary.main + ' !important',
    },
    messageDateLeft:{
        color:theme.palette.textSecondary.main + ' !important',
    }

});

export default styles;
