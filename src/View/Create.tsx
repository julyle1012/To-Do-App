import React, { useEffect, useState } from 'react'
import './Login.scss';
// @ts-ignore
import Login from './Login.tsx'

function Create() {
    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [isLogin, setIsLogin] = useState(null);
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');
    const [list, setList] = useState(Login.account)
    const [checkDuplicatePassword, setCheckDuplicatePassword] = useState(true);
    const [checkDuplicateUser, setCheckDuplicateUser] = useState(true);
    var login = new Login();
    function handleAdd() {
        const newList = list.concat({ inputUserName , inputPassword });
        setList(newList);
    }
    function checkCreate() {
        let a = true;
        let b = true;
        const listAccount = (Login.account).map((item: any) => {
            console.log(checkDuplicatePassword)
            if (inputUserName === item.userName)
                return a = false;
            if (inputConfirmPassword === inputPassword)
                return b = false;
        });
        if (b = true) return setCheckDuplicatePassword(false);
        if (a = false) return setCheckDuplicateUser(false);

    }
    if (isLogin === true) {
        return (
            <div>
                <Login></Login>
            </div>
        )
    }

    return (
        <div>
            <div className='login-box'>
                <h2>Create</h2>
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
                    <div className="user-box">
                        <input type="password" name='confirmpassword' id='input-confirm-password'
                            onChange={event => setInputConfirmPassword(event.target.value)} />
                        <label>Confirm Password</label>
                    </div>
                    {checkDuplicatePassword === false && <p>Password and ConfirmPassword must Duplicate!</p>}
                    {checkDuplicateUser === false && <p>Duplicate Username !</p>}
                    <button type='submit' onClick={() => checkCreate()}>
                        Create
                    </button>
                    <button onClick={() => setIsLogin(true)}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Create;