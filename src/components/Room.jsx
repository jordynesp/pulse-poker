import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { get, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Room = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checkRoomExistence();
    }, [id]);

    const checkRoomExistence = async () => {
        try {
            const roomRef = ref(db,`rooms/${id}`);
            const snapshot = await get(roomRef);

            if (!snapshot.exists()) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error checking room existence:', error);
        }
    };

    return (
        <Box className="flex justify-center items-center text-center h-full">
            <div>Room ID: {id}</div>
        </Box>
    );
}

export default Room;