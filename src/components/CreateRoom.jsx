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
import { push, ref, set } from 'firebase/database';

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import CopyToClipBoardButton from './CopyToClipBoardButton';

const CreateRoom = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const createNewRoom = async () => {
        setIsLoading(true);

        try {
            const roomsRef = ref(db, 'rooms');
            const newRoomRef = push(roomsRef);
            const newRoomCode = newRoomRef.key;

            await set(newRoomRef, {
                roomName: roomName,
                moderator: user.uid,
            });

            setRoomCode(newRoomCode);
            setRoomName('');
        } catch (error) {
            console.error('Error creating room:', error);
        }

        setIsLoading(false);
    };

    const resetRoom = () => {
        setRoomName('');
        setRoomCode('');
    }

    const joinRoom = () => {
        navigate(`/room/${roomCode}`);
    }

    return (
        <Box className="flex flex-col justify-center items-center text-center h-full">
            <Paper className="w-full max-w-lg p-10">

                { isLoading ? (
                    <CircularProgress size="4rem"/>
                ) : null }

                { !isLoading && !roomCode ? (
                    <>
                    <Typography gutterBottom variant="h5">
                        Create a New Planning Poker Room
                    </Typography>
                    <TextField
                        label="Room Name"
                        variant="outlined"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <div className="mt-6">
                        <Button fullWidth variant="contained" color="primary" style={{ color: 'white'}} onClick={createNewRoom}>
                            Create Room
                        </Button>
                    </div>
                    </>
                ) : null}

                { !isLoading && roomCode ? (
                    <>
                        <Typography variant="h6" className="flex justify-center items-center text-center">
                            Share this room code:
                        </Typography>
                        <Typography variant="h6" className="flex justify-center items-center text-center">
                            <strong>{ roomCode }</strong>
                            <CopyToClipBoardButton text={roomCode}/>
                        </Typography>
                        <div className="flex justify-center items-center mt-6">
                            <Button fullWidth variant="outlined" onClick={resetRoom}>New Room</Button>
                            <div className="w-4"/>
                            <Button fullWidth variant="contained" style={{ color: 'white'}} onClick={joinRoom}>Join Room</Button>
                        </div>
                    </>
                ) : null}

            </Paper>
        </Box>
    );
}

export default CreateRoom;