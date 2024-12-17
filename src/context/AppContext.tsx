"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface Show {
  id: number;
  title: string;
  name: string;
  original_name: string;
  poster_path: string | null;
  vote_average: number;
  media_type: "movie" | "tv";
}

interface AppContextType {
  shows: Show[];
  bookmarkedShows: Show[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleBookmark: (show: Show) => void;
  setBookmarkedShows: (bookmarkedShows: Show[]) => void;
  fetchShows: (type: "movie" | "tv" | "trending") => Promise<void>;
  fetchBookmarkedShows: () => void;
  searchShows: (query: string) => Promise<void>;
  searchShowsAPI: (query: string) => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
export const searchShowsAPI = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });

    return response.data.results.map((item: Show) => ({
      id: item.id,
      name: item.title || item.name,
      poster_path: item.poster_path,
      vote_average: item.vote_average || null,
    }));
  } catch (error) {
    console.error("Error searching shows:", error);
    return [];
  }
};
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [bookmarkedShows, setBookmarkedShows] = useState<Show[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const searchShows = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      setShows(data.results);
    } catch (error) {
      console.error("Error searching shows:", error);
    }
  };

  const fetchBookmarkedShows = async () => {
    setIsLoading(true);
    const getBookmarkedShows = localStorage.getItem("bookmarkedShows");
    const data = getBookmarkedShows ? JSON.parse(getBookmarkedShows) : [];
    setBookmarkedShows(data);
    setShows(data);
    setIsLoading(false);
  };

  const fetchShows = async (type: "movie" | "tv" | "trending") => {
    let url = "";
    setIsLoading(true);
    switch (type) {
      case "movie":
        url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
        break;
      case "tv":
        url = `${BASE_URL}/tv/popular?api_key=${API_KEY}`;
        break;
      case "trending":
        url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;
        break;
      default:
        url = `${BASE_URL}/tv/popular?api_key=${API_KEY}`;
        break
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setShows(
        data.results.map((item: Show) => ({
          ...item,
          title: item.title || item.name,
          media_type: item.media_type || type,
        }))
      );
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setIsLoading(false);
    }
    setBookmarkedShows(JSON.parse(localStorage.getItem("bookmarkedShows") || "[]"));
  };

  const toggleBookmark = (show: Show) => { // Change parameter to Show object
    const updatedBookmarkedShows = bookmarkedShows.some((bookmarkedShow) => bookmarkedShow.id === show.id)
      ? bookmarkedShows.filter((bookmarkedShow) => bookmarkedShow.id !== show.id)
      : [...bookmarkedShows, {...show , media_type: show.media_type as "movie" | "tv"}];
    setBookmarkedShows(updatedBookmarkedShows);
    localStorage.setItem(
      "bookmarkedShows",
      JSON.stringify(updatedBookmarkedShows)
    );
  };


  useEffect(() => {
    fetchShows("trending");
    setBookmarkedShows(JSON.parse(localStorage.getItem("bookmarkedShows") || "[]"));
  }, []);

  return (
    <AppContext.Provider
      value={{
        shows,
        bookmarkedShows,
        fetchBookmarkedShows,
        searchQuery,
        setSearchQuery,
        toggleBookmark,
        isLoading,
        searchShows,
        fetchShows,
        searchShowsAPI,
        setBookmarkedShows
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
