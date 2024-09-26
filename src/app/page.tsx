'use client';
import React, { useState, useEffect, useRef } from 'react'
import { Search} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import ShowGrid from '@/components/ShowGrid'
import { useAppContext } from '@/context/AppContext'

export default function App() {
	const { searchQuery, setSearchQuery, fetchShows, searchShows, shows } = useAppContext()
	// const [isDropdownVisible, setIsDropdownVisible] = useState(false)

	useEffect(() => {
		fetchShows('trending')
	}, [])

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
		// setIsDropdownVisible(true)
		if (e.target.value) {
			searchShows(e.target.value)
		} else {
			fetchShows('trending')
			scrollToTop()
		}
	}
	const refScroll = useRef<HTMLDivElement>(null)

	function scrollToTop() {
		refScroll.current?.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div ref={refScroll} className="flex h-screen bg-gradient-to-tr from-[#1b1f41]  to-zinc-950 bg-gray-900 text-white ">
			<Sidebar scrollToTop={scrollToTop} />
			<main className="flex-1 overflow-y-auto">
				<div className="p-6">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
						<h1 className="text-3xl font-bold mb-4 md:mb-0 bg-gradient-to-r from-purple-300 to-blue-500 text-transparent bg-clip-text">MovieMax</h1>
						<div className="relative w-full md:w-auto">
							<input
								type="text"
								placeholder="Search"
								className="w-full lg:w-96 md:w-64 bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
								value={searchQuery}
								onChange={handleSearch}
							/>
							<Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
							{/* <SearchDropdown
								isVisible={isDropdownVisible}
							/> */}
						</div>
					</div>
					<div className="flex flex-wrap gap-2 mb-6">
						{['TV Shows', 'Movies', 'Trending'].map((filter) => (
							<button
								key={filter}
								className="bg-gray-800 hover:bg-gray-700 rounded-full px-4 py-2 text-sm"
								onClick={() => fetchShows(filter.toLowerCase() as 'tv' | 'movie' | 'trending')}
							>
								{filter}
							</button>
						))}
					</div>
					<ShowGrid shows={shows} />
				</div>
			</main>
			
		</div>
	)
}