import React, { useEffect, useState } from 'react'
import { AccountType } from '../CreateAccount';
import '../Style/Login.scss';
// @ts-ignore
import Login from './Login.tsx'

function Create() {
    const [dataAccount, setDataAccount] = useState([]);

    const [isLogin, setIsLogin] = useState(null);

    const [input, setInput] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        errorUsername: { message: '', activate: false },
        errorPassword: { message: '', activate: false },
        errorEmail: { message: '', activate: false },
        errorConfirmPassword: { message: '', activate: false },
    });

    useEffect ( () => {
        let data = JSON.parse(localStorage.getItem("account"))
        if(data) {
            setDataAccount(data);
        }
    }, []);

    // const [list, setList] = useState(Login.account)
    // const [checkDuplicatePassword, setCheckDuplicatePassword] = useState(true);
    // const [checkDuplicateUser, setCheckDuplicateUser] = useState(true);
    // var login = new Login();

  
    function handleAddAccount(e: any) {
        let { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));

        //   setInputUserName("");
        //   setTaskDescription("");
        //   setSelectedDate(null);
        // const dataToDoAccount = [...createAccount, setInput];
        // handleCheckInput(dataToDoAccount)
        // localStorage.setItem("account", JSON.stringify(dataToDoAccount));
        // setCreateAccount(dataToDoAccount);
    }

    function checkExistEmail(email: string) {
        return !(dataAccount.find(item => item.email === email) === undefined)
    }

    function checkExistUsername(username: string) {
        return !(dataAccount.find(item => item.username === username) === undefined)
    }

    function handleCheckInput(e: any) {
        let { name, value } = e.target;
        setError(prev => {
            var stateObj = { ...prev};

            switch (name) {
                case "username":
                    if (!value) {
                        stateObj = {
                            ...prev,
                            errorUsername: 
                            {
                                message: "Please enter username",
                                activate: false
                            }
                        };                        
                    }
                    else if (checkExistUsername(value)) {
                        stateObj = {
                            ...prev,
                            errorUsername:
                            {
                                message: "This username was created before !",
                                activate: false
                            }
                        };
                    } else {
                        stateObj = {
                            ...prev,
                            errorUsername: { message: '', activate: true }
                        };
                    }
                    break;

                case "email":
                    const formEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    
                    if (!value) {
                        stateObj = {
                            ...prev,
                            errorEmail: {
                                message: "Please enter Email",
                                activate: false
                            }
                        };}
                    // }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
                    //     stateObj = {
                    //         ...prev,
                    //         errorEmail: {
                    //             message: "Email invalid",
                    //             activate: false
                    //         }
                    //     };
                    //     // console.log(formEmail);
                        
                    // }
                     else if (checkExistEmail(value)) {
                        stateObj = {
                            ...prev,
                            errorEmail:
                            {
                                message: "This email was created before !",
                                activate: false
                            }
                        };
                    } else {
                        stateObj = {
                            ...prev,
                            errorEmail: { message: '', activate: true }
                        };
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj = {
                            ...prev,
                            errorPassword: {
                                message: "Please enter Password",
                                activate: false
                            }
                        };
                    } else {
                        stateObj = {
                            ...prev,
                            errorPassword: { message: '', activate: true }
                        };
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj = {
                            ...prev,
                            errorConfirmPassword: {
                                message: "Please enter Password again !",
                                activate: false
                            }
                        };
                    }
                    else if (input.password && value !== input.password) {
                        stateObj = {
                            ...prev,
                            errorConfirmPassword: {
                                message: "Password and Confirm Password does not match.",
                                activate: false
                            }
                        };
                    } else {
                        stateObj = {
                            ...prev,
                            errorConfirmPassword: { message: '', activate: true }
                        };
                    }
                    break;
                default:
                    break;
            }
            return stateObj;
        });
    }

    function submitCreateAccount() {
        if (!error.errorConfirmPassword.activate || !error.errorEmail.activate
            || !error.errorPassword.activate || !error.errorUsername.activate) {
            console.log('create account failure !')
            // let form = document.getElementById('infor-box');
            let arrInput = document.querySelectorAll('input');
            arrInput.forEach((item) => {
                handleCheckInput(item)
            })
        } else {
            console.log('create account success.')
            localStorage.setItem("account", JSON.stringify([
                ...dataAccount,
                {
                    email: input.email,
                    username: input.username,
                    password: input.password
                }
            ]));
            setIsLogin(true)
        }
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
                        <input type="text" name='email' id='input-email' placeholder='Enter Email'
                            value={input.email}
                            onChange={handleAddAccount} onBlur={handleCheckInput} />
                        <label>Email</label>
                        <span className='err'> {error.errorEmail.message}</span>
                    </div>
                    <div className="user-box">
                        <input type="text" name='username' id='input-username' placeholder='Enter Username'
                            value={input.username}
                            onChange={handleAddAccount} onBlur={handleCheckInput} />
                        <label>Username</label>
                        <span className='err'> {error.errorUsername.message}</span>
                    </div>
                    <div className="user-box">
                        <input type="password" name='password' id='input-password' placeholder='Enter Password'
                            value={input.password}
                            onChange={handleAddAccount} onBlur={handleCheckInput} />
                        <label>Password</label>
                        <span>{error.errorPassword.message}</span>
                    </div>
                    <div className="user-box">
                        <input type="password" name='confirmPassword' id='input-confirm-password'
                            value={input.confirmPassword}
                            onChange={handleAddAccount} onBlur={handleCheckInput} />
                        <label>Confirm Password</label>
                        <span className='err'> {error.errorConfirmPassword.message}</span>
                    </div>
                    <span className='create-text'>If you already have an account please login!</span>
                    <button type='submit' onClick={submitCreateAccount}>
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