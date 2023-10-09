import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Typography, TextField, Button } from '@mui/material';

const initialValue = dayjs('2022-04-17');

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, title, comment, setDate, ...other } = props;

  // Define an array of specific dates where you want to display the emoji
  const specificDates = ['2022-04-01', '2022-04-02', '2022-04-03'];

  // Check if the current date matches one of the specific dates
  const shouldDisplayEmoji = specificDates.includes(day.format('YYYY-MM-DD'));

  const handleDayClickWrapper = () => {
    handleDayClick(title, comment, day);
  };

  const handleDayClick = (title, comment, date) => {
    console.log(date.format('YYYY-MM-DD'));
    const formattedDate = date.format('YYYY-MM-DD');
    const holidayData = {
      date: formattedDate,
      title,
      comment,
    };

    // Set the selected date in the state
    setDate(formattedDate);

    console.log(holidayData);
    // You can perform any other action with the selected date here
  };

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : shouldDisplayEmoji ? '📅' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} onClick={handleDayClickWrapper} />
    </Badge>
  );
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3, 4, 5, 6]; // You can customize this array as needed

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [title, setTitle] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleSubmit = () => {
    // Access the title, comment, and selectedDate values here and perform your save action
    console.log("Title:", title);
    console.log("Comment:", comment);
    console.log("Selected Date:", selectedDate);

    const holiData = {
      title,
      comment,
      date: selectedDate
    }
    console.log(holiData);
    // You can perform any other action with these values here
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (props) => (
              <ServerDay
                title={title}
                comment={comment}
                setDate={setSelectedDate}
                {...props}
              />
            ),
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />
      </LocalizationProvider>
      <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography>Title</Typography>
        <TextField placeholder="Enter Title" size='small' value={title} onChange={(e) => setTitle(e.target.value)} />
        <Typography>Comment</Typography>
        <TextField placeholder="Enter Comment" size='small' value={comment} onChange={(e) => setComment(e.target.value)} />
        <Typography>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </Typography>
      </div>
    </>
  );
}
