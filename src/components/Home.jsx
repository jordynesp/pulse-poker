import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material';
import React from 'react';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

import SignIn from './SignIn';
import { useAuth } from './AuthContext';

const Home = () => {
    const { isSignedIn } = useAuth();

    return (
        <>
            { isSignedIn ? (
                <Box className="flex justify-center items-center text-center h-full">
                    <Card className="flex w-2/5 h-2/3 mr-6 p-2">
                        <CardActionArea>
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
                        <CardActionArea>
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
                </Box>
            ) : (
                <SignIn />
            )}
        </>
    );
}

export default Home;