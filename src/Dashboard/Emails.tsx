import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {EmailsProps} from "./Dashboard";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from "@mui/material/Box";
import {Email} from "../api";
import Paper from "@mui/material/Paper";
import {Collapse} from "@mui/material";

interface RowProps extends Email {
    index: number
}

export function Row(row: RowProps) {
    const [open, setOpen] = React.useState(false);

    return (<React.Fragment>
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}} key={row.emailUuid}>
            <TableCell data-testid={"test-subject-" + row.index} align="left">{row.subject}</TableCell>
            <TableCell data-testid={"test-toEmail-" + row.index} align="left">{row.toEmail}</TableCell>
            <TableCell data-testid={"test-dateTimeSent-" + row.index} align="left">{row.dateTimeSent}</TableCell>
            <TableCell>
                <IconButton
                    data-testid={"test-openHtml-" + row.index}
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
                            <div data-testid={"test-html-" + row.index} dangerouslySetInnerHTML={{__html: row.html}}/>
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
                    {props.emails.emails ? props.emails.emails.map((row, i) => (
                        <Row index={i} emailUuid={row.emailUuid} subject={row.subject} toEmail={row.toEmail}
                             dateTimeSent={row.dateTimeSent} html={row.html}/>
                    )) : null}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
