import { Box } from "@mui/system";
import React from "react";
// import {searchResults} from "./index.js";
import { useLocation } from "react-router";

const Searchlist = () => {
   const loc = useLocation();
   console.log(loc.state.res)

    return (
   
    <div>
    <h1>{loc.state.res[0].firstName}</h1>
    <h1>{loc.state.res[0].lastName}</h1>
    <h1>{loc.state.res[0].department}</h1> 
    
    
    <h1>{loc.state.res[1].firstName}</h1>
    <h1>{loc.state.res[1].lastName}</h1>
    <h1>{loc.state.res[1].department}</h1>
   
    </div>

      );
}
 
export default Searchlist;