import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, Grid, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import axios from 'axios';
import {useHistory} from "react-router-dom";

const formStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

const gridStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Register() {
    const history = useHistory();
    const gridClasses = gridStyles();
    const formClasses = formStyles();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [error, setError] = useState<{ [key: string]: any }>({}); // using any to not get stuck here, not a good practice i know

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: async (values) => {
            axios.post(`${apiUrl}/user/register-user`, {...values})
                .then((response ) => {
                    if (response.status === 201) {
                        history.push('/login');
                    }
                }).catch((error) => {
                    if (Array.isArray(error.response.data.message)) {
                        // making error messages more accessible
                        const errors = error.response.data.message.reduce((obj, item) => {
                            return {
                                ...obj,
                                [item.property]: item,
                            }
                        }, {});
                        return setError(errors);
                    }
                    return setError(error.response.data.message);
            });
        },
    });

    console.log('error ', error)

    return (
        <div className={gridClasses.root}>
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={6}>
                    <h2>Register</h2>
                    <form className={formClasses.root}
                          noValidate autoComplete="off"
                          onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            error={!!error.firstName}
                            id="firstName"
                            label="First Name"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            helperText={!!error.firstName ? Object.values(error.firstName.constraints) : undefined}
                        />
                        <TextField
                            error={!!error.lastName}
                            id="lastName"
                            label="Last Name"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            helperText={!!error.lastName ? Object.values(error.lastName.constraints) : undefined}
                        />
                        <TextField
                            error={!!error.email}
                            id="email"
                            label="Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            helperText={!!error.email ? Object.values(error.email.constraints) : undefined}
                        />
                        <TextField
                            error={!!error.password}
                            id="password"
                            label="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            type="password"
                            helperText={!!error.password ? Object.values(error.password.constraints) : undefined}
                        />
                        <TextField
                            error={!!error.confirmPassword}
                            id="confirmPassword"
                            label="Confirm Password"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            type="password"
                            helperText={!!error.confirmPassword ? Object.values(error.confirmPassword.constraints) : undefined}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Register
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

