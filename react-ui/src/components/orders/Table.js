import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

import History from './History';

const useStyles = makeStyles({
    table: {
        minWidth: '80vw',
        minHeight: '60vh',
    },
    clickable: {
        cursor: 'pointer',
    },
    sortSymbol: {
        color: 'gray'
    }
});

export default function SimpleTable({ rows, sortRows }) {
    const classes = useStyles();

    const [sortByColour, setSortByColour] = useState('+');
    const [sortByStyle, setSortByStyle] = useState('+');
    const [sortBySize, setSortBySize] = useState('+');
    const [selected, setSelected] = useState('');
    const [historyURL, setHistoryURL] = useState('');
    const [open, setOpen] = useState(false);

    const handleSort = (context) => {
        const EMP = '+';
        const ASC = '(A-Z)';
        const DESC = '(Z-A)';
        const SIASC = '(S-M-L)';
        const SIDESC = '(L-M-S)';

        switch (context) {
            case 'colour':
                if (sortByColour === EMP || sortByColour === DESC) {
                    setSortByColour(ASC);
                    sortRows('colour', ASC);
                } else if (sortByColour === ASC) {
                    setSortByColour(DESC);
                    sortRows('colour', DESC);
                }
                setSortByStyle(EMP);
                setSortBySize(EMP);
                break;
            case 'style':
                if (sortByStyle === EMP || sortByStyle === DESC) {
                    setSortByStyle(ASC);
                    sortRows('style', DESC);
                } else if (sortByStyle === ASC) {
                    setSortByStyle(DESC);
                    sortRows('style', ASC);
                }
                setSortByColour(EMP);
                setSortBySize(EMP);
                break;
            case 'size':
                if (sortBySize === EMP || sortBySize === SIDESC) {
                    setSortBySize(SIASC);
                    sortRows('size', SIASC);
                } else if (sortBySize === SIASC) {
                    setSortBySize(SIDESC);
                    sortRows('size', SIDESC);
                }
                setSortByColour(EMP);
                setSortByStyle(EMP);
                break;
            default:
                break;
        }
    }

    const showOrder = async (e) => {
        const id = e.target.value;
        setSelected(id);
        setHistoryURL({ call: '/api/histories/getHistory/', para: id });
        setOpen(true);
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.clickable}>
                            Order ID
                        </TableCell>
                        <TableCell className={classes.clickable} align="center">
                            Created date
                        </TableCell>
                        <TableCell className={classes.clickable} align="center" onClick={() => handleSort('colour')}>
                            Colour &nbsp; <small className={classes.sortSymbol}>{sortByColour}</small>
                        </TableCell>
                        <TableCell className={classes.clickable} align="center" onClick={() => handleSort('style')}>
                            Style &nbsp; <small className={classes.sortSymbol}>{sortByStyle}</small>
                        </TableCell>
                        <TableCell className={classes.clickable} align="center" onClick={() => handleSort('size')}>
                            Size &nbsp; <small className={classes.sortSymbol}>{sortBySize}</small>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.orderID}>
                            <TableCell component="th" scope="row">
                                <Radio
                                    checked={selected === row.orderID}
                                    onChange={showOrder}
                                    value={row.orderID}
                                    color="default"
                                    size="small"
                                    name="radio-button-orderID"
                                    inputProps={{ 'aria-label': row.orderID }}
                                />
                                {row.orderID}
                                <History open={open} setOpen={setOpen} url={historyURL} setSelected={setSelected} />
                            </TableCell>
                            <TableCell align="center">{row.createdDate}</TableCell>
                            <TableCell align="center">{row.colour}</TableCell>
                            <TableCell align="center">{row.style}</TableCell>
                            <TableCell align="center">{row.size}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}