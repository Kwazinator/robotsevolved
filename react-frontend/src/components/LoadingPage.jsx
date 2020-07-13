import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
}));

export default function LoadingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={120} color="secondary" />
    </div>
  );
}