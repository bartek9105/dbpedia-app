import axios from 'axios'

const api = axios.create({
	baseURL: 'https://dbpedia.org/sparql/',
	params: {
		'default-graph-uri': 'http://dbpedia.org',
		format: 'application/sparql-results+json',
		timeout: 30000,
		signal_void: 'on',
		signal_unconnected: 'on'
	}
})

export default api
