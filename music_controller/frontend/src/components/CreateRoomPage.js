import React from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {Link} from "react-router-dom";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import   { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Collapse} from "@mui/material"
import {Alert} from "@mui/material"
import ytblogo from "../assets/youtubelogo.svg"
import spotifylogo from "../assets/spotify.png"

export default function CreateRoomPage(props) {
  const {
    votesToSkip = 2,
    guestCanPause = true,
    update = false,
    roomCode = null,
    name = ''
  } = props;

  const [statusMsg, setMsg] = useState("");

  const title = props.update ? "Update Room" : "Create A Room";

  const [guestCanPauseState, setGuestCanPause] = useState(guestCanPause);
  const [votesToSkipState, setVotesToSkip] = useState(votesToSkip);
  const [nameState, setNameState ] = useState(name)

  const navigate = useNavigate();

  const handleVotesChange = (e) => {
    setVotesToSkip(parseInt(e.target.value));
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value);
  };

  const handleCreateRoomButton = (e) => {
    let platform = e.currentTarget.value;
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host_name: nameState,
        votes_to_skip: votesToSkipState,
        guest_can_pause: guestCanPauseState,
        platform: platform
      })
    };
    if (platform === "spotify") {
      fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => navigate(`/room/spotify/${data.code}`))
        .catch((error) => console.error('Error:', error));
    }
    if (platform === "youtube") {
      fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          navigate(`/room/youtube/${data.code}`);
          window.open('https://www.youtube.com', '_blank');
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  const handleUpdateRoomButton = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkipState,
        guest_can_pause: guestCanPauseState,
        code: roomCode
      })
    };

    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          setMsg("Room updated successfully");
        } else {
          setMsg("Error updating room...");
        }
      });
  };

  function handleNameChange(e) {
    setNameState(e.target.value)
  }

  
  function renderCreateRoomButton() {
    return (
      <Grid container spacing={2} alignItems={"center"} justifyContent={'center'}>
        <Grid item xs={12} align="center">
          <Button
            onClick={update ? handleUpdateRoomButton : handleCreateRoomButton}
            sx={{
              bgcolor: '#0099FF',
              boxShadow: 2,
              borderRadius: 2,
              mt: 2,
              color: 'white',
              '&:hover': {
                bgcolor: '#007acc',
              },
              '& img': {
                marginLeft: '10px',
                marginRight: '5px',
                width: '20px',
                height: '20px',
              },
            }}
            value="spotify"
          >
            Continue with Spotify
            <img src={spotifylogo} alt="Spotify Logo" />
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            onClick={update ? handleUpdateRoomButton : handleCreateRoomButton}
            sx={{
              bgcolor: '#0099FF',
              boxShadow: 2,
              borderRadius: 2,
              color: 'white',
              '&:hover': {
                bgcolor: '#007acc',
              },
              '& img': {
                marginLeft: '10px',
                marginRight: '5px',
                width: '20px',
                height: '20px',
              },
            }}
            value="youtube"
          >
            Continue with YouTube Music
            <img src={ytblogo} alt="YouTube Logo" />
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  function renderUpdateRoomButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          onClick={update ? handleUpdateRoomButton : handleCreateRoomButton}
          sx={{
            bgcolor: '#1DB954',
            boxShadow: 2,
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#1ed760',
            },
          }}
        >
          Update Room
        </Button>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ position: 'absolute', top: 0, width: '100%' }}>
        <Collapse in={statusMsg}>
          <Alert
            severity={statusMsg === "Room updated successfully" ? "success" : "error"}
            onClose={() => setMsg("")}
            sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
          >
            {statusMsg}
          </Alert>
        </Collapse>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4" color={"white"}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value={true}
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
              sx={{ '& .MuiFormControlLabel-label': { color: 'white' } }}
            />
            <FormControlLabel
              value={false}
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
              sx={{ '& .MuiFormControlLabel-label': { color: 'white' } }}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={votesToSkipState}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            onChange={handleVotesChange}
            sx={{
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiFormHelperText-root': {
                color: 'white',
              },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
        <br></br>
        <br></br>
        <FormControl>
          <TextField
            required={true}
            type="string"
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            onChange={handleNameChange}
            placeholder="Eg. John"
            sx={{
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiFormHelperText-root': {
                color: 'white',
              },
            }}
          />
          <FormHelperText>
            <div align="center">Enter Your Name</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <br></br>
      {props.update ? renderUpdateRoomButton() : renderCreateRoomButton()}
    </Grid>
  );
}