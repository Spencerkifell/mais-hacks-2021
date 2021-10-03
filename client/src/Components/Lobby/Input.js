import React from 'react'
import { TextField, Grid } from '@material-ui/core'

function Input({name, type, label, half, handleChange, autoFocus}) {
    return (
        <Grid item xs={6} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange} 
                variant="outlined"
                required
                fullWidth 
                label={label}
                autoFocus
                type={type}
            />
        </Grid>
    )
}

export default Input