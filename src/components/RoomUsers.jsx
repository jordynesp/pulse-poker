import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import React from 'react';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';

const RoomUsers = ({ users, showVotes }) => {
    return (
        <List>
            {users.map((user, index) => (
                <>
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar alt={user.displayName} src={user.photoURL}/>
                        </ListItemAvatar>
                        <ListItemText primary={user.displayName}/>
                        { user.isModerator && <StarTwoToneIcon color="primary"/> }
                        { user.voted && (
                            <>
                                { showVotes ? (
                                    <strong className="ml-1">{ user.voted }</strong>
                                ) : (
                                    <CheckBoxTwoToneIcon color="primary" className="ml-1"/>
                                )}
                            </>
                        )}
                    </ListItem>
                    { index !== users.length - 1 && <Divider component="li"/> }
                </>
            ))}
        </List>
    );
}

export default RoomUsers;