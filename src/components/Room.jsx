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
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';

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
    const [votingStarted, setVotingStarted] = useState(false);
    const [votes, setVotes] = useState([]);
    const [showVotes, setShowVotes] = useState(false);
    const [isModerator, setIsModerator] = useState(false);

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
                        isModerator: user.uid === roomData['moderator'],
                        voted: false,
                    },
                });

                setIsModerator(user.uid === roomData['moderator']);
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
        const usersRef = child(roomRef, 'users');
        const ticketRef = child(roomRef, 'ticket');
        const votesRef = child(roomRef, 'votes');
        const votingStartedRef = child(roomRef, 'votingStarted');
        const showVotesRef = child(roomRef, 'showVotes');

        onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const userList = Object.keys(usersData).map((userId) => ({
                    uid: userId,
                    displayName: usersData[userId].displayName,
                    photoURL: usersData[userId].photoURL,
                    isModerator: usersData[userId].isModerator,
                    voted: usersData[userId].voted,
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
                setVotes(convertVotesToChartData(snapshot.val()));
            }
        });

        onValue(votingStartedRef, (snapshot) => {
            if (snapshot.exists()) {
                setVotingStarted(snapshot.val());
            }
        });

        onValue(showVotesRef, (snapshot) => {
            if (snapshot.exists()) {
                setShowVotes(snapshot.val());
            }
        });

        return () => {
            off(usersRef);
            off(ticketRef);
            off(votesRef);
            off(votingStartedRef);
            off(showVotesRef);
        };
    }, [id, user.uid]);

    const handleStartVoting = async () => {
        await clearVotes();
        set(ref(db, `rooms/${id}/votes`), '');
        set(ref(db, `rooms/${id}/votingStarted`), true);
        set(ref(db, `rooms/${id}/showVotes`), false);
    };

    const handleEndVoting = () => {
        set(ref(db, `rooms/${id}/votingStarted`), false);
        set(ref(db, `rooms/${id}/showVotes`), true);
    };

    const handleClearTicket = async () => {
        set(ref(db, `rooms/${id}/ticket`), '');
        set(ref(db, `rooms/${id}/votes`), '');
        set(ref(db, `rooms/${id}/votingStarted`), false);
        set(ref(db, `rooms/${id}/showVotes`), false);
        await clearVotes();
        setTicketName('');
    };

    const clearVotes = async () => {
        const roomRef = ref(db, `rooms/${id}/users`);
        const snapshot = await get(roomRef);

        if (snapshot.exists()) {
            const usersData = snapshot.val();
            Object.keys(usersData).forEach((uid) => {
                update(child(roomRef, uid), {
                    voted: false,
                });
            });
        }
    }

    const handleSubmitTicket = () => {
        set(ref(db, `rooms/${id}/ticket`), ticketName);
    };

    const handleVote = (vote) => {
        set(ref(db, `rooms/${id}/votes/${user.uid}`), vote);
        set(ref(db, `rooms/${id}/users/${user.uid}/voted`), vote);
    };

    const convertVotesToChartData = (votes) => {
        const voteCounts = {};

        Object.values(votes).forEach((value) => {
            voteCounts[value] = (voteCounts[value] || 0) + 1;
        });

        return Object.entries(voteCounts).map(([value, count], index) => ({
            id: index,
            value: count,
            label: `${value}`,
        }))
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
                            <Typography noWrap variant="subtitle1" className="flex justify-between items-center text-center pl-1">
                                { id }
                                <CopyToClipBoardButton text={id}/>
                            </Typography>
                        </Paper>

                        <Paper className="mx-6 mt-6">
                            <RoomUsers users={users} showVotes={showVotes}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={8}>
                        <Paper className="flex flex-col justify-center items-center ml-1 mr-6 h-full">
                            <div className="flex flex-col justify-center items-center w-2/3">
                                { !ticket && isModerator && (
                                    <div className="w-10/12">
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
                                    </div>
                                )}

                                { !ticket && !isModerator && (
                                    <Typography variant="h5">
                                        Waiting for room moderator to create ticket...
                                    </Typography>
                                )}

                                { ticket && !showVotes && (
                                    <div className="w-10/12">
                                        <Typography gutterBottom variant="h5">
                                            <strong>Ticket:</strong> {ticket}
                                        </Typography>
                                        <PokerCards handleVote={handleVote} votingStarted={votingStarted} />
                                    </div>
                                )}

                                { ticket && showVotes && (
                                    <div className="flex justify-center items-center w-10/12">
                                        { votes.length > 0 ? (
                                            <PieChart
                                                series={[{
                                                    data: votes,
                                                    arcLabel: (item) => `${item.label}`,
                                                    highlightScope: {faded: 'global', highlighted: 'item'},
                                                    faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
                                                }]}
                                                width={400}
                                                height={200}
                                                margin={{ left: 95 }}
                                                slotProps={{
                                                    legend: {
                                                        hidden: true,
                                                        position: { vertical: 'bottom', horizontal: 'middle' },
                                                    },
                                                }}
                                                sx={{
                                                    [`& .${pieArcLabelClasses.root}`]: {
                                                        fill: 'white',
                                                        fontWeight: 'bold',
                                                        fontSize: '2rem',
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <Typography gutterBottom variant="h5">
                                                No votes submitted
                                            </Typography>
                                        )}
                                    </div>
                                )}

                                { ticket && isModerator && (
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
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Room;