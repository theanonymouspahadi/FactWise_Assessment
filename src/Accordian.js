import React, { useState } from "react";
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,Avatar, Typography, TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import database from './database.json';
import Searchbar from "./Searchbar";

const Accordian = () => {
  const [data, setData] = useState(database);
  const [editing, setEditing] = useState(false);
  const [tempData, setTempData] = useState(data);
  const [searchQuery,setSearchQuery] = useState("");
  
const handleSearch = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  const filteredData = database.filter((item) =>
    item.first.toLowerCase().includes(query.toLowerCase())
  );
  setData(filteredData);
};


  function handleDelete(item) {
    const tempID = item.id;
    const newData = data.filter(item => item.id !== tempID);
    setData(newData);
  }

  function handleChange(id, field, newValue) {
    const newData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: newValue
        };
      } else {
        return item;
      }
    });
    setTempData(newData);
  }


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
          {data.map((item) => {
            let fullname = `${item.first} ${item.last}`;
            let age = calculateAge(`${item.dob}`);
            return (
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary>
                  <Avatar
                    variant="circle"
                    alt={item.first}
                    src={item.picture}
                  />
                  <Typography variant="h5">{fullname}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ flexDirection: "column" }}>
                  {editing ? (
                    <>
                      <TextField
                        label="Age"
                        variant="outlined"
                        defaultValue={age}
                      />
                      <TextField
                        label="Gender"
                        variant="outlined"
                        defaultValue={item.gender}
                        onChange={(e) =>
                          handleChange(item.id, "gender", e.target.value)
                        }
                      />
                      <TextField
                        label="Country"
                        variant="outlined"
                        defaultValue={item.country}
                        onChange={(e) =>
                          handleChange(item.id, "country", e.target.value)
                        }
                      />
                      <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        defaultValue={item.description}
                        style={{ marginTop: "10px" }}
                        onChange={(e) =>
                          handleChange(item.id, "description", e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Age: {age}</span>
                        <span>Gender: {item.gender}</span>
                        <span>Country: {item.country}</span>
                      </Typography>
                      <Typography>{item.description}</Typography>
                    </>
                  )}
                </AccordionDetails>
                <Box
                  sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  {!editing ? (
                    <>
                      <IconButton
                        color="success"
                        variant="outlined"
                        onClick={() => setEditing(true)}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>{" "}
                    </>
                  ) : (
                    <>
                      <IconButton
                        variant="outlined"
                        onClick={() => {
                          setEditing(false);
                        }}
                      >
                        <CancelOutlinedIcon color="error" />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        onClick={() => {
                          setData(tempData);
                          setEditing(false);
                        }}
                      >
                        <CheckCircleOutlineOutlinedIcon color="success" />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Accordion>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Accordian;

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}