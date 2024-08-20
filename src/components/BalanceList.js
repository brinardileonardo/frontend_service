import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const BalanceList = () => {
    const {user} = useSelector((state) => state.auth);
    const [balance, setBalance] = useState(0);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getBalance();
    }, []);

    const getBalance = async() => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/balance', {
            headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setBalance(response.data.result.balance);
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.message);
            }    
        }
    }

    const formatIdr = (balance) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balance);
    };

  return (
        <div>
            <h1 className="title">Dashboard</h1>
            <h2 className="subtitle">Hi {user.name} </h2>
            <div className="box">
                <p>Your balance : 
                    { balance ? formatIdr(balance) : 'N/A'}
                </p>
            </div>
        </div>
    
    );
};