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
      {favorites ? (
        favorites.map((item, index) => (
          <UniversityItem
            key={index}
            name={item.name}
            country={item.country}
            website={item.web_pages[0]}
          />
        ))
      ) : (
        <div className="font-bold text-2xl">Favorites</div>
      )}
    </div>
  );
}

export default Favorites;
