import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import CopyToClipBoardButton from './CopyToClipBoardButton';

const CreateRoom = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    useEffect(() => {
        if (!isSignedIn) {
            navigate('/');
        }
    }, [isSignedIn]);

    const createNewRoom = () => {
        console.log('Room name:', roomName);

        setRoomCode('test code');
    };

    const resetRoom = () => {
        setRoomName('');
        setRoomCode('');
    }

    return (
        <Box className="flex flex-col justify-center items-center text-center h-full">
            <Paper className="w-full max-w-lg p-10">

                { !roomCode ? (
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
                        <Button fullWidth variant="contained" color="primary" onClick={createNewRoom}>
                            Create Room
                        </Button>
                    </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-cols justify-center items-center mb-6">
                            <Typography variant="h6" className="flex justify-center items-center text-center">
                                Share this room code:
                            </Typography>
                            <Typography>&nbsp;</Typography>
                            <Typography variant="h6" className="flex justify-center items-center text-center">
                                <strong>{ roomCode }</strong>
                                <CopyToClipBoardButton text={roomCode}/>
                            </Typography>
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <Button fullWidth variant="outlined" onClick={resetRoom}>New Room</Button>
                            <div className="w-4"/>
                            <Button fullWidth variant="contained">Join Room</Button>
                        </div>
                    </>
                )}

            </Paper>
        </Box>
    );
}

export default CreateRoom;