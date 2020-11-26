import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, Grid, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

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

export default function Login() {
    const history = useHistory();
    const gridClasses = gridStyles();
    const formClasses = formStyles();
    const apiUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            axios.post(`${apiUrl}/auth/login`, {...values})
                .then((res) => {
                    if (res.status === 201) {
                        localStorage.setItem('user', JSON.stringify(res.data));
                        history.push('/home')
                    }
                }).catch((err) => {
                    setError(true);
            });
        }
    });

    return (
        <div className={gridClasses.root}>
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={6}>
                    <h2>Login</h2>
                    <form className={formClasses.root}
                          noValidate autoComplete="off"
                          onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            error={error}
                            id="email"
                            label="Email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            helperText={error ? 'Invalid credentials' : undefined}
                        />
                        <TextField
                            error={error}
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            helperText={error ? 'Invalid credentials' : undefined}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

