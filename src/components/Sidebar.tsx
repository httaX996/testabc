'use client';
import React from 'react'
import { Home, Film, Tv, Bookmark } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export default function Sidebar({scrollToTop} : {scrollToTop: () => void}) {
  const { fetchShows, fetchBookmarkedShows } = useAppContext()

  const navItems = [
    { icon: Home, label: 'Home', id: 'trending' },
    { icon: Film, label: 'Movies', id: 'movie' },
    { icon: Tv, label: 'TV Series', id: 'tv' },
    { icon: Bookmark, label: 'Bookmarked', id: 'bookmarked' },
  ]

  const handleNavClick = (id: string) => {
    scrollToTop();
    if (id === 'bookmarked') {
      fetchBookmarkedShows();
    } else {
      fetchShows(id as 'movie' | 'tv' | 'trending')
    }
  }
  

  return (
    <>
    <nav className="w-20 bg-zinc-900/80 lg:flex md:flex hidden lg:bloack flex-col items-center py-8 ">
      <div className="mb-8">
        {/* <img src="/logo.svg" alt="Logo" className="w-10 h-10" /> */}
      </div>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className="p-3 mb-4 rounded-lg hover:bg-gray-700"
        >
          <item.icon size={24} />
          <span className="sr-only">{item.label}</span>
        </button>
      ))}
    </nav>
      <div className='fixed bottom-4 left-[2.5rem] bg-zinc-900/80 text-white flex justify-around items-center
      z-40 w-[80%] px-3 py-2 rounded-full backdrop-blur md:hidden lg:hidden'>
        {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className="py-2 px-4 rounded-full hover:bg-gray-600/65"
        >
          <item.icon size={24} />
          <span className="sr-only">{item.label}</span>
        </button>
      ))}
      </div>
    </>
  )
}