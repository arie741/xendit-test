import { addFavorite } from "../api/favorites";
import { useState } from "react";

function UniversityItem({ name, country, website, favbutton = false }) {
  let [favoriteMessage, setFavoriteMessage] = useState();
  function addToFavorites() {
    addFavorite(localStorage.getItem("xendit-email"), {
      name,
      country,
      web_pages: [website],
    }).then(() => {
      setFavoriteMessage("Added to favorites");
    });
  }

  return (
    <>
      <div className="flex flex-col py-4 px-2 rounded shadow-md bg-xendit-lightest">
        <div className="text-xl font-bold">{name}</div>
        <div>{country}</div>
        <div className="overflow-auto hide-scrollbar w-full">
          <a href={website} className="fit-content overflow-hidden text-xendit">
            {website}
          </a>
        </div>
        {favbutton && (
          <div
            onClick={() => addToFavorites()}
            className="cursor-pointer fit-content font-bold text-xendit"
          >
            Add to Favorites
          </div>
        )}
      </div>
      {favoriteMessage && (
        <div className="text-green-700 my-2 ml-2">{favoriteMessage}</div>
      )}
    </>
  );
}

export default UniversityItem;
