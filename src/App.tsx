import * as React from 'react';
import {useEffect, useState} from 'react';
import Dashboard from "./Dashboard/Dashboard";
import {GetAllEmails} from "./api";

export default function App() {
    const [data, setData] = useState<GetAllEmails>({emails: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/email/all`
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
                setData({emails: []});
            } finally {
                setLoading(false);
            }
        }
        getData()
        const interval = setInterval(() => {
            getData()
        }, 30000);
        return () => clearInterval(interval);
    }, [])

    return (
        <Dashboard emails={data}/>
    );

}
