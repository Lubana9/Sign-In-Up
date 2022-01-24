/* eslint-disable no-console */
import React, { useRef, useState, useEffect } from "react";

import "../../style/style.scss";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
const LOGIN_URL = "api/v1/auth/register";
const Authorization = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
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
        JSON.stringify({
          name: userName,
          phone: phone,
          email: user,
          password: pwd,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(JSON.stringify(response?.data));
      setUser("");
      setPwd("");
      setPhone("");
      setUserName("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        seterrMsg("Нет ответа");
      } else if (error.response?.status === 400) {
        seterrMsg("Отсутствует электронная почта или пароль");
      } else if (error.response?.status === 422) {
        seterrMsg("Пароль должен быть не менее 8 символов.");
      } else seterrMsg("registration failed ");
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1 className="sccess--header">Вы успешно зарегистрировались!</h1>
        </section>
      ) : (
        <></>
      )}
      {close ? (
        <> </>
      ) : (
        <section className="form">
          <div className="form__header">
            <Link to="/login">
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
              </button>{" "}
            </Link>

            <div> Регистрация </div>
            <button
              onClick={() => setClose(!close)}
              className="form__header__btn form__header__btn--close"
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
            <label htmlFor="username">Имя Фамилия</label>
            <input
              placeholder="Имя Фамилия"
              type="text"
              id="username"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              autoComplete="off"
              required
            />
            <label htmlFor="phone">Телефон</label>
            <input
              placeholder="Телефон"
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              autoComplete="off"
            />
            <button className="form__content__btn--login">
              Cоздать аккаунт
            </button>
          </form>
          <p
            ref={errorRef}
            className={errMsg ? "errmsg" : " offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </section>
      )}
    </>
  );
};

export default Authorization;
