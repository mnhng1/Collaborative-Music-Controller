// HomePage.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";




function RenderHomePage() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join-room" component={Link}>Join A Room</Button>
                    <Button color="secondary" to="/create-room" component={Link}>Create A Room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}

export default function HomePage(props) {
    return (
        <Routes>
            <Route exact path="/" element={<RenderHomePage />} />
            <Route path="/create-room" element={<CreateRoomPage />} />
            <Route path="/join-room" element={<JoinRoomPage />} />
            <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
    );
}

