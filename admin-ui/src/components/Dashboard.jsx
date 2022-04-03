import React, { useEffect, useState } from "react";
import './Dashboard.css';
import { BsSearch } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Pagination } from "./Pagination";


export const Dashboard = () => {

    const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const [user, setUser] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]) ;
    const [searchStr, setSearchStr] = useState("") ;

    function getData() {
        fetch(url).then((data) => {
            data.json().then((res) => {
                //  console.log(res) ;
                setUser(res);
                setSearchedUsers(res) ;
            })
        })
    }

    useEffect(() => {
        getData()
    }, [])
    // console.log(user) ;

    function handleDelete(id) {
        const newData = user.filter(user => user.id !== id); //(!isChecked.includes(user.id))
        setUser(newData)

        const filter = filterSearch(searchStr) ;
        setSearchedUsers(filter);
    }

    const handleMultipleDelete = (id) => {
        const newData = user.filter(!isChecked.includes(user.id)); 
        setUser(newData)

        const filter = filterSearch(searchStr) ;
        setSearchedUsers(filter);
    }

    const handleCheckbox = (id) => {
        // console.log(isChecked)
        if (isChecked.includes(id)) {
            const filteredArray = isChecked.filter(eId => eId !== id)
            setIsChecked(filteredArray)
        } else {
            setIsChecked([...isChecked, id])
        }
    }

    const filterSearch = (search_str) => {
        return  user.filter(u => (u.email.includes(search_str) || u.name.includes(search_str) || u.role.includes(search_str)))
    }

    const handleSearchUsers = (e) => {
        const search_str = e.target.value ;
        setSearchStr(search_str) ;

        const filter = filterSearch(search_str) ;
        setSearchedUsers(filter);
    }

    return (
        <div id="body">
            <div>
                <h1>
                    GEEKTRUST Admin Dashboard
                </h1>
            </div>


            <div id="input_search">
                <div>
                    <input type="text" placeholder="Search" id="search" onChange={handleSearchUsers}/>
                </div>

                <div>
                    <BsSearch id="search_icon" />
                </div>
            </div>


            <div>
                <table>
                    <tbody>
                        <tr>
                            <th> Employee id</th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Role </th>
                            <th> Action </th>
                            <th><input type="checkbox" value="checked" /></th>
                        </tr>

                        {
                            currentUsers.map((e) =>
                                <tr key={e.id} className={isChecked.includes(e.id) ? "checked" : "unchecked"}>
                                    <td>#919{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.role}</td>
                                    <td>
                                        <span className="action_alignment"> <FaEdit /> </span>
                                        <span className="action_alignment" onClick={() => handleDelete(e.id)}> <MdDelete size={20} /> </span>
                                    </td>
                                    <td><input type="checkbox" value="checked" onChange={() => handleCheckbox(e.id)} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div id="pagination">
                <Pagination users={searchedUsers} setCurrentUsers={setCurrentUsers} handleMultipleDelete={handleMultipleDelete}  />
            </div>
        </div>
    )
}
