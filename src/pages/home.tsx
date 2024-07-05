import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface UserDataType {
  name: string;
  phoneNo: string;
  email: string;
}

interface ErrorType {
  name: boolean;
  phoneNo: boolean;
  email: boolean;
}

const Home = () => {
  const navigate = useNavigate();
  // state to handle the user data field and its error state
  const [formData, setFormData] = useState<{
    user: UserDataType;
    error: ErrorType;
  }>({
    user: {
      name: "",
      phoneNo: "",
      email: "",
    },
    error: {
      name: false,
      phoneNo: false,
      email: false,
    },
  });

  // validate the input
  const validateInput = (field: string, value: string) => {
    switch (field) {
      case "name":
        return value.length < 3;
      case "phoneNo":
        return (
          value.length < 10 || value.length > 10 || !value.match(/^[0-9]+$/)
        );
      case "email":
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      default:
        return false;
    }
  };

  // function to handle the input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
      error: {
        ...prevData.error,
        [name]: validateInput(name, value),
      },
    }));
  };

  // function to submit the form
  const handleSubmit = () => {
    try {
      if (isComplete) {
        localStorage.setItem("user", JSON.stringify(formData.user));
        navigate("/data-viewer");
        toast.success(`Welcome ${formData.user.name} 🎉`);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // to make the button disabled or not
  const isComplete =
    !Object.values(formData.user).some((field) => field.trim() === "") &&
    !Object.values(formData.error).some((error) => error);

  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      alignItems="center"
    >
      <Card sx={{ minWidth: 375 }} variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            error={formData.error.name}
            inputMode="text"
            required
            id="name"
            name="name"
            value={formData.user.name}
            onChange={handleInput}
            label="Name"
            fullWidth
            helperText={formData.error.name && "Provide a valid name"}
          />
          <TextField
            error={formData.error.phoneNo}
            type="tel"
            inputMode="numeric"
            required
            id="phoneNo"
            name="phoneNo"
            value={formData.user.phoneNo}
            onChange={handleInput}
            label="Phone Number"
            fullWidth
            helperText={formData.error.phoneNo && "Provide valid mobile number"}
          />
          <TextField
            error={formData.error.email}
            type="email"
            inputMode="email"
            required
            id="email"
            name="email"
            value={formData.user.email}
            onChange={handleInput}
            label="Email"
            fullWidth
            helperText={formData.error.email && "Please provide valid email"}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="medium"
            color="success"
            onClick={handleSubmit}
            disabled={!isComplete}
          >
            Submit{" "}
            <ArrowForwardIosIcon
              style={{ height: "12px", width: "12px", marginLeft: "5px" }}
            />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Home;
