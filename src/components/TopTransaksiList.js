import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const TopTransaksiList = () => {  
    const {user} = useSelector((state) => state.auth);
    const [msg, setMsg] = useState();
    const [trx, setTrx] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const trxPerPage = 5;

    useEffect(() => {
        getTrxOverall();
    }, []);

    const getTrxOverall = async() => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/top_transactions_for_user', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setTrx(response.data.message.transactions);
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.message);
            }    
        }
    }

    const formatIdr = (balance) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balance);
    };

    const indexOfLastTrx = currentPage * trxPerPage;
    const indexOfFirstTrx = indexOfLastTrx - trxPerPage;
    const currentTrx = trx.slice(indexOfFirstTrx, indexOfLastTrx);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div> 
        <h1 className="title">Transaksi </h1>
        <h2 className="subtitle">List Of Overall Transaksi</h2>

        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Amount</th>
                    <th>Absolute Amount</th>
                </tr>
            </thead>
            <tbody>
                {currentTrx.map((trx, index) => (
                    <tr key={trx.id}>
                        <td>{indexOfFirstTrx + index + 1}</td>
                        <td>{trx.amount ? formatIdr(trx.amount) : 'N/A'}</td>
                        <td>{trx.absoluteValue ? formatIdr(trx.absoluteValue) : 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination
            trxPerPage={trxPerPage}
            totalTrx={trx.length}
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