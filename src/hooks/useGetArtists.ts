import { useState } from 'react'
import { getArtist, getAssociatedArtists } from '../api/artists'

export const useGetArtists = (searchTerm: string | null) => {
	const [artists, setArtists] = useState<any>([])
	const [artist, setArtist] = useState<any>([])

	const getArtists = async () => {
		if (searchTerm) {
			const getArtists: any = await getAssociatedArtists(searchTerm)
			const data = getArtists.data.results.bindings
			setArtists(
				data?.map((el: any, index: number) => {
					return {
						label: el.label?.value,
						id: index + 1,
						title: el.label?.value,
						abstract: el.abstract?.value,
						image: el.image?.value,
						wikiLink: el.wikiLink?.value,
						activeFrom: el.activeFrom?.value
					}
				})
			)
		}
	}

	const getArtistInfo = async () => {
		if (searchTerm) {
			const getArtists: any = await getArtist(searchTerm)
			const data = getArtists.data.results.bindings
			setArtist(
				data?.map((el: any, index: number) => {
					return {
						label: el.label?.value,
						id: index + 1,
						title: el.label?.value,
						abstract: el.abstract?.value,
						image: el.image?.value,
						wikiLink: el.wikiLink?.value,
						activeFrom: el.activeFrom?.value
					}
				})
			)
		}
	}

	return {
		testing: artist,
		artists,
		getArtists,
		getArtistInfo
	}
}
