import { getUniversity } from "../../api/university";
import { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UniversityItem from "../UniversityItem";

function Home() {
  let [universities, setUniverisities] = useState();
  let [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    let isMounted = true;
    getUniversity("", "Indonesia")
      .then((resp) => {
        if (resp.error) {
          setUniverisities([]);
          throw resp.message;
        } else {
          if (isMounted) setUniverisities(resp.response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.toString());
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container pt-10">
      <div className="text-3xl font-bold">Universities in Indonesia</div>
      {universities ? (
        universities.map((item, index) => (
          <div className="mt-2" key={index}>
            <UniversityItem
              name={item.name}
              country={item.country}
              website={item.web_pages}
            />
          </div>
        ))
      ) : (
        <div className="absolute-center">
          <Circles type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default Home;
