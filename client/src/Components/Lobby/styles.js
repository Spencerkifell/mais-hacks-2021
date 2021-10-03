import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    textInput: {
        width: '85%'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(2),
        width: '100%'
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    }
}))