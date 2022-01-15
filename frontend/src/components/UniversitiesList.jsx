import { sortFunction } from "../helper_functions/sortFunctions";
import UniversityItem from "./UniversityItem";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function UniversitiesList({ universities, sortBy }) {
  //Paginations
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(
      universities
        .sort((a, b) => {
          return sortFunction(sortBy, a, b);
        })
        .slice(itemOffset, endOffset)
    );
    setPageCount(Math.ceil(universities.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, sortBy]);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % universities.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      
      {currentItems &&
        currentItems.map((item, index) => (
          <div className="mt-2" key={index}>
            <UniversityItem
              name={item.name}
              country={item.country}
              website={item.web_pages}
              favbutton={true}
            />
          </div>
        ))}
      <ReactPaginate
        className="flex flex-row space-x-2 mt-5 mb-10"
        pageLinkClassName="block text-xs md:text-md border border-2 border-gray-300 px-2 py-2 bg-gray rounded"
        activeLinkClassName="block text-xs md:text-md bg-xendit text-xendit-lightest border-xendit"
        previousLinkClassName="hidden md:block text-xs md:text-md bg-xendit text-xendit-lightest border border-2 border-xendit px-2 py-2 rounded"
        nextLinkClassName="hidden md:block text-xs md:text-md bg-xendit text-xendit-lightest border border-2 border-xendit px-2 py-2 rounded"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default UniversitiesList;
