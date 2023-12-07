import { Typography,Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";

const Searchlist = () => {
  const loc = useLocation();
  console.log(loc.state.res)

  return (
    <div>
      {loc.state.res.map((item, index) => (
        <Box style={{ display:"flex", flexDirection:"column", marginBottom:"10px" }} key={index}>
          <Typography variant="h4">{item.firstName} {item.lastName}</Typography>
          <Typography variant="h6">{item.department} | {item.officeHours}</Typography>
          <Typography variant="h5">{item.coursesAssigned}</Typography>
        </Box>
      ))}
    </div>
  );
}

export default Searchlist;
