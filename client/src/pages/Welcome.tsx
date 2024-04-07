import bgImage from "../assets/welcome/bg.svg";
import firstImage from "../assets/welcome/1.svg";
import secondImage from "../assets/welcome/2.svg";
import thirdImage from "../assets/welcome/3.svg";
import Button from "@mui/material/Button";
import { Box, CssBaseline, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Welcome() {
  const features = [
    ["Activity to infinity", firstImage],
    ["One Platform Multiple Persona", secondImage],
    ["Real you, rewards for you!", thirdImage],
  ];
  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" mb={2} color="primary">
          Welcome to DENAURLEN
        </Typography>
        <Typography>Gamify with Smart Savvy Social Network</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          spacing: 2,
        }}
      >
        {features.map((f, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ marginBottom: "60px" }}>
              <span>{index + 1}</span>. {f[0]}
            </p>
            <img src={f[1]} alt="" />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained">
          <Link
            to="/signup"
            style={{
              color: "white",
            }}
          >
            Get Started
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
