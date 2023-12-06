import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const PlanningPokerCard = ({ value, handleVote, isSelected, votingStarted }) => {
    const handleClick = () => {
        handleVote(value);
    };

    return (
        <Button
            variant={isSelected ? 'contained' : 'outlined'}
            onClick={handleClick}
            disabled={!votingStarted}
            style={{ color: isSelected ? 'white' : '' }}
            className="w-1/5 h-36"
        >
            <Typography variant="h5">
                { value }
            </Typography>
        </Button>
    );
};

const PokerCards = ({ handleVote, votingStarted }) => {
    const firstFivePokerCardValues = [0, 1, 2, 3, 5];
    const lastFivePokerCardValues = [8, 13, 20, 40, 100];
    const [selectedVote, setSelectedVote] = useState(null);

    const handleCardClick = (value) => {
        setSelectedVote(value === selectedVote ? null : value);
        handleVote(value);
    };

    return (
        <div className="w-full">
            <div className="flex justify-center">
                {firstFivePokerCardValues.map((value, index = 0) => (
                    <PlanningPokerCard
                        key={index}
                        value={value}
                        handleVote={handleCardClick}
                        isSelected={value === selectedVote}
                        votingStarted={votingStarted}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                {lastFivePokerCardValues.map((value, index = 5) => (
                    <PlanningPokerCard
                        key={index + 5}
                        value={value}
                        handleVote={handleCardClick}
                        isSelected={value === selectedVote}
                        votingStarted={votingStarted}
                    />
                ))}
            </div>
        </div>
    );
}

export default PokerCards;