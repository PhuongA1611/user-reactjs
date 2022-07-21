import axios from "axios";
import './Manage.scss'
import { React, useState, useEffect, useRef } from "react";
import { table, button } from 'bootstrap-4-react'
import Popup from "../../component/Popup";


function Manage() {
    const addRef = useRef()
    const [users, setUsers] = useState([])
    const [openPopupAdd, setOpenPopupAdd] = useState(false)
    const [openPopupEdit, setOpenPopupEdit] = useState(false)

    const apiUser = "https://reqres.in/api/users";
    useEffect(()=>{
        // axios.get(apiUser)
        //     .then(res => {
        //         console.log("check", res.data.data)
        //     })
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await axios.get(apiUser)
        setUsers(res.data.data)
    }

    const getInfo = (info) => {
        const data = {
            email: info.email,
            first_name: info.firstName,
            last_name: info.lastName
        }
        return data
    }

    const handleAdd = async (data) => {
        // console.log(data)
        // try {
            // const data = {
            //     email: 'email',
            //     firstName: 'firstName',
            //     lastName: 'lastName'
            // }
            await axios.post(apiUser, data)
            console.log(data)
            setUsers([data, ...users])
            
        // } catch (error) {

        // }
    }

    let idUpdate
    const UpdateUser = ( user ) => {
        idUpdate = user.id
        setOpenPopupEdit(true)
    }

    const handleUpdate = async ( data ) =>{
        await axios.put(apiUser+ '/' + idUpdate, data)
        setOpenPopupEdit(false)
        getUsers()
    }

    const handleDelete = async (id) => {
        console.log(id)
        await axios.delete(apiUser + '/' + id)
        setUsers(users.filter((u) => u.id !== id))
    }

    return (
        <>
            <div className="container">
                <div className="button-group">
                    <button className="btn btn-primary">Import</button>
                    <button className="btn btn-info">Export</button>
                    <button 
                        className="btn btn-success" 
                        onClick={() => setOpenPopupAdd(true)}
                    >
                        Add new
                    </button>
                </div>
                <h2 className="title">List User:</h2>
                <input
                    className="search"
                    placeholder="Search user..."
                />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name
                                {/* <div className="icon-sort"> <BiSortAlt2 /></div> */}
                            </th>
                            <th>Last Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>
                                <button 
                                    className="btn btn-warning"
                                    onClick={() => UpdateUser(user)}>Edit</button>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                        ) 
                        )}
                    </tbody>
                </table>
            </div>

            <Popup
                title = "Add New User"
                openPopup={openPopupAdd}
                setOpenPopup={setOpenPopupAdd}
                actionBtn = "Save"
                getInfo={getInfo}
                handleBtn = {handleAdd}
            />
                
            <Popup
                title = "Edit User"
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
                actionBtn = "Save changes"
                getInfo={getInfo}
                handleBtn = {handleUpdate}
            />
        </>
    );
}

export default Manage;