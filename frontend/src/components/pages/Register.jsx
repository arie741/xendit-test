import { useForm } from "react-hook-form";
import { addUser } from "../../api/users";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  function onSubmit(data) {
    if (data.password === data.confirmpassword) {
      addUser(data.email, data.password)
        .then((response) => {
          if (response.error) {
            throw response.response;
          }
          setErrorMessage("");
          setSuccessMessage("Your Account is Created!");
        })
        .catch((error) =>
          setErrorMessage(error.toString())
        );
    } else {
      setErrorMessage("Your password doesn't match");
    }
  }
  return (
    <div className="container pt-10">
      <div className="w-80 mx-auto border border-2 border-gray-200 shadow-xl p-4">
        <div className="font-bold text-3xl mb-10">Register</div>
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
            {...register("password", { minLength: 5 })}
            type="password"
            autoComplete="on"
            required
          />
          <div className="font-bold">Confirm password</div>
          <input
            className="shadow-md border border-2 border-grey-100 rounded w-full p-4 mb-4"
            {...register("confirmpassword", { minLength: 5 })}
            type="password"
            autoComplete="on"
            required
          />
          {errors.email && errors.email.type === "pattern" && (
            <div className="text-red-700 my-2">Email address is invalid.</div>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <div className="text-red-700 my-2">Password must be longer than 5 characters.</div>
          )}
          {errorMessage && (
            <div className="text-red-700 my-2">{errorMessage}</div>
          )}
          <input
            className="cursor-pointer rounded py-2 bg-xendit text-xendit-lightest px-2 my-2"
            type="submit"
            value="Register"
          />
          {successMessage && (
            <div className="text-green-700 my-2">
              {successMessage}{" "}
              <NavLink className="text-xendit font-bold" to="/login">
                Login
              </NavLink>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
