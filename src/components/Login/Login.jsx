/* eslint-disable no-console */
import React, { useRef, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "../../api/axios";
import "../../style/style.scss";
const LOGIN_URL = "api/v1/auth/login";
const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [close, setClose] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    seterrMsg("");
  }, [user, pwd]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        seterrMsg("no response");
      } else if (error.response?.status === 400) {
        seterrMsg("Missing email or password");
      } else if (error.response?.status === 401) {
        seterrMsg("Unautherized");
      } else seterrMsg("Login Faild");
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1 className="sccess--header">Вы вошли</h1>
        </section>
      ) : (
        <></>
      )}
      {close ? (
        <></>
      ) : (
        <section className="form">
          <p
            ref={errorRef}
            className={errMsg ? "errmsg" : " offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="form__header">
            <Link to="/home">
              {" "}
              <button className="form__header__btn form__header__btn--back">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#2e353b"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                </svg>
              </button>
            </Link>

            <div>Вход </div>
            <button
              className="form__header__btn form__header__btn--close"
              onClick={() => setClose(!close)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
          <form onSubmit={handelSubmit} className="form__content">
            <label htmlFor="email">E-mail</label>
            <input
              placeholder="E-mail"
              type="email"
              id="email"
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              autoComplete="off"
            />
            <label htmlFor="password">Пароль</label>
            <input
              placeholder="Пароль"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="form__content__btn--login">Войти</button>
            <div className="form__pwd-f">забыл пароль?</div>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
