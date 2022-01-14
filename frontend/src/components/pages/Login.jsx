import { useForm } from "react-hook-form";
import { validateUser } from "../../api/users";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  

  useEffect(() => {
    if(localStorage.getItem("xendit-email")){
        navigate("/");
    }

  }, [])

  function onSubmit(data) {
    validateUser(data.email, data.password)
      .then((response) => {
        if (response.response === true) {
          setErrorMessage("");
          localStorage.setItem("xendit-email", data.email);
          window.location.reload();
          navigate("/");
        } else {
          throw "You put the wrong email or password.";
        }
      })
      .catch((error) => setErrorMessage(error));
  }
  return (
    <div className="container pt-10">
      <div className="w-80 mx-auto border border-2 border-gray-200 shadow-xl p-4">
        <div className="font-bold text-3xl mb-10">Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="font-bold">Email</div>
          <input
            name="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            className="shadow-md border border-2 border-grey-100 rounded w-full p-4 mb-4"
            type="text"
          />
          <div className="font-bold">Password</div>
          <input
            className="shadow-md border border-2 border-grey-100 rounded w-full p-4 mb-4"
            {...register("password")}
            type="password"
            autoComplete="on"
            required
          />
          {errorMessage && (
            <div className="text-red-700 my-2">{errorMessage}</div>
          )}
          <input
            className="cursor-pointer rounded py-2 bg-xendit text-xendit-lightest px-2 my-2"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
