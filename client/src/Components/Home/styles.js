import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(2, 0, 2)
    },
    icon: {
        margin: theme.spacing(2, 0, 2)
    }
}))