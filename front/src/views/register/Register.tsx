import React from "react";
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
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
                .then((e) => {
                    console.log('e ', e)
                    history.push('/login');
                }).catch((err) => {
                console.log('err ', err)
            });
        },
    });

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
                            id="firstName"
                            label="First Name"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        <TextField
                            id="lastName"
                            label="Last Name"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            type="password"
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            type="password"
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

