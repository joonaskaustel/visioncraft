import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, Grid} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {LocalUserInterface} from "../../interfaces/localUser.interface";

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

export default function Home() {
    const history = useHistory();
    const gridClasses = gridStyles();

    const localUser: string | null = localStorage.getItem('user');
    let signedIn: LocalUserInterface | null = null;

    if (localUser) {
        signedIn = JSON.parse(localUser);
    }

    const redirect = (loc: 'login' | 'register') => {
        history.push(`/${loc}`);
    }

    const logout = () => {
        localStorage.clear();
        history.go(0);
    }

    return (
        <div className={gridClasses.root}>
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={6}>
                    <h2>Home</h2>
                    {/*should be put in separate component for readability*/}
                    {
                        signedIn
                            ? (
                                <span>
                                    <div>Hello {signedIn.user.firstName}</div>
                                    <br/>
                                    <div>
                                        <Button variant="contained" color="primary" onClick={() => logout()}>
                                            Log out
                                        </Button>
                                    </div>
                                </span>
                                )
                            : (
                                <span>
                                    <div>Please sign in or register</div>
                                    <br/>
                                    <div>
                                        <Button variant="contained" color="primary" onClick={() => redirect('login')}>
                                            Login
                                        </Button>
                                    </div>
                                    <br/>
                                    <div>
                                        <Button variant="contained" color="secondary" onClick={() => redirect('register')}>
                                            Register
                                        </Button>
                                    </div>
                                </span>
                            )
                    }
                </Grid>
            </Grid>
        </div>
    );
}

