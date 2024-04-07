import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import friends from "../assets/friends.svg";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";

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

export default function FriendSuggestions() {
  const [suggestedFriends, setSuggestedFriends] = useState([
    { username: "emma_watson", fullname: "Emma Watson", following: false },
    { username: "pooja_hegde", fullname: "Pooja Hegde", following: false },
    { username: "eminem", fullname: "Marshal Mathers", following: false },
    { username: "akshaykumar", fullname: "Akshay Kumar", following: false },
    { username: "ava_32", fullname: "Ava", following: false },
    { username: "oliver_54", fullname: "Oliver", following: false },
    { username: "rupa_rajeshan", fullname: "Rupa Rajeshan", following: false },
    { username: "gany_varma", fullname: "Ganesh Verma", following: false },
    { username: "kiran_katore", fullname: "Kiran Katore", following: false },
    {
      username: "zeel_Fernandez",
      fullname: "Zeel Fernandez",
      following: false,
    },
  ]);
  const [modal, setModal] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const toggleFollow = (index: number) => {
    if (index !== -1) {
      const updatedList = [...suggestedFriends];
      updatedList[index] = {
        ...suggestedFriends[index],
        following: !suggestedFriends[index].following,
      };
      setSuggestedFriends(updatedList);
    } else {
      console.warn("Username not found in suggested friends list");
      setOpen(true);
      setModal("something went wrong");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            m: "15px 0 15px 25px",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: "bold", mr: "30px" }}
          >
            DENAURLEN
          </Typography>
          <Typography color="text.primary">Suggestions for you</Typography>
        </Box>
        <Typography
          sx={{ bgcolor: "background.paper", color: "background.paper" }}
        >
          .
        </Typography>
        <Typography
          sx={{ bgcolor: "background.paper", color: "background.paper" }}
        >
          .
        </Typography>
        <Box flex={1} sx={{ display: "flex" }}>
          <Box
            bgcolor="background.paper"
            flex={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={friends} width="350px" style={{ marginTop: "150px" }} />
            <p>“Good company in a journey makes the way seems shorter.”</p>
            <cite style={{ alignSelf: "flex-end", marginRight: "150px" }}>
              - Izzak Walton
            </cite>
          </Box>
          <Box flex={1} sx={{ display: "flex", flexDirection: "column" }}>
            <List>
              {suggestedFriends.map((sf, index) => (
                <ListItem key={nanoid()} sx={{ px: "120px", my: "20px" }}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary={sf.username} secondary={sf.fullname} />

                  <Box>
                    <Button
                      onClick={() => toggleFollow(index)}
                      variant={sf.following ? "outlined" : "contained"}
                    >
                      {sf.following ? "Following" : "Follow"}
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              sx={{ alignSelf: "center", my: "10px" }}
            >
              Next
            </Button>
            <Button sx={{ alignSelf: "center", my: "10px" }}>Skip</Button>
          </Box>
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
    </>
  );
}
