import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();
    
    const registerAdmin = async(e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/v1/auth/admin/register', {
                username : username,
                email: email,
                password: password
            });
            alert("Success Register, Plese Login ")
            navigate('/')
        } catch (error) {
            console.log(error.response.data.message)
            if(error.response){
                setMsg(error.response.data.message);
            }    
        }
    }

  return (
    <section class="hero has-background-grey-light is-fullheight is-fullwidth">
        <div class="hero-body">
            <div class="container">
            <div className="columns is-centered">
                <div className="column is-4">
                    <form onSubmit={registerAdmin} className="box">
                        <p className="hash-text-center">{msg}</p>
                        <h1 className="title is-2">Register</h1>
                        <div className="field">
                          <label className="label">Username</label>
                            <div className="control">
                                <input 
                                  type="text" 
                                  className="input" 
                                  placeholder="Username" 
                                  value={username} 
                                  onChange={(e)=> setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input 
                                  type="text" 
                                  className="input" 
                                  placeholder="Email@coba.com" 
                                  value={email} 
                                  onChange={(e)=> setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                          <label className="label">Password</label>
                            <div className="control">
                                <input 
                                  type="password" 
                                  className="input" 
                                  placeholder="*******"
                                  value={password} 
                                  onChange={(e)=> setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button type="submit" 
                                className="button is-success is-fullwidth"> 
                                Register
                            </button>
                        </div>
                        <p className="text-center">OR</p>
                        <div className="field mt-5">
                            <Link to="/" className="button is-danger is-fullwidth">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
   </section>
  )
}