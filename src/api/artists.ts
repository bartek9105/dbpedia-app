import axios from 'axios'

export const getAssociatedArtists = (artist: string) => {
	return axios.get('https://dbpedia.org/sparql/', {
		params: {
			'default-graph-uri': 'http://dbpedia.org',
			query: `SELECT * WHERE {
				?artist rdfs:label "${artist}" @en ;
				^dbo:associatedBand ?value .
				?value rdfs:label ?label.
				FILTER (lang(?label) = "en")
				?value dbo:abstract ?abstract
				FILTER (lang(?abstract) = "en")
				?value <http://dbpedia.org/ontology/thumbnail> ?image ;
				foaf:isPrimaryTopicOf ?wikiLink
			} LIMIT 10`,
			format: 'application/sparql-results+json',
			timeout: 30000,
			signal_void: 'on',
			signal_unconnected: 'on'
		}
	})
}

export const getArtist = (artist: string) => {
	return axios.get('https://dbpedia.org/sparql/', {
		params: {
			'default-graph-uri': 'http://dbpedia.org',
			query: `
			SELECT * WHERE {
				?artist rdfs:label "${artist}" @en ;
							rdfs:label ?label.
							FILTER (lang(?label) = "en")
							?artist dbo:abstract ?abstract
							FILTER (lang(?abstract) = "en")
				?artist <http://dbpedia.org/ontology/thumbnail> ?image ;
							foaf:isPrimaryTopicOf ?wikiLink
			}
			`,
			format: 'application/sparql-results+json',
			timeout: 30000,
			signal_void: 'on',
			signal_unconnected: 'on'
		}
	})
}
