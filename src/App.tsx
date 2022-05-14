import { Input, Button, Flex, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { useGetArtists } from './hooks/useGetArtists'

function App() {
	const [searchTerm, setSearchTerm] = useState('')
	const { artists, getArtists } = useGetArtists(searchTerm)

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
				<ul>
					{artists?.map((artist) => (
						<li>{artist}</li>
					))}
				</ul>
			</Container>
		</div>
	)
}

export default App
