import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const AccordionComponent = ({ item, handleDelete, setData }) => {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(item);

  const handleChange = (field, value) => {
    setTemp((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setData((prev) =>
      prev.map((element) => {
        if (element.id === item.id) {
          return temp;
        } else {
          return element;
        }
      })
    );
    setEditing(false);
  };

  let fullname = `${item.first} ${item.last}`;
  let age = calculateAge(`${item.dob}`);

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary>
        <Avatar variant="circle" alt={item.first} src={item.picture} />
        <Typography variant="h5">{fullname}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ flexDirection: "column" }}>
        {editing ? (
          <>
            <TextField
              label="Age"
              variant="outlined"
              defaultValue={age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
            <TextField
              label="Gender"
              variant="outlined"
              defaultValue={item.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
            <TextField
              label="Country"
              variant="outlined"
              defaultValue={item.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              defaultValue={item.description}
              style={{ marginTop: "10px" }}
              onChange={(e) => handleChange("description", e.target.value)}
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
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        {!editing ? (
          <>
            <IconButton
              color="success"
              variant="outlined"
              onClick={() => setEditing(true)}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(item)}>
              <DeleteForeverOutlinedIcon />
            </IconButton>{" "}
          </>
        ) : (
          <>
            <IconButton variant="outlined" onClick={() => setEditing(false)}>
              <CancelOutlinedIcon color="error" />
            </IconButton>
            <IconButton variant="outlined" onClick={handleSave}>
              <CheckCircleOutlineOutlinedIcon color="success" />
            </IconButton>
          </>
        )}
      </Box>
    </Accordion>
  );
};

export default AccordionComponent;

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
