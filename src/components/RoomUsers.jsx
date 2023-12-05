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

const RoomUsers = ({ users }) => {
    return (
        <List>
            {users.map((user, index) => (
                <>
                    <ListItem key={user.uid}>
                        <ListItemAvatar>
                            <Avatar alt={user.displayName} src={user.photoURL}/>

                        </ListItemAvatar>
                        <ListItemText primary={user.displayName}/>
                        { user.isModerator && <StarTwoToneIcon color="primary"/> }
                    </ListItem>
                    { index !== users.length - 1 && <Divider component="li"/> }
                </>
            ))}
        </List>
    );
}

export default RoomUsers;