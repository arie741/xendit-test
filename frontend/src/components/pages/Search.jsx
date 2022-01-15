import { getUniversity } from "../../api/university";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useForm } from "react-hook-form";
import countryList from "../../utilities/countryList";
import UniversitiesList from "../UniversitiesList";

function Search() {
  let [universities, setUniverisities] = useState();
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState();
  let [sortType, setSortType] = useState("name");
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    setLoading(true);
    setErrorMessage("");
    getUniversity(data.name, data.country)
      .then((resp) => {
        if (resp.error) {
          setUniverisities([]);
          throw resp.response;
        } else {
          setUniverisities(resp.response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setErrorMessage(error.toString());
        setLoading(false);
      });
  }

  return (
    <div className="container pt-10">
      <div className="text-3xl font-bold mb-5">Find universities</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font-bold">Name</div>
        <input
          type="text"
          className="shadow-md border border-2 border-grey-100 rounded w-full p-4"
          {...register("name")}
          data-testid="input-name"
        />
        <div className="mt-2">
          <div className="pt-2 font-bold">Country</div>
          <select
            data-testid="input-country"
            className="w-full rounded h-10 bg-xendit-lightest border border-2 border-grey shadow-md"
            {...register("country")}
          >
            <option value="">Any Countries</option>
            {countryList.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <input
          data-testid="submit-button"
          type="submit"
          value="Find Universities"
          className="rounded py-2 bg-xendit text-xendit-lightest px-2 my-2 cursor-pointer"
        />
      </form>

      {loading ? (
        <div className="absolute-center">
          <Circles type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
      ) : universities ? (
        <div className="mt-10">
          <div>
            <div className="font-bold">Sort by</div>
            <select className="rounded h-10 bg-xendit-lightest border border-2 border-grey shadow-md" onChange={(event) => setSortType(event.target.value)}>
              <option value="name">Name</option>
              <option value="country">Country</option>
            </select>
          </div>
          <div data-testid="universities-list"><UniversitiesList universities={universities} sortBy={sortType}/></div>
        </div>
      ) : (
        ""
      )}
      {errorMessage && <div className="mt-5 font-bold text-lg text-red-700">{errorMessage}</div>}
    </div>
  );
}

export default Search;
