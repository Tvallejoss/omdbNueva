import React, { useState } from "react";
import "../style/formulario.css";
import { auth, db } from "../firebase/base";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
export const Register = () => {
    const History = useHistory();
    const [usuario, setUsuario] = useState({
        name: "",
        email: "",
        password: "",
    });
    const Register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
            .then((data) => {
                console.log("Registrado correctamente");

                db.collection("users")
                    .doc(data.user.uid)
                    .set({
                        email: usuario.email,
                        name: usuario.name,
                        favoritesMovies: [],
                    })
                    .then((data) => {
                        console.log("usuario subido a la db tambien!");
                        History.push("/login");
                    })
                    .catch((err) => {
                        console.log("usuario no subido a la db", err);
                    });
            })
            .catch((err) => {
                console.log("ERROR EN EL REGISTRO ", err);
            });
    };
    const inputRegister = (e) => {
        setUsuario({ ...usuario, [e.target.id]: e.target.value });
    };
    return (
        <div id="contenedor">
            <div id="central">
                <div id="login">
                    <div className="titulo">Welcome</div>
                    <form id="loginform" onSubmit={Register}>
                        <input
                            type="text"
                            id="name"
                            placeholder="Users"
                            onChange={inputRegister}
                            required
                        />

                        <input
                            type="text"
                            id="email"
                            placeholder =  "Email"
                            onChange={inputRegister}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            required
                            onChange={inputRegister}
                        />

                        <input type="submit" value = "Send"/>
                    </form>
                    <div className="pie-form">
                    <Link to="/login">Back</Link>
                       </div>
                </div>
                <div className="inferior">
                </div>
            </div>
        </div>
    );
};
