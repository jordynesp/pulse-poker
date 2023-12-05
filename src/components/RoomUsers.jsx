import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
} from '@mui/material';
import React from 'react';

const RoomUsers = ({ users }) => {
    return (
        <Paper className="w-full max-w-xs">
            <List>
                {users.map((user, index) => (
                    <>
                        <ListItem key={user.uid}>
                            <ListItemAvatar>
                                <Avatar alt={user.displayName} src={user.photoURL} />
                            </ListItemAvatar>
                            <ListItemText primary={user.displayName}/>
                        </ListItem>
                        { index !== users.length - 1 && <Divider component="li" /> }
                    </>
                ))}
            </List>
        </Paper>
    );
}

export default RoomUsers;