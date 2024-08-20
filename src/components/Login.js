import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole ] = useState("admin");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );

    useEffect(()=>{
        if(user || isSuccess){
            navigate("/dashboard");
        }
    },[user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({username, password, role }));
    }

    return (
    <section class="hero has-background-grey-light is-fullheight is-fullwidth">
      <div class="hero-body">
        <div class="container">
            <div className="columns is-centered">
                <div className="column is-4">
                    <form onSubmit={Auth} className="box">
                        {isError && <p className="hash-text-centered">{message}</p>}
                        <h1 className="title is-2">Login</h1>
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
                        <div className="field">
                            <label className="label">Select Role</label>
                            <select className='control' value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="field mt-5">
                            <button type="submit" 
                            className="button is-success is-fullwidth">
                                {isLoading ? "Loading...." : "Login"}
                            </button>
                        </div>
                        <p className="text-center">OR</p>
                        <div className="field mt-5">
                            <Link to="/register" className="button is-danger is-fullwidth">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}
