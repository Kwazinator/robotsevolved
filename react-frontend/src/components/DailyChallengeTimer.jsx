import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

function DailyChallengeTimer(props) {
  const calculateTimeLeft = () => {
    var dt = new Date();
    var year = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1, 2, 0, 0);
    const difference = +new Date(`${year}-10-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <span>
        {timeLeft[interval]}{':'}
      </span>
    );
  });

  return (
    <Typography variant="h4">
      {timerComponents.length ? timerComponents : 'Click Daily Challenge for new set...'}
    </Typography>
  );
}

export default DailyChallengeTimer;