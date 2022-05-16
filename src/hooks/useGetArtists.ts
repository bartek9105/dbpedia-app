import { useState } from 'react'
import { getAssociatedArtists } from '../api/artists'
import { v4 as uuid } from 'uuid'

export const useGetArtists = (searchTerm: string) => {
	const [artists, setArtists] = useState([])

	const getArtists = async () => {
		if (searchTerm) {
			const getArtists: any = await getAssociatedArtists(searchTerm)
			const data = getArtists.data.results.bindings
			setArtists(
				data.map((el: any, index: number) => {
					return {
						label: el.label.value,
						id: index + 1,
						title: el.label.value,
						abstract: el.abstract.value,
						image: el.image.value,
					}
				})
			)
		}
	}

	return {
		artists,
		getArtists
	}
}
