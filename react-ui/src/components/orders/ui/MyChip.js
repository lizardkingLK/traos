import React from 'react';
import Chip from '@material-ui/core/Chip';

export default function Chips({ icon, label, context, setValue }) {
    return (
        <Chip
            color="secondary"
            size="small"
            icon={icon}
            label={label}
            onDelete={() => setValue(`All ${context}`)}
        />
    );
}
