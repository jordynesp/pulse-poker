import React from 'react';
import { Box, Button } from '@mui/material';

import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
    const { signIn } = useAuth();

    return (
        <Box className="flex justify-center items-center text-center h-full">
            <Button onClick={ signIn }> Click to sign in</Button>
        </Box>
    );
}

export default SignIn;