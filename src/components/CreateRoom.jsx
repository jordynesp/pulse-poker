import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';

import { useAuth } from './AuthContext';

const CreateRoom = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isSignedIn) {
            navigate('/');
        }
    }, [isSignedIn]);

    return (
        <Box className="flex justify-center items-center text-center h-full">
            <div> Create a Room </div>
        </Box>
    );
}

export default CreateRoom;