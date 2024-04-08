import { Navigate, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import { useNavigate } from 'react-router-dom';

import SignIn from "./pages/Signin";
import Categories from "./pages/Categories";
import FriendSuggestions from "./pages/FriendsSuggestions";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Modal, Typography } from "@mui/material";

const denaurlenTheme = createTheme({
  palette: {
    primary: {
      main: "#4B0082",
    },
    background: {
      paper: "#F7F2FF",
      default: "#FFFFFF",
    },
    text: {
      primary: "#343434",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontWeightRegular: 600,
    button: {
      textTransform: "none",
    },
  },
});

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

function App() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState<any>(false);
  const [modal, setModal] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const jsonValue = localStorage.getItem("denaurlen-token");

    if (jsonValue) {
      setVerified(true);
      setModal("you are verified Successfully");

    } else {
      navigate("/login");
    }
  }, []);

  return (
    <ThemeProvider theme={denaurlenTheme}>
      <Routes>
        <Route
          path="/"
          element={verified ? <Navigate to="/friends" /> : <Welcome />}
        />
        <Route
          path="/signup"
          element={verified ? <Navigate to="/friends" /> : <Signup />}
        />
        <Route
          path="/signin"
          element={verified ? <Navigate to="/friends" /> : <SignIn />}
        />
        <Route path="/interests" element={<Categories />} />
        <Route path="/friends" element={<FriendSuggestions />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
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
    </ThemeProvider>
  );
}

export default App;
