import "./App.css";
import  AccordionComponent  from "./Accordian";
import { useState } from "react";
import database from "./database.json";
import { Grid, Box } from "@mui/material";

import Searchbar from "./Searchbar";

function App() {
  const [data, setData] = useState(database);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = database.filter((item) =>
      item.first.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  const handleDelete = (item) => {
    const tempID = item.id;
    const newData = data.filter((item) => item.id !== tempID);
    setData(newData);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
      spacing={2}
    >
      <Grid item>
        <Box width={900}>
          <Searchbar value={searchQuery} onChange={handleSearch} />
          {data.map((item) => (
            <AccordionComponent
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              setData={setData}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
