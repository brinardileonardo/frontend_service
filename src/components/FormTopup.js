import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const FormTopup = () => {
    const [amount, setAmount] = useState("");
    const [msg, setMsg] = useState("");
    const [token, setToken] = useState("");  // State untuk menyimpan token

    const navigate = useNavigate();

    useEffect(() => {
        const pathname = window.location.pathname;
        const username = pathname.split('/').pop();
    
        const fetchToken = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/user_session', {
                    username: username
                });
                setToken(response.data.token);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.message);
                }
            }
        };

        fetchToken();
    }, []);

    const Topup = async(e) => {
        e.preventDefault();

        if (!token) {
            setMsg("Token is not available.");
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/v1/topup', {
                amount: amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`  // Menambahkan Bearer token ke header Authorization
                }
            });
            alert("Success Top Up !");
            navigate('/member')
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.message);
            }    
        }
    }

  return (
    <div>
        <h1 className="title">Member</h1>
        <h2 className="subtitle">Topup Member Balance</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={Topup}>
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">Amount</label>
                            <div className="control">
                                <input type="number" 
                                className="input" 
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="submit" className="button is-success">Topup</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}