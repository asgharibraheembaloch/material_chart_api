import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        margin: '0 auto',
        marginTop: 50
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    heading: {
        textAlign: 'center',
    }
}));

export default function InfoPanel() {
    const [globalData, setGlobalData] = useState({});
    useEffect(() => {
        async function getData() {
            const response = await fetch('https://api.thevirustracker.com/free-api?global=stats');
            let data = await response.json();
            delete data.results[0].source;
            setGlobalData(data.results[0])
            console.log(data.results[0]);
        }
        getData();
    }, []);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1 className={classes.heading}>Global Covid19 Health Statistics</h1>
            <Grid container spacing={3}>
                {Object.keys(globalData).map((name, ind) => {
                    return (                        
                        <Grid item xs={12} sm={4} key={ind}>
                            <Paper className={classes.paper} elevation={10}>
                                <h3> {name} </h3>
                                <h4> {globalData[name]} </h4>
                            </Paper>
                        </Grid>
                    )
                })
                }
            </Grid>
        </div>
    );
}
