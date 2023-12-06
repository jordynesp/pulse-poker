import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {
    child,
    get,
    off,
    onValue,
    ref,
    set,
    update,
} from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { db } from '../firebase';
import RoomUsers from './RoomUsers';
import PokerCards from './PokerCards';
import { useAuth } from '../contexts/AuthContext';
import CopyToClipBoardButton from './CopyToClipBoardButton';

const Room = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState('');
    const [users, setUsers] = useState([]);
    const [ticket, setTicket] = useState('');
    const [ticketName, setTicketName] = useState('');
    const [moderatorId, setModeratorId] = useState(false);
    const [votingStarted, setVotingStarted] = useState(false);
    const [votes, setVotes] = useState({});
    const [showVotes, setShowVotes] = useState(false);

    const checkRoomExistence = async () => {
        try {
            const roomRef = ref(db,`rooms/${id}`);
            const snapshot = await get(roomRef);

            if (snapshot.exists()) {
                const roomData = snapshot.val();
                const name = roomData.roomName || '';
                setRoomName(name);

                await update(child(roomRef, 'users'), {
                    [user.uid]: {
                        displayName: user.displayName || '',
                        photoURL: user.photoURL || '',
                    },
                });
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error checking room existence:', error);
        }
    };

    useEffect(() => {
        checkRoomExistence();
    }, []);

    useEffect(() => {
        const roomRef = ref(db,`rooms/${id}`);
        const moderatorRef = child(roomRef, 'moderator');
        const usersRef = child(roomRef, 'users');
        const ticketRef = child(roomRef, 'ticket');
        const votesRef = child(roomRef, 'votes');
        const votingStartedRef = child(roomRef, 'votingStarted');

        onValue(moderatorRef, (snapshot) => {
            const moderatorId = snapshot.val();
            setModeratorId(moderatorId);
        });

        onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const userList = Object.keys(usersData).map((userId) => ({
                    uid: userId,
                    displayName: usersData[userId].displayName,
                    photoURL: usersData[userId].photoURL,
                    isModerator: userId === moderatorId,
                }));

                setUsers(userList);
            }
        });

        onValue(ticketRef, (snapshot) => {
            if (snapshot.exists()) {
                setTicket(snapshot.val());
            }
        });

        onValue(votesRef, (snapshot) => {
            if (snapshot.exists()) {
                setVotes(snapshot.val());
                setShowVotes(true);
            }
        });

        onValue(votingStartedRef, (snapshot) => {
            if (snapshot.exists()) {
                setVotingStarted(snapshot.val());
            }
        });

        return () => {
            off(moderatorRef);
            off(usersRef);
            off(ticketRef);
            off(votesRef);
            off(votingStartedRef);
        };
    }, [id, user.uid]);

    const handleStartVoting = () => {
        set(ref(db, `rooms/${id}/votingStarted`), true);
    };

    const handleEndVoting = () => {
        set(ref(db, `rooms/${id}/votingStarted`), false);
        setShowVotes(true);
    };

    const handleClearTicket = () => {
        set(ref(db, `rooms/${id}/ticket`), '');
        set(ref(db, `rooms/${id}/votes`), '');
        set(ref(db, `rooms/${id}/votingStarted`), false);
        setTicketName('');
        setShowVotes(false);
        setVotes({});
    };

    const handleSubmitTicket = () => {
        set(ref(db, `rooms/${id}/ticket`), ticketName);
    };

    const handleVote = (vote) => {
        set(ref(db, `rooms/${id}/votes/${user.uid}`), vote);
    };

    return (
        <Box className="text-center h-full">
            <Box className="flex justify-center items-center w-full">
                <Paper className="w-full m-6 p-6">
                    <Typography noWrap variant="h5" align="center">
                        <strong>{ roomName }</strong>
                    </Typography>
                </Paper>
            </Box>

            <Box className="h-3/4">
                <Grid container className="h-full">
                    <Grid item xs={4}>
                        <Paper className="mx-6 p-2">
                            <Typography variant="subtitle1" className="flex justify-between items-center text-center pl-1">
                                { id }
                                <CopyToClipBoardButton text={id}/>
                            </Typography>
                        </Paper>

                        <Paper className="mx-6 mt-6">
                            <RoomUsers users={users}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={8}>
                        <Paper className="flex flex-col justify-center items-center ml-1 mr-6 h-full">
                            <div className="flex flex-col justify-center items-center w-2/3">
                                { !ticket && moderatorId === user.uid && (
                                    <>
                                        <TextField
                                            label="Ticket Title"
                                            variant="outlined"
                                            value={ticketName}
                                            onChange={(e) => setTicketName(e.target.value)}
                                            fullWidth
                                        />
                                        <div className="flex justify-center items-center w-full mt-6">
                                            <Button fullWidth variant="outlined" onClick={handleClearTicket}>Clear Ticket</Button>
                                            <div className="w-4"/>
                                            <Button fullWidth variant="contained" color="primary" style={{ color: 'white'}} onClick={handleSubmitTicket}>
                                                Create Ticket
                                            </Button>
                                        </div>
                                    </>
                                )}

                                { !ticket && moderatorId !== user.uid && (
                                    <Typography variant="h5">
                                        Waiting for room moderator to create ticket...
                                    </Typography>
                                )}

                                { ticket && (
                                    <>
                                        <div className="w-10/12">
                                            <Typography gutterBottom variant="h5">
                                                <strong>Ticket:</strong> {ticket}
                                            </Typography>
                                            <PokerCards handleVote={handleVote} votingStarted={votingStarted} />
                                        </div>

                                        { moderatorId === user.uid && (
                                            <div className="flex justify-center items-center w-10/12 mt-6">
                                                <Button fullWidth variant="outlined" onClick={handleClearTicket}>Clear Ticket</Button>
                                                <div className="w-4"/>
                                                { !votingStarted ? (
                                                    <Button fullWidth variant="contained" color="primary" style={{ color: 'white'}} onClick={handleStartVoting}>
                                                        Start Voting
                                                    </Button>
                                                ) : (
                                                    <Button fullWidth variant="contained" color="primary" style={{ color: 'white'}} onClick={handleEndVoting}>
                                                        End Voting
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Room;