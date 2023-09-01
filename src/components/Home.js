import { Box } from '@mui/material'
import React from 'react'
import SideBar from '../pages/Sidebar/Sidebar';

const Home = () => {
  return (
    <>
      <Box sx={{display: 'flex'}}>
        <SideBar/>
        <div>
          Home
        </div>
      </Box>
    </>
  )
}

export default Home
