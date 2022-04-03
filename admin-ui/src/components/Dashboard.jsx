import React, { useEffect, useState } from "react";
import './Dashboard.css';
import { BsSearch } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export const Dashboard = () => {

    const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const [user, setUser] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    function getData() {
        fetch(url).then((data) => {
            data.json().then((res) => {
                //  console.log(res) ;
                setUser(res);
            })
        })
    }

    useEffect(() => {
       getData()
    }, [])
    // console.log(user) ;

    function handleDelete(id) {
        const newData = user.filter(user => user.id !== id);
        setUser(newData)
    }

    const handleCheckbox = (e) => {
        setIsChecked(true);
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
                        <input type="text" placeholder="Search" id="search" />
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
                                user.map((e) =>
                                    <tr>
                                        <td>#919{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.role}</td>
                                        <td>
                                            <span className="action_alignment"> <FaEdit /> </span>
                                            <span className="action_alignment" onClick={() => handleDelete(e.id)}> <MdDelete size={20} /> </span>
                                        </td>
                                        <td><input className={ isChecked ? 'task-done' : ''} type="checkbox" value="checked" onChange={handleCheckbox}/></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
