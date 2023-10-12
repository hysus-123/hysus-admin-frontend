import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Autorenew, PlayArrow, Pause, Timelapse, Done } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import countdown from "countdown";

const styles = (theme) => ({
  Button: {
    margin: 10,
    "@media screen and (min-width: 600px)": {
      margin: 20,
    },
  },
  Paper: {
    "@media screen and (max-width: 600px)": {
      marginTop: 60,
    },
    marginTop: 70,

    paddingTop: 30,
    paddingBottom: 96,
    textAlign: "center",
    minHeight: "90vh",
  },
  Typography: {
    height: 50,
    margin: 20,
  },
  IconButton: {
    margin: 5,
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 10,
    "@media screen and (min-width: 360px)": {
      flexDirection: "row",
    },
  },
  TextField: {
    width: 200,
    margin: 25,
    "@media screen and (min-width: 600px)": {
      margin: 20,
    },
  },
  Card: {
    maxWidth: 300,
    margin: "0 auto",
    "@media screen and (min-width: 600px)": {
      maxWidth: 500,
    },
  },
});

const CountdownComponent = ({
  classes,
  currentCountdown,
  handleChangeTimeManually,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(100);
  const [timerId, setTimerId] = useState(0);
  const [reminder, setReminder] = useState(0);
  const [tsMin, setTsMin] = useState(0);
  const [tsSec, setTsSec] = useState(0);
  const [manualTime, setManualTime] = useState(0);

  const addMinutes = (minutes, seconds) =>
    new Date(new Date().getTime() + minutes * 60000 + seconds * 1000);

  const initiateCountdown = () => {
    const deadline =
      tsMin === 0 && tsSec === 0
        ? addMinutes(currentCountdown, 0)
        : addMinutes(tsMin, tsSec);

    const newTimerId = countdown(
      deadline,
      (ts) => {
        progressCountdown(ts);
        checkIfFinished();
      },
      countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );

    setTimerId(newTimerId);
    setIsRunning(true);
  };

  const progressCountdown = (ts) => {
    const timeLeft = ts.minutes * 60 + ts.seconds;
    const currentCountdownSeconds = currentCountdown * 60;

    setCurrentPercentage(
      ((currentCountdownSeconds - (currentCountdownSeconds - timeLeft)) /
        currentCountdownSeconds) *
        100
    );
    setTsMin(ts.minutes);
    setTsSec(ts.seconds);
  };

  const checkIfFinished = () => {
    const fiveMin = 50000;

    if (tsMin === 0 && tsSec === 0 && isRunning === true) {
      // const audio = new Audio(Beep);
      // audio.play();

      clearTimer();
      setReminder(setInterval(() => console.log("ok")));
    }
  };

  const clearTimer = (cb) => {
    window.clearInterval(timerId);
    setTimerId(0);
    setIsRunning(false);
    if (cb) cb();
  };

  const clearReminder = () => {
    window.clearInterval(reminder);
    setReminder(0);
  };

  const handleStartPause = () => {
    clearReminder();
    clearTimer(() => {
      if (!isRunning) initiateCountdown();
    });
  };

  const handleReset = () => {
    clearReminder();
    clearTimer(() => {
      setTsMin(0);
      setTsSec(0);
      initiateCountdown();
    });
  };

  useEffect(() => {
    if (currentCountdown !== currentCountdown) {
      handleReset();
    }
  }, [currentCountdown]);

  return (
    <Paper className={classes.Paper}>
      <Card className={classes.Card}>
        <CardContent>
          <CircularProgress
            height={50}
            size={250}
            color="secondary"
            variant="static"
            thickness={1}
            value={currentPercentage}
          />

          <Typography
            className={classes.Typography}
            variant="h4"
            color="inherit"
            id="countdown"
          >
            {reminder === 0
              ? `${tsMin}min - ${tsSec}s`
              : `Reminder set to 1min`}
          </Typography>
        </CardContent>
      </Card>
      <br />
      <Button
        className={classes.Button}
        variant="contained"
        color="primary"
        onClick={handleStartPause}
      >
        <PlayArrow className={classes.IconButton} />
        Start / Pause
        <Pause className={classes.IconButton} />
      </Button>
      <Button
        className={classes.Button}
        variant="contained"
        color="default"
        onClick={handleReset}
      >
        <Autorenew className={classes.IconButton} />
        Reset
      </Button>
      <form
        noValidate="noValidate"
        autoComplete="off"
        className={classes.Form}
        onSubmit={(e) => {
          e.preventDefault();
          handleChangeTimeManually(manualTime);
          setManualTime(0);
          const inputField = document.querySelector("#time");
          inputField.value = "";
        }}
      >
        <TextField
          id="time"
          label="How many minutes?"
          helperText="values between 0 and 60 accepted"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Timelapse />
              </InputAdornment>
            ),
          }}
          className={classes.TextField}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (isNaN(value) || value >= 60) {
              return;
            } else {
              setManualTime(value);
            }
          }}
          margin="normal"
        />
        <Button
          type="submit"
          color="default"
          variant="contained"
          className={classes.Button}
        >
          <Done />
        </Button>
      </form>
    </Paper>
  );
};

export default withStyles(styles)(CountdownComponent);
