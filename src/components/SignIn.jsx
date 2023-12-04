import { Box, Button } from '@mui/material';
import React from 'react';

import { useAuth } from './AuthContext';

const SignIn = () => {
    const { signIn } = useAuth();

    return (
        <Box className="flex justify-center items-center text-center h-full">
            <Button onClick={ signIn }> Click to sign in</Button>
        </Box>
    );
}

export default SignIn;