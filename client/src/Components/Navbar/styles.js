import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    appBar: {
        width: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        fontSize: '35px',
        textDecoration: 'none',
        color: 'white'
    },
    icons:{
        color: 'white'
    }
}))