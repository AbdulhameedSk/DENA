import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { AppDispatch, registerUser } from "../slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import postRequest from "../slice/controllers";
import bg from "../assets/enterBg.svg";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import icon from "../assets/@.svg";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20)
    .min(1, { message: "it cannot be empty" }),
  lastName: z.string().trim().max(20).min(1, { message: "it cannot be empty" }),
  email: z.string().email().trim(),
  location: z.string().trim().min(1, { message: "it cannot be empty" }),
  username: z.string().trim().max(20).min(1, { message: "it cannot be empty" }),
  password: z
    .string()
    .trim()
    .max(20)
    .min(6, { message: "it needs at least 6 characters" }),
});
type FormFeilds = z.infer<typeof schema>;

export default function Signup() {
  const dispatch: AppDispatch = useDispatch();
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFeilds>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFeilds> = async (data: object) => {
    if (accepted) {
      try {
        const result = await postRequest("/check", data);
        if (result == "user doesnt exist") {
          dispatch(registerUser(data));
          navigate("/interests");
        } else {
          setOpen(true);
          setModal(result);
        }
      } catch (error: any) {
        setOpen(true);
        setModal(error);
      }
      console.log(data);
    } else {
      setOpen(true);
      setModal("please accept the Terms & Conditions");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100dvh",
        justifyContent: "space-evenly",
      }}
    >
      <CssBaseline />
      <Box
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ margin: "50px 225px 0" }}
        >
          <Typography
            variant="h4"
            mb={3}
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Sign Up
          </Typography>
          <Typography mb={6}>Connect & Collect..!</Typography>
          <Box>
            <Box sx={{ display: "flex", my: "20px" }}>
              <Box sx={{ display: "flex" }}>
                <img src={icon} />
                <TextField
                  size="small"
                  label="First Name"
                  variant="filled"
                  {...register("firstName")}
                  helperText={errors.firstName && errors.firstName.message}
                />
              </Box>
              <Box sx={{ display: "flex", ml: "30px" }}>
                <img src={icon} />
                <TextField
                  size="small"
                  label="Last Name"
                  variant="filled"
                  {...register("lastName")}
                  helperText={errors.lastName && errors.lastName.message}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", my: "20px" }}>
              <img src={icon} />
              <TextField
                size="small"
                fullWidth
                label="Email"
                variant="filled"
                {...register("email")}
                helperText={errors.email && errors.email.message}
              />
            </Box>
            <Box sx={{ display: "flex", my: "20px" }}>
              <img src={icon} />
              <TextField
                size="small"
                fullWidth
                label="Location"
                variant="filled"
                {...register("location")}
                helperText={errors.location && errors.location.message}
              />
            </Box>
            <Box sx={{ display: "flex", my: "20px" }}>
              <img src={icon} />
              <TextField
                size="small"
                fullWidth
                label="Username"
                variant="filled"
                {...register("username")}
                helperText={errors.username && errors.username.message}
              />
            </Box>
            <Box sx={{ display: "flex", my: "20px" }}>
              <Box sx={{ display: "flex" }}>
                <img src={icon} />
                <TextField
                  size="small"
                  label="Password"
                  variant="filled"
                  type="password"
                  {...register("password")}
                  helperText={errors.password && errors.password.message}
                />
              </Box>
              <Box sx={{ display: "flex", ml: "30px" }}>
                <img src={icon} />
                <TextField
                  size="small"
                  type="password"
                  label="Re-enter"
                  variant="filled"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ fontSize: "small", mb: "8px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={accepted}
                  onClick={() => setAccepted(!accepted)}
                />
              }
              label="Accept Terms & Conditions."
            />
            <Link to="">Click Here</Link>
          </Box>
          <Box display="flex" flexDirection="column">
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ py: "10px" }}
            >
              {isSubmitting ? "Loading..." : "Sign up"}
            </Button>
            <p style={{ fontWeight: 400, fontSize: "small" }}>
              Already a member of Denaurlen? <Link to="/signin">Sign in</Link>
            </p>
          </Box>
        </form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: 400,
            fontSize: "small",
          }}
        >
          <span>Privacy Policy </span>
          <span>Denaurlen Copyright @ 2024, All Rights Reserved</span>
        </Box>
      </Box>
      <Box
        flex={1}
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Box ml="150px">
          <Typography
            variant="h5"
            mb={2}
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            DENAURLEN
          </Typography>
          <Typography>Every dream has a demand..!</Typography>
        </Box>
        <img src={bg} alt="" style={{ alignSelf: "center" }} />
      </Box>
      {modal && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modal}
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
