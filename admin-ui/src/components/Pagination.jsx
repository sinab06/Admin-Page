import React, { useState, useEffect } from "react";
import "./Pagnation.css"

export const Pagination = ({ users, setCurrentUsers }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const setPage = (pageNum) => {
        let newPage = pageNum;
        if (pageNum < 1) {
            newPage = 1
        } else if (pageNum > pageNumbers[pageNumbers.length - 1]) {
            newPage = pageNumbers[pageNumbers.length - 1]
        }
        setCurrentPage(newPage)
    }

    useEffect(() => {
        const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentUsers(currentUsers);
    })


    return (
        <div>
            <span style={{ padding: '10px', backgroundColor: 'white', color: 'blue' }} onClick={() => setPage(1)}> First </span>

            <span style={{ padding: '10px', backgroundColor: 'white', color: 'blue' }} onClick={() => setPage(currentPage - 1)}> Prev </span>

            {pageNumbers.map(pageNumber => (<span style={currentPage === pageNumber ? { padding: '10px', backgroundColor: 'yellow', color: 'black' } : { padding: '10px', backgroundColor: 'white', color: 'blue' }} onClick={() => setPage(pageNumber)}>{pageNumber}</span>))}

            <span style={{ padding: '10px', backgroundColor: 'white', color: 'blue' }} onClick={() => setPage(currentPage + 1)}> Next </span>

            <span style={{ padding: '10px', backgroundColor: 'white', color: 'blue' }} onClick={() => setPage(pageNumbers[pageNumbers.length - 1])}> Last </span>

        </div>
    )
}