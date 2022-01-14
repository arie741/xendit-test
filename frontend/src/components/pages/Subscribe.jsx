import { useForm } from "react-hook-form";
import { useState } from "react";
import { addSubscribers } from "../../api/subscribers";

function Subscribe() {
  let [errorMessage, setErrorMessage] = useState();
  let [successMessage, setSucessMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    addSubscribers(data.email)
      .then((resp) => {
        if(resp.error){
          throw resp.response.response.data
        }
        setErrorMessage("")
        setSucessMessage("Your email is subscribed!")
      })
      .catch((error) => {
        setSucessMessage("")
        setErrorMessage(error.toString())
      });
  }

  function handleOnChange(){
    setErrorMessage("")
    setSucessMessage("")
  }
  return (
    <div className="container pt-10">
      <div className="text-3xl font-bold mb-5">Subscription</div>
      <div className="mb-5">Please subscribe to get more information from us!</div>
      <div className="font-bold">Type in your email</div>
      <form onSubmit={handleSubmit(onSubmit)} onChange={() => handleOnChange()}>
        <input
          name="email"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: true,
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="shadow-md border border-2 border-grey-100 rounded w-full p-4"
          type="text"
        />
        {errors.email && errors.email.type === "pattern" && (
          <div className="text-red-700 my-2">Email address is invalid.</div>
        )}
        {successMessage && (<div className="text-green-700 my-2">{successMessage}</div>)}
        {errorMessage && (<div className="text-red-700 my-2">{errorMessage}</div>)}
        <input
          className="cursor-pointer rounded py-2 bg-xendit text-xendit-lightest px-2 my-2"
          type="submit"
          value="Subscribe"
        />
      </form>
    </div>
  );
}

export default Subscribe;
