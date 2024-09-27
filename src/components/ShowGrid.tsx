"use client";
import { Bookmark } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Show {
  id: number;
  title: string;
  name: string;
  original_name: string;
  poster_path: string | null;
  vote_average: number;
  media_type: "movie" | "tv";
}


interface ShowGridProps {
  shows: Show[];
}

const ShowGrid: React.FC<ShowGridProps> = ({ shows }) => {
  const { bookmarkedShows, toggleBookmark, isLoading } = useAppContext();
  const router = useRouter();

  function handleClick(show: Show, e: React.MouseEvent) {
    e.stopPropagation();
    toggleBookmark(show);
  }
  function handleShowClick(show: Show, e: React.MouseEvent) {
    e.stopPropagation();
    const path = `/show/${show.id}?type=${show.media_type}`;

    router.push(path);
  }
  
  // Skeleton loader component
  const SkeletonItem = () => (
    <div className="relative rounded-lg overflow-hidden bg-gray-700 animate-pulse px-8 gap-4">
      <div className="w-full h-64"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-600 rounded w-1/4"></div>
      </div>
    </div>
  );

  function EmptyBookmark() {
    return (
      <div className="text-center col-span-full place-items-center">
        <div className="flex items-center w-full h-full justify-center mt-10">
        <Bookmark className="size-10 text-red-400" />
        <h1 className="text-2xl font-semibold font-sans">Nothing here</h1>
        </div>
      </div>
    );}
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <SkeletonItem key={index} />
          ))
        : !shows.length ? <EmptyBookmark/> : (shows.map((show) => (
            <div
              onClick={(e: React.MouseEvent) => handleShowClick(show, e)}
              key={show.id}
              className="relative duration-150 hover:opacity-70 rounded-lg overflow-hidden cursor-pointer"
            >
              {show.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.title}
                  width={500}
                  height={750}
                  className="w-full h-auto duration-150 hover:scale-105 object-cover"
                />
              ) : (
                <div className="w-full h-0 pb-[150%] bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white text-sm font-semibold">
                  {show.title}
                </h3>
                {show.vote_average !== null && (
                  <p className="text-gray-300 text-xs">
                    Rating: {show?.vote_average?.toFixed(1)}
                  </p>
                )}
              </div>
              <button
                onClick={(e) => handleClick(show, e)}
                className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full"
              >
                <Bookmark
                  size={20}
                  className={bookmarkedShows.some(bookmark => bookmark.id === show.id)
                    ? "fill-red-500 text-gray-300"
                    : "text-gray-300"
                  }
                />
              </button>
            </div>
          )))}
    </div>
  );
};

export default ShowGrid;
