export const transformAssociatedArtists = (data: any) => {
	return JSON.parse(data)?.results.bindings.map((el: any, index: number) => ({
		label: el.label?.value,
		id: index + 1,
		title: el.label?.value,
		abstract: el.abstract?.value,
		image: el.image?.value,
		wikiLink: el.wikiLink?.value,
		activeFrom: el.activeFrom?.value
	}))
}
