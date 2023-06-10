import axios from "axios";
import React, { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const terms = document.getElementById("terms");
    const nameError = document.querySelector(".name.error");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordControlError = document.querySelector(
      ".password-controller.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordControlError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) {
        passwordControlError.innerHTML =
          "Les mots de passe ne sont pas conforment";
        };
      if (!terms.checked) {
        termsError.innerHTML = "Veuillez valider les conditions générales";
        }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}user/signup`,
        withCredentials: true,
        data: {
          name,
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            nameError.innerHTML = res.data.errors.name;
            emailError.innerHTML = res.data.errors.email;
            pseudoError.innerHTML = res.data.errors.pseudo;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            window.location = '/';
        }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h2 className="log-title">Inscription</h2>
      <form action="post" onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required="required"
          />
          <label className="control-label" htmlFor="name">
            nom
          </label>
          <i className="mtrl-select"></i>
          <span className="name error"></span>
        </div>

        <div className="form-group">
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            required="required"
          />
          <label className="control-label" htmlFor="pseudo">
            pseudo
          </label>
          <i className="mtrl-select"></i>
          <span className="pseudo error"></span>
        </div>

        <div className="form-group">
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required="required"
          />
          <label className="control-label" htmlFor="email">
            email
          </label>
          <i className="mtrl-select"></i>
          <span className="email error"></span>
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required="required"
          />
          <label className="control-label" htmlFor="password">
            mot de passe
          </label>
          <i className="mtrl-select"></i>
          <span className="password error"></span>
        </div>

        <div className="form-group">
          <input
            type="password"
            id="controlPassword"
            name="controlPassword"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
            required="required"
          />
          <label className="control-label" htmlFor="controlPassword">
            confirmer le mot de passe
          </label>
          <i className="mtrl-select"></i>
          <span className="password-controller error"></span>
        </div>

        <div>
          <label htmlFor="terms">
            <input type="checkbox" id="terms"/>
            
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgb(31, 182, 255)" }}
            >
              Accepter les termes et Conditions d'utilisation?
            </a>
          </label>
          <span className="terms error"></span>
        </div>
        <div className="submit-btns">
          <button className="mtr-btn" type="submit">
            <span>valider</span>
          </button>
        </div>
      </form>
      <br />
    </div>
  );
};

export default SignUpForm;
