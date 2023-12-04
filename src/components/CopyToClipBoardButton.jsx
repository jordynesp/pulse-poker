import { useState } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

const CopyToClipboardButton = ({ text }) => {
    const [open, setOpen] = useState(false)

    const handleClick = async () => {
        setOpen(true)
        await navigator.clipboard.writeText(text)
    }

    return (
        <>
            <IconButton color="primary" onClick={handleClick}>
                { open ? <CheckBoxTwoToneIcon /> : <ContentCopyTwoToneIcon /> }
            </IconButton>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </>
    )
}

export default CopyToClipboardButton