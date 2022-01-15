import { getFavorites } from "../../api/favorites";
import { useEffect, useState } from "react";
import UniversityItem from "../UniversityItem";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("xendit-email")) {
      navigate("/");
    } else {
      getFavorites(localStorage.getItem("xendit-email"))
        .then((response) => {
          setFavorites(response.response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className="container pt-10">
      <div className="font-bold text-3xl">Favorites</div>
      {favorites && favorites.length !== 0 ? (
        favorites.map((item, index) => (
          <div key={index} className="mt-4">
            <UniversityItem
              name={item.name}
              country={item.country}
              website={item.web_pages[0]}
            />
          </div>
        ))
      ) : (
        <div className="text-2xl mt-10">You have no favorite universities, add some!</div>
      )}
    </div>
  );
}

export default Favorites;
