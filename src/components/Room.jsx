import {
    child,
    get,
    off,
    onValue,
    ref,
    set,
    update,
} from 'firebase/database';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Room = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [ticket, setTicket] = useState('');
    const [isModerator, setIsModerator] = useState(false);
    const [votingStarted, setVotingStarted] = useState(false);
    const [votes, setVotes] = useState({});
    const [showVotes, setShowVotes] = useState(false);

    const checkRoomExistence = async () => {
        try {
            const roomRef = ref(db,`rooms/${id}`);
            const snapshot = await get(roomRef);

            if (snapshot.exists()) {
                await update(child(roomRef, 'users'), {
                    [user.uid]: true
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

        const roomRef = ref(db,`rooms/${id}`);
        const usersRef = child(roomRef, 'users');
        const ticketRef = child(roomRef, 'ticket');
        const votesRef = child(roomRef, 'votes');

        const usersListener = onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const userList = Object.keys(usersData).map((userId) => ({
                    userId,
                    isModerator: usersData[userId].isModerator || false,
                }));

                setUsers(userList);
            }
        });

        const ticketListener = onValue(ticketRef, (snapshot) => {
            if (snapshot.exists()) {
                setTicket(snapshot.val());
            }
        });

        const votesListener = onValue(votesRef, (snapshot) => {
            if (snapshot.exists()) {
                setVotes(snapshot.val());
                setShowVotes(true);
            }
        });

        return () => {
            off(usersRef);
            off(ticketRef);
            off(votesRef);
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
        setShowVotes(false);
        setVotes({});
    };

    const handleSubmitTicket = () => {
        set(ref(db, `rooms/${id}/ticket`), ticket);
    };

    const handleVote = (vote) => {
        set(ref(db, `rooms/${id}/votes/${user.uid}`), vote);
    };

    const isVotingAllowed = user && user.uid && !votingStarted && ticket;

    return (
        <Box className="flex justify-center items-center text-center h-full">
            <div>
                <h2>Room: {id}</h2>
                <h3>Users in the Room:</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user.userId}>
                            {user.isModerator ? (
                                <>
                                    <span>{user.userId} (Moderator)</span>
                                    { isModerator ? <span>(You are the moderator)</span> : null }
                                </>
                            ) : (
                                <span>{user.userId}</span>
                            )}
                        </li>
                    ))}
                </ul>

                { isModerator && <input type="text" value={ticket} onChange={(e) => setTicket(e.target.value)} /> }
                { isModerator && <button onClick={handleSubmitTicket}>Submit Ticket</button> }

                { isModerator && (
                    <div>
                        <button onClick={handleStartVoting} disabled={!ticket || votingStarted}>
                            Start Voting
                        </button>
                        <button onClick={handleEndVoting} disabled={!votingStarted}>
                            End Voting
                        </button>
                        <button onClick={handleClearTicket}>Clear Ticket</button>
                    </div>
                )}

                { isVotingAllowed && (
                    <div>
                        <h3>Vote:</h3>
                        <button onClick={() => handleVote('Option A')}>Vote Option A</button>
                        <button onClick={() => handleVote('Option B')}>Vote Option B</button>
                    </div>
                )}

                { showVotes && (
                    <div>
                        <h3>Voting Results:</h3>
                        <ul>
                            {Object.keys(votes).map((userId) => (
                                <li key={userId}>
                                    {userId}: {votes[userId]}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Box>
    );
}

export default Room;