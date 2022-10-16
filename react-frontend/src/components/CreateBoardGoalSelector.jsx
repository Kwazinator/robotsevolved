import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';

export default function CreateBoardGoalSelector(props) {
  const [wildchecked, setWildChecked] = React.useState(true);
  const handleWildCardClick = () => {
    props.handleWildCardClick();
    setWildChecked(wildchecked ? false : true);
  }

  const handleBlueClick = () => {
    props.handleColoredClick('blue');
  }
  const handleGreenClick = () => {
    props.handleColoredClick('green');
  }
  const handleRedClick = () => {
    props.handleColoredClick('red');
  }
  const handleYellowClick = () => {
    props.handleColoredClick('yellow');
  }
  return (
  <Paper style={{padding: 4}}>
    <FormControl style={{backgroundColor: 'white', textAlign: 'center'}} component="fieldset" variant={"standard"}>
      <FormLabel component="legend">Goal Selector</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="Wildcard"
          control={<Checkbox onClick={handleWildCardClick} checked={wildchecked} color="primary" />}
          label="wildcard"
          labelPlacement="end"
          disabled={!props.buildMode}
        />
        <FormControlLabel
          value="Blue"
          control={<Checkbox onClick={handleBlueClick} color="primary" />}
          label="blue"
          labelPlacement="end"
          disabled={!props.buildMode}
        />
        <FormControlLabel
          value="Green"
          control={<Checkbox onClick={handleGreenClick} color="primary" />}
          label="green"
          labelPlacement="end"
          disabled={!props.buildMode}
        />
        <FormControlLabel
          value="Red"
          control={<Checkbox onClick={handleRedClick} color="primary" />}
          label="red"
          labelPlacement="end"
          disabled={!props.buildMode}
        />
        <FormControlLabel
          value="Yellow"
          control={<Checkbox onClick={handleYellowClick} color="primary" />}
          label="yellow"
          labelPlacement="end"
          disabled={!props.buildMode}
        />
      </FormGroup>
    </FormControl>
    </Paper>
  );
}
