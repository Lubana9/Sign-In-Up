/* eslint-disable no-console */
import { useState, useRef, useEffect } from "react";

import { Link, NavLink } from "react-router-dom";

import axios from "../../api/axios";
import Icons from "../Icons";
import Login from "../Login";
const LOGIN_URL = "api/v1/auth/check-email";
const CheckEmail = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [close, setClose] = useState(false);
  useEffect(() => {
    seterrMsg("");
  }, [user, pwd]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user }),
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
      } else seterrMsg("Login Faild");
    }
  };
  return (
    <>
      {success ? (
        <>
          <Login />
        </>
      ) : (
        <>
          {close ? (
            <> </>
          ) : (
            <section className="form">
              <p
                className={errMsg ? "errmsg" : " offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <div className="form__header">
                <div>Вход или регистрация </div>

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
                  name="email"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  autoComplete="off"
                />
                <button className="form__content__btn--login">
                  Продолжить
                </button>
              </form>
              <div className="form__social">
                <div className="form__social--line">Или</div>
                <Icons />
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default CheckEmail;
