import { useState } from 'react'
import { getArtist, getAssociatedArtists } from '../api/artists/artists.api'

export const useGetArtists = (searchTerm: string | null) => {
	const [artists, setArtists] = useState<any>([])
	const [artist, setArtist] = useState<any>([])

	const getArtists = async () => {
		if (searchTerm) {
			const artistsData: any = await getAssociatedArtists(searchTerm)
			setArtists(artistsData.data)
		}
	}

	const getArtistInfo = async () => {
		if (searchTerm) {
			const artistData: any = await getArtist(searchTerm)
			setArtist(artistData.data)
		}
	}

	return {
		testing: artist,
		artists,
		getArtists,
		getArtistInfo
	}
}
