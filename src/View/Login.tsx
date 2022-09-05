import React, { useEffect, useState } from 'react'
import './Login.scss';
import './App.scss';

// @ts-ignore
import Funtion from './Funtion.tsx'
// @ts-ignore
import Create from './Create.tsx'
// @ts-ignore

function Login() {
    const [state, setState] = useState(null);
    const [isCreate, setIsCreate] = useState(null);
    // const [count , setCount] = useState(null);
    const [inputUserName, setInputUserName] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const accountLogin = [
        {
            userName: 'abc',
            password: '123456'
        },
        {
            userName: 'sa',
            password: '12345'
        },
    ]
    
    const [account, setAccount] = useState(accountLogin)
    
    function checkLogin() {
        let count = null;
        const listAccount = account.map((item :any) => {
            if (inputUserName === item.userName && inputPassword === item.password)
                return count = true;
        });
        console.log(count);
        if (count === true) return (setState(true));
        else return (setState(false));


    }

    if (state === true) {
        return (
            <div>
                <Funtion></Funtion>
            </div>
        );
    }
    // if (isCreate === true) {
    //     return (
    //         <div>
    //             <Create></Create>
    //         </div>
    //     );
    // }

    return (
        <div>
            <div className='login-box'>
                <h2>Login</h2>
                <div id='infor-box'>
                    <div className="user-box">
                        <input type="text" name='username' id='input-username'
                            onChange={event => setInputUserName(event.target.value)} />
                        <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name='password' id='input-password'
                            onChange={event => setInputPassword(event.target.value)} />
                        <label>Password</label>
                    </div>
                    {state === false && <p>Wrong password or username !</p>}
                    <button onClick={() => { checkLogin() }}>
                        Submit
                    </button>
                    {/* <button onClick={() => { setIsCreate(true) }}>
                        create
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Login;