import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const FormAddMember = () => {
    const [username, setUsername] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    
    const registerUser = async(e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/v1/auth/register', {
                username : username
            });
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
        <h2 className="subtitle">Register New Member</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={registerUser}>
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input type="text" 
                                className="input" 
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="submit" className="button is-success">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}