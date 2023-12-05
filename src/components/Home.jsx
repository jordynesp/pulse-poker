import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

import SignIn from './SignIn';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const { isLoading, user } = useAuth();
    const navigate = useNavigate();

    const navigateCreate = () => {
        navigate('/create');
    };

    const navigateJoin = () => {
        navigate('/join');
    };

    return (
        <Box className="flex justify-center items-center text-center h-full">

            { isLoading ? (
                <CircularProgress size="4rem"/>
            ) : null }

            { !isLoading && user ? (
                <>
                    <Card className="flex w-2/5 h-2/3 mr-6 p-2">
                        <CardActionArea onClick={navigateCreate}>
                            <CardContent>
                                <AddBoxTwoToneIcon color="primary" style={{ fontSize: '8rem'}}/>
                                <Typography className="py-1" variant="h5" component="div">
                                    Create a Room
                                </Typography>
                                <Typography className="px-20" variant="body2" color="text.secondary">
                                    Start a dedicated poker-planning room to foster teamwork and streamline planning efforts
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card className="flex w-2/5 h-2/3 ml-6 p-2">
                        <CardActionArea onClick={navigateJoin}>
                            <CardContent>
                                <MeetingRoomTwoToneIcon color="primary" style={{ fontSize: '8rem'}}/>
                                <Typography className="py-1" variant="h5" component="div">
                                    Join a Room
                                </Typography>
                                <Typography className="px-20" variant="body2" color="text.secondary">
                                    Step into an active poker-planning room and engage in meaningful team decision-making
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </>
            ) : null }

            { !isLoading && !user ? (
                <SignIn />
            ) : null}

        </Box>
    );
}

export default Home;