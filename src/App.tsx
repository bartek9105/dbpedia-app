import { Input, Button, Flex, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { useGetArtists } from './hooks/useGetArtists'
import Graph from 'react-vis-network-graph'
import { v4 as uuid } from 'uuid'
import { NodeFlags } from 'typescript'

function App() {
	const [searchTerm, setSearchTerm] = useState('Michael Jackson')
	const { artists, getArtists } = useGetArtists(searchTerm)

	const edges = artists.map((artist, index) => {
		return {
			from: 1,
			to: index + 1
		}
	})
	console.log(edges)
	console.log(artists)

	const graph = {
		nodes: artists,
		edges: edges
	}
	const options = {
		layout: {
			hierarchical: false
		},
		edges: {
			color: '#000000'
		},
		height: '500px'
	}
	const event = {
		select: ({nodes} : {nodes:any}) => {
			alert(artists[nodes-1]["abstract"])
		}
	}

	return (
		<div className='App'>
			<Container p={2}>
				<Flex>
					<Input
						placeholder='Search for an artist...'
						onChange={(e) => setSearchTerm(e.target.value)}
						mr={16}
					/>
					<Button colorScheme='blue' onClick={() => getArtists()}>
						Search
					</Button>
				</Flex>
			</Container>
			<Graph graph={graph} options={options} events={event} key={uuid()} />
		</div>
	)
}

export default App
