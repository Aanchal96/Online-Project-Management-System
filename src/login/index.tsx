import React, {useState} from "react";
import firebaseApp from "../firebase";
import {signInWithEmailAndPassword} from '@firebase/auth';
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('admin@admin.com');
    const [password, setPassword] = useState('password');
    const history = useNavigate();
    firebaseApp.auth.onAuthStateChanged(value => {
        if (value) {
            history('/');
        } else {
            // history('/login');
        }
    });

    return <>
        <div className={'h-screen bg-gray-500 flex items-center justify-center'}>
            <div className={'bg-white p-4  sm:w-1/2 w-full'}>
                <form onSubmit={event => {
                    event.preventDefault();
                    signInWithEmailAndPassword(firebaseApp.auth, email, password).then(r => {
                        history('/projects');
                    });
                }}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                        <input type="text" id="email" name={'email'} value={email} onChange={event => {
                            setEmail(event.target.value);
                        }}
                               placeholder="example@example.com" required/>
                        <small className={'opacity-50'}>use: admin@admin.com</small>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" id="password" name={'password'}  value={password} onChange={event => {
                            setPassword(event.target.value);
                        }}
                               placeholder="********" required/>
                        <small className={'opacity-50'}>use: password</small>
                    </div>
                    <button className={'btn'} type={'submit'}>Login</button>
                </form>
            </div>
        </div>
    </>
}
