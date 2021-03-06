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
import {get, post} from "../api/rest";

interface SendEmailDialogProps {
    templates: GetTemplates;
    setHasSentEmail: any
}

export default function SendEmailDialog(props: SendEmailDialogProps) {
    const [open, setOpen] = React.useState(false);

    const templates = props.templates.templates

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
        await post("/email/send", body, localStorage.getItem("token"))
        props.setHasSentEmail(body)
        handleClose()
    }

    return (
        <div>
            <Fab data-testid="test-openSendEmailDialog" color="primary" variant="extended" onClick={handleClickOpen}>
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
                        defaultValue={templates[0]}
                        autoWidth
                    >
                        {templates.map(template => (<MenuItem value={template}>{template}</MenuItem>))}
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
                    <Button data-testid='test-cancel' onClick={handleClose}>Cancel</Button>
                    <Button data-testid='test-submit' onClick={sendEmail}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
        ;
}