import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/member.css";
import { Link } from 'react-router-dom';

export const MemberList = () => {  
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/list_user');
        setUsers(response.data.message);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const formatIdr = (amount) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };
  
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div> 
        <h1 className="title">Member </h1>
        <h2 className="subtitle">List Of Member</h2>
        <Link to="/member/add" className="button is-primary mb-2">Register New Member</Link>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Created At</th>
                    <th>Balance</th>
                    <th>Last Update Balance</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{user.username}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>{user.wallet ? formatIdr(user.wallet.balance) : 'N/A'}</td>
                    <td>{user.wallet ? new Date(user.wallet.updatedAt).toLocaleString() : 'N/A'}</td>
                    <td><Link to={`/member/topup/${user.username}`} className="button is-info mb-2">Topup Member</Link></td>
                  </tr>
              ))}
            </tbody>
        </table>
        <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            paginate={paginate}
            currentPage={currentPage}
          />
    </div>
  );
};

// Pagination Component
const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="pagination-nav">
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
};