import { Input, Button, Flex, Container, Text } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useGetArtists } from './hooks/useGetArtists'
import ArtistAbstractDrawer from './components/ArtistAbstractDrawer'
import GraphNode from './components/GraphNode'
import { Graph } from 'react-d3-graph'
import { graphConfig } from './config/graph.config'
import './App.css'
import { associatedArtistsGraphId } from './constants/graph.constant'

function App() {
	const [searchTerm, setSearchTerm] = useState<string | null>(null)
	const { artistInfo, artists, getArtists, getArtistInfo } =
		useGetArtists(searchTerm)
	const [selectedArtistData, setSelectedArtistData] = useState<any>()

	const [isDrawerOpened, setIsDrawerOpened] = useState(false)

	const nodes = [
		{
			id: artistInfo?.[0]?.label,
			viewGenerator: () => <GraphNode imgUrl={artistInfo?.[0]?.image} />,
			position: 'center',
			meta: { ...artistInfo?.[0] }
		},
		...artists?.map((artist: any) => {
			return {
				id: artist.label,
				viewGenerator: () => <GraphNode imgUrl={artist.image} />,
				meta: { ...artist }
			}
		})
	]

	const data = {
		nodes,
		links: artists?.map((artist: any) => {
			return {
				source: artistInfo?.[0]?.label,
				target: artist.label
			}
		})
	}

	const onClickNode = (nodeId: any) => {
		const selectedArtist = nodes?.find((artist: any) => artist.id === nodeId)
		setSelectedArtistData(selectedArtist.meta)
		setIsDrawerOpened(true)
	}

	const handleInputChange = useCallback((input: string) => {
		setSearchTerm(input)
	}, [])

	const artistsFound = artistInfo.length > 0 && artists.length > 0

	return (
		<div className='App'>
			<Container py={4}>
				<Flex>
					<Input
						placeholder='Search for an artist...'
						onChange={(e) => handleInputChange(e.target.value)}
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
			{artistsFound ? (
				<Graph
					id={associatedArtistsGraphId}
					data={data}
					config={graphConfig}
					onClickNode={onClickNode}
				/>
			) : (
				<Container>
					<Text>No artists found</Text>
				</Container>
			)}
			<ArtistAbstractDrawer
				artist={selectedArtistData}
				isOpen={isDrawerOpened}
				onClose={() => setIsDrawerOpened(false)}
			/>
		</div>
	)
}

export default App
