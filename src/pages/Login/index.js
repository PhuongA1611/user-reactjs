import './Login.scss'
import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from "axios";

function Login() {
    // const { setAuth } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('');
    const emailRef = useRef()
    const errRef = useRef()

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://reqres.in/api/login', {
                email: email,
                password: pwd
            })
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            // setAuth({ email, pwd, roles, accessToken });
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <div class="alert alert-success" role="alert">
                    You are logged in!
                </div>
            ) : (
                <div></div>
                // <div class="alert alert-danger" role="alert">
                //     Error!
                // </div> 
            )}
            <section>
                <form className='form' onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2 className="titleForm">Log In</h2>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            className="form-control"
                            ref = {emailRef}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            className="form-control"
                            onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <div className="loginBtn">
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login;