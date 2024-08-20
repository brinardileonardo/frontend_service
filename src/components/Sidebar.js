import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoPerson, IoHome, IoLogOut, IoCart, IoCalculator, IoWallet, IoShareOutline, IoStatsChartOutline, IoRocket, IoBarChartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const logout = () =>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };
  return (
    <div>
        <aside className="menu pl-2 has-shadows">
            <p className="menu-label">General</p>
            <ul className="menu-list">
                <li>
                    <NavLink to={"/dashboard"}><IoHome/>Dashboard</NavLink>
                </li>
            </ul>
            {user && (
                <div>
                    {user.role === 'admin' ? (
                        <>
                            <p className="menu-label">Administration</p>
                            <ul className="menu-list">
                                <li>
                                    <NavLink to={"/dashboard_chart"}><IoBarChartOutline />Charting</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/member"}><IoPerson />Member</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/transaksi"}><IoCart />List Transaksi</NavLink>
                                </li>
                            </ul>
                        </>
                    ) : user.role === 'user' ? (
                        <>
                            <p className="menu-label">User</p>
                            <ul className="menu-list">
                                <li>
                                    <NavLink to={"/balance"}><IoWallet />Balance User</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/topup"}><IoCalculator />Top Up Balance</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/transfer"}><IoShareOutline />Transfer Money To Another</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/top_transactions"}><IoRocket />Top Transaksi for user</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/top_user"}><IoStatsChartOutline />Overall Transaksi</NavLink>
                                </li>
                            </ul>
                        </>
                    ) : null}
                </div>
            )}

            <p className="menu-label">Settings</p>
            <ul className="menu-list">
                <li>
                    <button onClick={logout} className='button is white'>
                        <IoLogOut/>Log Out
                    </button>
                </li>
            </ul>
        </aside>
    </div>
  )
}
