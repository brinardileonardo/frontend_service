import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/transaksi.css";

export const TransaksiList = () => {  
    const [trx, setTrx] = useState([]);
    const [filteredTrx, setFilteredTrx] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [filterType, setFilterType] = useState("");
    const [filterUsername, setFilterUsername] = useState('');  // Tambahkan state untuk username

    const trxPerPage = 5;
  
    useEffect(() => {
        fetchTransaksi();
    }, []);

    useEffect(() => {
        filterTransaksi();
    }, [filterType, filterUsername, trx]);    
  
    const fetchTransaksi = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/v1/list_trx');
            setTrx(response.data.message);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
  
    const formatIdr = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const filterTransaksi = () => {
        let filtered = trx;
        if (filterType) {
            filtered = filtered.filter(transaction => transaction.type === filterType);
        }    
        if (filterUsername) {
            filtered = filtered.filter(transaction => transaction.user.username.toLowerCase().includes(filterUsername.toLowerCase()));
        }
        setFilteredTrx(filtered);
    };
    
  
    const indexOfLastTrx = currentPage * trxPerPage;
    const indexOfFirstTrx = indexOfLastTrx - trxPerPage;
    const currentTrx = filteredTrx.slice(indexOfFirstTrx, indexOfLastTrx);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div> 
        <h1 className="title">Transaksi </h1>
        <h2 className="subtitle">List Of Transaksi</h2>
        
        <div className="field">
            <label className="label">Filter by Type</label>
            <div className="control">
                <div className="select">
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="debits">Debit</option>
                        <option value="credits">Credit</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="field">
            <label className="label">Filter by Username</label>
            <div className="control">
                <input 
                    type="text"
                    className="input"
                    placeholder="Enter username"
                    value={filterUsername}
                    onChange={(e) => setFilterUsername(e.target.value)}  // Update filter username
                />
            </div>
        </div>

        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Transaksi tipe</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
              {currentTrx.map((trx, index) => (
                  <tr key={trx.id}>
                    <td>{indexOfFirstTrx + index + 1}</td>
                    <td>{trx.user.username}</td>
                    <td>{trx.type}</td>
                    <td>{trx.amount ? formatIdr(trx.amount) : 'N/A'}</td>
                    <td>{trx.description}</td>
                    <td>{new Date(trx.createdAt).toLocaleString()}</td>
                  </tr>
              ))}
            </tbody>
        </table>
        <Pagination
            trxPerPage={trxPerPage}
            totalTrx={filteredTrx.length}
            paginate={paginate}
            currentPage={currentPage}
          />
    </div>
  );
};

// Pagination Component
const Pagination = ({ trxPerPage, totalTrx, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalTrx / trxPerPage); i++) {
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