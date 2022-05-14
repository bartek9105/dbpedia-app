import { useState } from 'react'
import { getAssociatedArtists } from '../api/artists'

export const useGetArtists = (searchTerm: string) => {
	const [artists, setArtists] = useState([])

	const getArtists = async () => {
		if (searchTerm) {
			const getArtists: any = await getAssociatedArtists(searchTerm)
			const data = getArtists.data.results.bindings
			setArtists(data.map((el: any) => el.label.value))
		}
	}

	return {
		artists,
		getArtists
	}
}
