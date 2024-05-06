import { useState } from 'react';
import MainLayout from "./Layout/MainLayout.tsx";
import { useNavigate } from "react-router-dom";
import { setCookie, deleteCookie } from "../Components/Cookie.tsx";
import { API } from "../Setting.tsx";
import AbbottLogo from '../Assets/abbott_logo_2.png'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isFormWrong, setIsFormWrong] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsAuthenticating(true)

        let formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        fetch(API + '/token', {
            method: 'POST',
            body: formData,
            // credentials: 'include'
        })
            .then(response => {
                if (response.status != 200) {
                    setIsFormWrong(true)
                }
                return response.json()
            })
            .then(data => {
                if (data.access_token != null) {
                    setCookie('session_id', data.access_token, 0.04);
                    setCookie('display_name', data.display_name, 0.04);
                    navigate('/')
                } else {
                    deleteCookie('session_id');
                    deleteCookie('display_name');
                }
                setIsAuthenticating(false)
            })
    }

    return (
        <MainLayout>
            <main className="form-signin text-center m-5 row">
                <div className="col-md-4"></div>
                <form className="col-md-4" onSubmit={handleSubmit}>
                    <img className="mb-4" src={AbbottLogo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <br />
                    {isFormWrong && <p className="text-danger">* Invalid email or password</p>}
                    <div className="form-floating">
                        <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value.trim())} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="passwordInput" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value.trim())} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    {!isAuthenticating && <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign in</button>}
                    {isAuthenticating && <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit} disabled>Authenticating...</button>}
                    <p className="mt-5 mb-3 text-muted">© Abbott 2023</p>
                </form>
                <div className="col-md-4"></div>
            </main>
        </MainLayout>
    );
}

export default Login;