import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../store/auth";
// importing auth provider which is a custom hook

const userData = {
  username: "",
  email: "",
  phone: "",
  password: "",
};

const Register = () => {
  const [user, setUser] = useState(userData);
  const navigate = useNavigate();

  const { storeTokenInLocalStorage } = useAuth();
  // getting storeTokenInLocalStorage from useAuth

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // const URL = "127.0.0.1:8000/api/auth/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response =
        // await fetch(`127.0.0.1:8000/api/auth/register` do not use url like this
        await fetch(`http://localhost:8000/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

      console.log(response);

      if (response.ok) {
        const response_data = await response.json();
        console.log(response_data);
        storeTokenInLocalStorage(response_data.token);
        // localStorage.setItem("token",response_data.token)  ---> this method works but we are using context api to use it
        setUser(userData);
        // alert("Successfully registered");
        navigate("/");
      }
    } catch (error) {
      console.log("register error", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="a girl is trying to do registration"
                  width="500"
                  height="500"
                />
              </div>

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration</h1>
                <br />

                <form method="POST" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter your phone_no"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default Register;
