import React, { useEffect, useState } from 'react'
import '../Style/Login.scss';
import '../Style/App.scss';

// @ts-ignore
import Funtion from './Funtion.tsx'
// @ts-ignore
import Create from './Create.tsx'
// @ts-ignore

function Login() {
    const [isLogin, setIsLogin] = useState(null);
    const [isCreate, setIsCreate] = useState(null);
    // const [count , setCount] = useState(null);
    const [inputUserName, setInputUserName] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    
    const [account, setAccount] = useState([])
        useEffect(() => {
        let data = JSON.parse(localStorage.getItem("account"))
        if (data) {
            setAccount(data)
        }
    }, [])
    
    function checkLogin() {
        console.log(account)
        let checkLogin = account.find((acc) => (acc.username === inputUserName 
            && acc.password === inputPassword)) !== undefined
        setIsLogin(checkLogin)
    }

    if (isLogin) {
        return (
            <div>
                <Funtion></Funtion>
            </div>
        );
    }
    if (isCreate) {
        return (
            <div>
                <Create></Create>
            </div>
        );
    }

    return (
        <div>
        <div className='login-box'>
            <h2>Login</h2>
            <div id='infor-box'>
                <div className="user-box">
                    <input type="text" name='username' id='input-username'
                        value={inputUserName}
                        onChange={event => setInputUserName(event.target.value)} />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input type="password" name='password' id='input-password'
                        value={inputPassword}
                        onChange={event => setInputPassword(event.target.value)} />
                    <label>Password</label>
                </div>
                {isLogin === false && <p>Wrong password or username !</p>}
                <button onClick={() => { checkLogin() }}>
                    Submit
                </button>
                <button onClick={() => { setIsCreate(true) }}>
                    create
                </button>
            </div>
        </div>
    </div>
    );
}

export default Login;