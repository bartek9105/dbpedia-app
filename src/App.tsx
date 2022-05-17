import { Input, Button, Flex, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { useGetArtists } from './hooks/useGetArtists'
import ArtistAbstractDrawer from './components/ArtistAbstractDrawer'
import GraphNode from './components/GraphNode'
import { Artist } from './types/Artist.type'
import { Graph } from 'react-d3-graph'
import { graphConfig } from './config/graph.config'
import './App.css'

function App() {
	const [searchTerm, setSearchTerm] = useState<string | null>(null)
	const { testing, artists, getArtists, getArtistInfo } =
		useGetArtists(searchTerm)
	const [selectedArtistData, setSelectedArtistData] = useState<Artist | null>(
		null
	)
	const [isDrawerOpened, setIsDrawerOpened] = useState(false)

	const nodes = [
		{
			id: testing?.[0]?.label,
			viewGenerator: () => <GraphNode imgUrl={testing?.[0]?.image} />,
			position: 'center'
		},
		...artists?.map((artist: any) => {
			return {
				id: artist.label,
				viewGenerator: () => <GraphNode imgUrl={artist.image} />
			}
		})
	]

	const data = {
		nodes,
		links: artists?.map((artist: any, index: number) => {
			return {
				source: testing?.[0]?.label,
				target: artist.label
			}
		})
	}

	const onClickNode = (nodeId: any) => {
		const selectedArtist = artists?.find(
			(artist: any) => artist.label === nodeId
		)
		if (selectedArtist) setSelectedArtistData(selectedArtist)
		setIsDrawerOpened(true)
	}

	return (
		<div className='App'>
			<Container py={4}>
				<Flex>
					<Input
						placeholder='Search for an artist...'
						onChange={(e) => setSearchTerm(e.target.value)}
						mr={8}
					/>
					<Button
						colorScheme='blue'
						onClick={() => {
							getArtists()
							getArtistInfo()
						}}
						disabled={!searchTerm}
					>
						Search
					</Button>
				</Flex>
			</Container>
			{testing.length > 0 && artists.length > 0 ? (
				<Graph
					id='graph-id'
					data={data}
					config={graphConfig}
					onClickNode={onClickNode}
				/>
			) : null}
			<ArtistAbstractDrawer
				artist={selectedArtistData}
				isOpen={isDrawerOpened}
				onClose={() => setIsDrawerOpened(false)}
			/>
		</div>
	)
}

export default App
