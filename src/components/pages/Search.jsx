import { getUniversity } from "../../api/university";
import { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UniversityItem from "../UniversityItem";
import { useForm } from "react-hook-form";
import countryList from "../../utilities/countryList";

function Search() {
  let [universities, setUniverisities] = useState();
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setLoading(true);
    setErrorMessage("");
    if (data.name.length !== 0 || data.country.length !== 0) {
      getUniversity(data.name, data.country)
        .then((resp) => {
          setLoading(false);
          if (resp.error) {
            setUniverisities([]);
            throw resp.message;
          } else {
            setUniverisities(resp.response.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(error.toString());
        });
    } else {
      setUniverisities([]);
      setLoading(false);
    }
  }

  return (
    <div className="container pt-10">
      <div className="text-3xl font-bold">Search universities</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="shadow-md border border-2 border-grey-100 rounded w-full p-4"
          {...register("name")}
        />
        <div className="flex flex-row mt-2">
          <div className="pt-2">Country: </div>
          <select className="w-full rounded h-10 ml-2 bg-xendit-lightest border border-2 border-grey shadow-md" {...register("country")}>
              <option value=""></option>
            {countryList.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          value="Find Universities"
          className="rounded py-2 bg-xendit text-xendit-lightest px-2 my-2"
        />
      </form>

      {loading ? (
        <div className="absolute-center">
          <Circles type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
      ) : universities ? (
        universities.slice(0, 50).map((item, index) => (
          <div className="mt-2" key={index}>
            <UniversityItem
              name={item.name}
              country={item.country}
              website={item.web_pages}
            />
          </div>
        ))
      ) : (
        ""
      )}
      {errorMessage && errorMessage}
    </div>
  );
}

export default Search;
