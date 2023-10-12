import React from 'react';
import { Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import './HorizontalDropDown.css'; // Import your CSS file
import axios from 'axios';

function App(props) {
  const [color, setColor] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); // State to store the selected class

  console.log(props.name, "props.name");

  useEffect(()=>{
    getStatus();
  })

  const getStatus = () =>{
    axios.get(`${base_url}/attendance`)
    .then((response)=>{
      console.log(response);
      switch (response.data.presentStatus) {
        case "absent":
          setSelectedClass("absent");
          break;
        case "present":
          setSelectedClass("present");
          break;
        case "halfday":
          setSelectedClass("halfday");
          break;
        case "leave":
          setSelectedClass("leave");  
          break;
        default:
          setSelectedClass("");
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const base_url = process.env.REACT_APP_BASE_URL

  const handleChange = (event) => {
    setColor(event.target.value);
    console.log(event.target.value, "event.target.value");
    console.log(props.name,"props inside handlechange");
    const attendData ={
      presentStatus: event.target.value,
      employee : props.name
    }

    axios.post(`${base_url}/attendance`,attendData)
    .then((response)=>{
      console.log(response, "response");
      console.log(response.data.presentStatus, "response.data.presentStatus");
      switch (response.data.presentStatus) {
        case "absent":
          setSelectedClass("absent");
          break;
        case "present":
          setSelectedClass("present");
          break;
        case "halfday":
          setSelectedClass("halfday");
          break;
        case "leave":
          setSelectedClass("leave");  
          break;
        default:
          setSelectedClass("");
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div >
      <Select
        value={color}
        onChange={handleChange}
        className={selectedClass}
      >
        <MenuItem value="absent" >Absent</MenuItem>
        <MenuItem value="present">Present</MenuItem>
        <MenuItem value="halfday">Half Day</MenuItem>
        <MenuItem value="leave">Leave</MenuItem>
      </Select>
    </div>
  );
}

export default App;
