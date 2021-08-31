import React, { useState } from "react";
import "../style/formulario.css";
import { useDispatch } from "react-redux";
import { setUsuariolog } from "../store/users";
import { auth } from "../firebase/base";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();
    const History = useHistory();
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });

    const logIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(usuario.email, usuario.password)
            .then((data) => {
                console.log("usuario Logueado correctamente!");
                dispatch(setUsuariolog(data.user.uid));
                History.push("/");
                console.log(data.user);
            })
            .catch((err) => {
                console.log("usuario No logueado , ", err);
            });
    };

    const inputLogIn = (e) => {
        setUsuario({ ...usuario, [e.target.id]: e.target.value });
    };

    return (
        <div id="contenedor">
            <div id="central">
                <div id="login">
                    <div className="titulo">¡Welcome Back!</div>
                    <form id="loginform" onSubmit={logIn}>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            onChange={inputLogIn}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            required
                            onChange={inputLogIn}
                        />
                        <input type="submit" value="Send" />
                    </form>
                    <div className="pie-form">
                        <Link to="/">did you forget the password?</Link>
                        <Link to="/register">
                            You do not have an account? ¡Sign up!
                        </Link>
                    </div>
                </div>
                <div className="inferior">
                    <Link to="/">Back</Link>
                </div>
            </div>
        </div>
    );
};
