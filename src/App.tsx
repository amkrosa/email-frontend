import * as React from 'react';
import {useEffect, useState} from 'react';
import Dashboard from "./Dashboard/Dashboard";
import {GetAllEmails, GetTemplates} from "./api";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Dashboard/Login/Login";
import {get} from "./api/rest";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [data, setData] = useState<GetAllEmails>({emails: []});
    const [templates, setTemplates] = useState<GetTemplates>({templates: []});
    const [hasSentEmail, setHasSentEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            const getEmails = async () => await get("/email/all", token, setData, setError, setLoading)
            const getTemplates = async () => get("/email/templates", token, setTemplates, setError, setLoading)
            getTemplates()
            getEmails()
            const interval = setInterval(() => {
                getEmails()
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [token, hasSentEmail])

    if (!token) {
        return <Login setToken={setToken}/>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard setHasSentEmail={setHasSentEmail} templates={templates} emails={data}/>}/>
            </Routes>
        </BrowserRouter>
    );
}
