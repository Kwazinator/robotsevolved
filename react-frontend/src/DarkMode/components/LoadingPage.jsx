import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Loading} from 'arwes';

export default function LoadingPage() {
  return (
    <div>
            <Loading animate layer='success' full />
    </div>
  );
}