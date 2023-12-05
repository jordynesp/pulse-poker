import {
    Box,
    Button,
    CircularProgress,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const JoinRoom = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const joinRoom = () => {
        navigate(`/room/${roomCode}`);
    };

    const navigateHome = () => {
        navigate('/');
    };

    return (
        <Box className="flex flex-col justify-center items-center text-center h-full">
            <Paper className="w-full max-w-lg p-10">

                { isLoading ? (
                    <CircularProgress size="4rem"/>
                ) : null }

                { !isLoading ? (
                    <>
                        <Typography gutterBottom variant="h5">
                            Join a Planning Poker Room
                        </Typography>
                        <TextField
                            label="Room Code"
                            variant="outlined"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <div className="flex justify-center items-center mt-6">
                            <Button fullWidth variant="outlined" onClick={navigateHome}>Cancel</Button>
                            <div className="w-4"/>
                            <Button fullWidth variant="contained" color="primary" style={{ color: 'white'}} onClick={joinRoom}>
                                Join Room
                            </Button>
                        </div>
                    </>
                ) : null }
            </Paper>
        </Box>
    );
}

export default JoinRoom;