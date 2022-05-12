import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {EmailsProps} from "./Dashboard";
import {Accordion, AccordionDetails, AccordionSummary, Collapse} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from "@mui/material/Box";
import {Email} from "../api";
import Paper from "@mui/material/Paper";

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

function ExpandMoreIcon() {
    return null;
}

export function Row(row: Email) {
    const [open, setOpen] = React.useState(false);

    return (<React.Fragment>
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}} key={row.emailUuid}>
            <TableCell align="left">{row.subject}</TableCell>
            <TableCell align="left">{row.toEmail}</TableCell>
            <TableCell align="left">{row.dateTimeSent}</TableCell>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{margin: 1, padding: 1}}>
                        <Paper sx={{padding: 2, margin: 1}} elevation={3}>
                            <div dangerouslySetInnerHTML={{__html: row.html}}/>
                        </Paper>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>)
}

export default function Emails(props: EmailsProps) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <React.Fragment>
            <Title>Recent emails</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Subject</TableCell>
                        <TableCell align="left">To</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell>Body</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.emails.emails.map((row) => (
                        <Row emailUuid={row.emailUuid} subject={row.subject} toEmail={row.toEmail}
                             dateTimeSent={row.dateTimeSent} html={row.html}/>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
