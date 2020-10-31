import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function MyRadioGroup({ value, setValue, array }) {
    const classes = useStyles();

    return (
        <RadioGroup
            className={classes.radioGroup}
            aria-label={value}
            name={value + '1'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            {array.map(ai => (
                <FormControlLabel
                    key={ai}
                    value={ai}
                    control={<Radio color="default" size="small" />}
                    label={ai}
                    labelPlacement="bottom"
                />
            ))}
        </RadioGroup>
    )
}