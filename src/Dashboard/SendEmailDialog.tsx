import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ChangeEvent, useEffect, useState} from "react";
import {GetAllEmails, GetTemplates} from "../api";
import {template} from "./templates";

export default function SendEmailDialog() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState<GetTemplates>({templates: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/email/templates`
                );
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                let actualData = await response.json();
                setData(actualData);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                setData({templates: []});
            } finally {
                setLoading(false);
            }
        }
        getData()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedTemplate, setSelectedTemplate] = React.useState('');
    const [form, setForm] = React.useState({});

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedTemplate(event.target.value as string);
        setForm({
            ...form,
            template: event.target.value
        })
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newForm = {...form}
        // @ts-ignore
        newForm[e.target.id] = e.target.value
        console.log(newForm)
        setForm(newForm)
    }

    const sendEmail = async () => {
        // @ts-ignore
        let {subject, toEmail, template, ...templateAttributes} = form
        const body = {
            subject,
            toEmail,
            template,
            attributes: {...templateAttributes}
        }
        const response = await fetch("http://localhost:8080/email/send", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        });
        if (!response.ok) {
            throw new Error(
                `This is an HTTP error: The status is ${response.status}`
            );
        }
        handleClose()
    }

    return (
        <div>
            <Fab color="primary" variant="extended" onClick={handleClickOpen}>
                Add <AddIcon/>
            </Fab>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Send email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Send email form
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin={"normal"}
                        id="subject"
                        label="Subject"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                    />
                    <TextField
                        autoFocus
                        margin={"normal"}
                        id="toEmail"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleFormChange}
                    />
                    <Select
                        value={selectedTemplate}
                        label="Template"
                        id="template"
                        onChange={handleChange}
                        placeholder="Template"
                        autoWidth
                    >
                        {data.templates.map(template => (<MenuItem value={template}>{template}</MenuItem>))}
                    </Select>
                    {selectedTemplate === "" ? null : Object.entries(template(selectedTemplate)).map(([field, name]) => (
                        <TextField
                            autoFocus
                            margin={"normal"}
                            id={field}
                            label={name}
                            type="text"
                            fullWidth
                            onChange={handleFormChange}
                            variant="standard"/>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={sendEmail}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
        ;
}