import React from 'react';
import { Box } from '@mui/material';
import SideBar from '../pages/Sidebar/Sidebar';

const Blog = () => {
  return (
    <>
    <Box sx={{display:'flex'}}>
      <SideBar/>
      <div>
        Blog
      </div>
    </Box>
    </>
  )
}

export default Blog
