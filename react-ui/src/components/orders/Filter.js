import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

import MyChip from './ui/MyChip';

import arrays from '../../app_meta/arrays';

const useStyles = makeStyles((theme) => ({
    filterRow: {
        margin: '20px 10px 20px 10px',
    },
    chipArea: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function FilterDialog({ filterOrders }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [colour, setColour] = useState('All Colours');
    const [style, setStyle] = useState('All Styles');
    const [size, setSize] = useState('All Sizes');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, option) => {
        if (option === 'Search')
            filterOrders({ colour, style, size });

        setOpen(false);
    };

    const handleChange = async (e, context) => {
        const value = e.target.value;
        switch (context) {
            case 'COLOUR':
                setColour(value);
                break;
            case 'STYLE':
                setStyle(value);
                break;
            case 'SIZE':
                setSize(value);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <IconButton size="medium" color="secondary" aria-label="filter orders dialog" onClick={handleClickOpen}>
                <FilterListIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="filter-orders-dialog-title">Filter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Filter orders for your preference
                    </DialogContentText>
                    <FormControl className={classes.filterRow}>
                        <Typography variant="button" component="h2">Colour</Typography>
                        <Select
                            labelId="select-colour-select-label"
                            id="select-colour-select"
                            value={colour}
                            color="secondary"
                            style={{ width: 250 }}
                            onChange={(e) => handleChange(e, 'COLOUR')}
                        >
                            <MenuItem value='All Colours'>All Colours</MenuItem>
                            {arrays.COLOUR.map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.filterRow}>
                        <Typography variant="button" component="h2">Style</Typography>
                        <Select
                            labelId="select-style-select-label"
                            id="select-style-select"
                            value={style}
                            color="secondary"
                            style={{ width: 250 }}
                            onChange={(e) => handleChange(e, 'STYLE')}
                        >
                            <MenuItem value='All Styles'>All Styles</MenuItem>
                            {arrays.STYLE.map(s => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.filterRow}>
                        <Typography variant="button" component="h2">Size</Typography>
                        <Select
                            labelId="select-size-select-label"
                            id="select-size-select"
                            value={size}
                            color="secondary"
                            style={{ width: 250 }}
                            onChange={(e) => handleChange(e, 'SIZE')}
                        >
                            <MenuItem value='All Sizes'>All Sizes</MenuItem>
                            {arrays.SIZE.map(s => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className={classes.chipArea}>
                        <MyChip
                            icon={<BrushIcon />}
                            label={colour}
                            context='Colours'
                            setValue={setColour}
                        />
                        <MyChip
                            icon={<BeachAccessIcon />}
                            label={style}
                            context='Styles'
                            setValue={setStyle}
                        />
                        <MyChip
                            icon={<AspectRatioIcon />}
                            label={size}
                            context='Sizes'
                            setValue={setSize}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose(e, 'Cancel')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(e) => handleClose(e, 'Search')} color="primary">
                        Search
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
