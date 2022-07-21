import React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import './Popup.scss'


function Popup(props) {
    const { title, openPopup, setOpenPopup, actionBtn, getInfo, handleBtn} = props


    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    

    const handleClickBtn = () => {
            let data = getInfo({
                email: email,
                firstName: firstName,
                lastName: lastName
            })
            console.log(data)
            handleBtn(data)
    }

    return (
        <Dialog open={openPopup} >
            <DialogTitle>
                <div>
                    <h2>{title}</h2>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="formlog">
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="button-group">
                        <button
                            className="btn btn-success"
                            onClick={() => handleClickBtn()}
                        >{actionBtn}</button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setOpenPopup(false)}>Close</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Popup;