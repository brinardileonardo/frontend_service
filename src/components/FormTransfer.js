import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const FormTransfer = () => {
    const [amount, setAmount] = useState("");
    const [to_username, setToUsername] = useState("");

    const [msg, setMsg] = useState("");
    const {user} = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const Transfer = async(e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/v1/transfer', {
                to_username : to_username,
                amount: amount
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            alert("Success Transfer Saldo !");
            navigate('/balance');
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.message);
            }    
        }
    }

  return (
    <div>
        <h1 className="title">Transfer</h1>
        <h2 className="subtitle">Transfer To Another User</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={Transfer}>
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">Destination Username</label>
                            <div className="control">
                                <input type="text" 
                                className="input" 
                                placeholder="destination username"
                                value={to_username}
                                onChange={(e) => setToUsername(e.target.value)}/>
                            </div>

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
                                <button type="submit" className="button is-success">Transfer Money</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}