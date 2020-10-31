import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import BrushIcon from '@material-ui/icons/Brush';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import BusinessIcon from '@material-ui/icons/Business';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import functions from '../../app_meta/functions';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    paper2: {
        padding: theme.spacing(1),
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    field: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 'max-content',
        margin: 10
    },
    popover: {
        pointerEvents: 'none',
    },
}));

export default function CustomizedTimeline({ history }) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Timeline align="alternate">
            {history.map(h => {
                let description = h.description;
                let context = h.context;
                let createdDate = h.createdDate;
                let icon;
                if (h.context === 'Create')
                    icon = <AddIcon />;
                else if (h.context === 'Update')
                    icon = <UpdateIcon />;
                return (
                    <TimelineItem key={h._id}>
                        <TimelineOppositeContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                aria-owns={open ? 'mouse-over-popover-for-time' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                                style={{ cursor: 'pointer' }}
                            >
                                {functions.FORMAT_DATE_A(createdDate)}
                            </Typography>
                            <Popover
                                id="mouse-over-popover-for-time"
                                className={classes.popover}
                                classes={{
                                    paper: classes.paper2,
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography variant="caption">Time : {functions.FORMAT_TIME(createdDate)}</Typography>
                            </Popover>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                {icon}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="h6" component="h1">
                                    {context}
                                </Typography>
                                <div className={classes.field}>
                                    <BrushIcon fontSize="small" /> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        Colour :
                                    </Typography> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        {description.Colour}
                                    </Typography>
                                </div>
                                <div className={classes.field}>
                                    <BeachAccessIcon fontSize="small" /> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        Style :
                                    </Typography> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        {description.Style}
                                    </Typography>
                                </div>
                                <div className={classes.field}>
                                    <AspectRatioIcon fontSize="small" /> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        Size :
                                    </Typography> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        {description.Size}
                                    </Typography>
                                </div>
                                <div className={classes.field}>
                                    <BusinessIcon fontSize="small" /> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        Station :
                                    </Typography> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        {description.Station}
                                    </Typography>
                                </div>
                                <div className={classes.field}>
                                    <ShowChartIcon fontSize="small" /> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        Status :
                                    </Typography> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        {description.Status}
                                    </Typography>
                                </div>
                                <div className={classes.field}>
                                    <HourglassEmptyIcon fontSize="small" /> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        Completion :
                                    </Typography> &nbsp;
                                    <Typography variant="caption" component="h1">
                                        {description.Completion}
                                    </Typography>
                                </div>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                )
            })}
        </Timeline>
    );
}
