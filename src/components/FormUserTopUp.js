import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const FormUserTopUp = () => {
    const [amount, setAmount] = useState("");
    const [msg, setMsg] = useState("");
    const {user} = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const Topup = async(e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/v1/topup', {
                amount: amount
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            alert("Success Top Up !");
            navigate('/balance')
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.message);
            }    
        }
    }

  return (
    <div>
        <h1 className="title">User</h1>
        <h2 className="subtitle">TopUp User Balance</h2>
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