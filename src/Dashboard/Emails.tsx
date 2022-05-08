import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {EmailsProps} from "./Dashboard";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Typography from "@mui/material/Typography";

// Generate Order Data
function createData(
    id: number,
    date: string,
    name: string,
    shipTo: string,
    paymentMethod: string,
    amount: number,
) {
    return {id, date, name, shipTo, paymentMethod, amount};
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

function ExpandMoreIcon() {
    return null;
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
                        <TableCell>Date</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Subject</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.emails.emails.map((row) => (
                        <TableRow key={row.emailUuid}>
                            <TableCell>{row.dateTimeSent}</TableCell>
                            <TableCell>{row.toEmail}</TableCell>
                            <TableCell>{row.subject}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
