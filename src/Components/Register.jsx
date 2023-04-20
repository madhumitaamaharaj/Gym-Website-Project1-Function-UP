import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Style from "./Styles/Register.module.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import joi from "joi";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const schema = joi.object({
    name: joi.string().max(20).required(),
    email: joi.string(),
    password: joi.string().pattern(new RegExp("[a-zA-Z0-9]")),
  });

  const exist = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.find((ele, index) => {
      if (ele.email === details.email) {
        return false;
      }
    });
    return true;
  };
  const handleChange = () => {
    const values = [...data, details];
    setData(values);
    if (exist()) {
      schema
        .validateAsync(details)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(values));
          navigate("/login");
        })
        .catch((err) => alert(err));
    } else {
      alert("This email is already register!");
    }
  };
  return (
    <div className={Style.root}>
      <img
        src="https://images.pexels.com/photos/13811057/pexels-photo-13811057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        style={{
          zIndex: 1,
          objectFit: "cover",
          height: "90%",
          opacity: "0.5",
          translate: "-5rem",
        }}
      />
      <form>
        <Typography
          variant="h6"
          sx={{
            color: "red",
            textAlign: "center",
            alignSelf: "flex-start",
            fontWeight: "bold",
          }}
        >
          SIGN UP
        </Typography>
        <TextField
          name="name"
          label="Name"
          variant="filled"
          color="success"
          focused
          sx={{ input: { color: "white" } }}
          onChange={(e) => {
            setDetails({ ...details, [e.target.name]: e.target.value });
          }}
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="filled"
          color="success"
          focused
          sx={{ input: { color: "white" } }}
          onChange={(e) => {
            setDetails({ ...details, [e.target.name]: e.target.value });
          }}
        />
        <TextField
          name="password"
          label="Password"
          variant="filled"
          color="success"
          focused
          sx={{ input: { color: "white" } }}
          onChange={(e) => {
            setDetails({ ...details, [e.target.name]: e.target.value });
          }}
        />
        <Button
          type="submit"
          sx={{ alignSelf: "flex-start" }}
          variant="outlined"
          endIcon={<SendIcon />}
          onClick={(e) => {
            e.preventDefault();
            handleChange();
          }}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Register;
