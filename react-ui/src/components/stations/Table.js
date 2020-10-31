import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

    const [sortByStation, setSortByStation] = useState('+');
    const [sortByColour, setSortByColour] = useState('+');
    const [sortByStyle, setSortByStyle] = useState('+');
    const [sortBySize, setSortBySize] = useState('+');

    const handleSort = (context) => {
        const EMP = '+';
        const ASC = '(A-Z)';
        const DESC = '(Z-A)';
        const SIASC = '(S-M-L)';
        const SIDESC = '(L-M-S)';

        switch (context) {
            case 'station':
                if (sortByStation === EMP || sortByStation === DESC) {
                    setSortByStation(ASC);
                    sortRows('station', ASC);
                } else if (sortByStation === ASC) {
                    setSortByStation(DESC);
                    sortRows('station', DESC);
                }
                setSortByColour(EMP);
                setSortByStyle(EMP);
                setSortBySize(EMP);
                break;
            case 'colour':
                if (sortByColour === EMP || sortByColour === DESC) {
                    setSortByColour(ASC);
                    sortRows('colour', ASC);
                } else if (sortByColour === ASC) {
                    setSortByColour(DESC);
                    sortRows('colour', DESC);
                }
                setSortByStation(EMP);
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
                setSortByStation(EMP);
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
                setSortByStation(EMP);
                setSortByColour(EMP);
                setSortByStyle(EMP);
                break;
            default:
                break;
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.clickable} align="left" onClick={() => handleSort('station')}>
                            Station &nbsp; <small className={classes.sortSymbol}>{sortByStation}</small>
                        </TableCell>
                        <TableCell className={classes.clickable} align="center">
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
                        <TableCell className={classes.clickable} align="center">
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        let context;
                        if (row.stationedStatus === 'Pending')
                            context = { backgroundColor: '#ffffff', color: '333333' }
                        else if (row.stationedStatus === 'In progress')
                            context = { backgroundColor: '#fffdd5', color: '333333' }
                        else if (row.stationedStatus === 'Done')
                            context = { backgroundColor: '#e0ffec', color: '333333' }
                        return (
                            <TableRow key={row.orderID} style={context}>
                                <TableCell component="th" scope="row">
                                    {row.stationedIn}
                                </TableCell>
                                <TableCell align="center">{row.orderID}</TableCell>
                                <TableCell align="center">{row.createdDate}</TableCell>
                                <TableCell align="center">{row.colour}</TableCell>
                                <TableCell align="center">{row.style}</TableCell>
                                <TableCell align="center">{row.size}</TableCell>
                                <TableCell align="center">{row.stationedStatus}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}