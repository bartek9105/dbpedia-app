import api from '../../config/api.config'
import { transformAssociatedArtists } from './artists.transformer'

export const getAssociatedArtists = (artist: string) => {
	return api.get('', {
		params: {
			query: `SELECT * WHERE {
					?artist rdfs:label "${artist}" @en ;
					^dbo:associatedBand ?value .
					?value rdfs:label ?label.
					FILTER (lang(?label) = "en")
					?value dbo:abstract ?abstract
					FILTER (lang(?abstract) = "en")
					?value <http://dbpedia.org/ontology/thumbnail> ?image ;
					foaf:isPrimaryTopicOf ?wikiLink
				} LIMIT 10`
		},
		transformResponse: (data) => transformAssociatedArtists(data)
	})
}

export const getArtist = (artist: string) => {
	return api.get('', {
		params: {
			query: `
			SELECT * WHERE {
				?artist rdfs:label "${artist}" @en ;
							rdfs:label ?label.
							FILTER (lang(?label) = "en")
							?artist dbo:abstract ?abstract
							FILTER (lang(?abstract) = "en")
				?artist <http://dbpedia.org/ontology/thumbnail> ?image ;
							foaf:isPrimaryTopicOf ?wikiLink
			}`
		},
		transformResponse: (data) => transformAssociatedArtists(data)
	})
}
