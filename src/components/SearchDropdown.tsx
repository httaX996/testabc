"use client";
// import React, { useEffect, useState } from "react";
// import { useAppContext } from "@/context/AppContext";
// import Link from "next/link";

interface SearchDropdownProps {
  isVisible: boolean;
}
interface Show {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number | null;
  media_type: string | null;
}
const SearchDropdown: React.FC<SearchDropdownProps> = ({ isVisible }) => {
  // const { searchQuery } = useAppContext();
  // const [data, setData] = useState<Show[]>([]);

  // useEffect(() => {
  //   // if (searchQuery) {
  //   //   searchShowsAPI(searchQuery)
  //   //     .then((data) => {
  //   //       setData(data:any);
  //   //     })
  //   //     .catch((error) => {
  //   //       console.error(error);
  //   //     });
  //   // }
  // }, [searchQuery]);
  // if (!isVisible || data.length === 0) {
  //   return null;
  // }

  return (
    <div className="absolute z-10 w-full bg-gray-800 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
      {/* {data.map((show) => (
        <Link
          href={`/show/${show.id}?type=${show.media_type}`}
          key={show.id}
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
        >
          <div className="font-semibold">{show.name}</div>
          {show.vote_average !== null && (
            <div className="text-sm text-yellow-400">
              Rating: {show.vote_average.toFixed(1)}
            </div>
          )}
        </Link>
      ))} */}
    </div>
  );
};

export default SearchDropdown;
