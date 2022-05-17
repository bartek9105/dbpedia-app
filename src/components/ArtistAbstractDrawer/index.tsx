import {
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	DrawerBody,
	DrawerHeader,
	Image,
	Container,
	Text,
	Flex
} from '@chakra-ui/react'
import { Artist } from '../../types/Artist.type'
import { ExternalLinkIcon } from '@chakra-ui/icons'

type ArtistAbstractDrawerProps = {
	isOpen: boolean
	onClose: () => void
	artist: Artist | null
}

const ArtistAbstractDrawer = ({
	isOpen,
	onClose,
	artist
}: ArtistAbstractDrawerProps) => {
	const size = 'md'
	return (
		<Container p={4}>
			<Drawer isOpen={isOpen} size={size} onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{artist?.label}</DrawerHeader>
					<DrawerBody>
						<Image src={artist?.image} alt={artist?.label} mb={8} />
						<Flex alignItems='center'>
							<Text as='u' mb={8}>
								<a href={artist?.wikiLink} target='_blank' rel='noreferrer'>
									Wikipedia
								</a>
								<ExternalLinkIcon ml={2} />
							</Text>
						</Flex>
						<Text mb={4}>Abstract</Text>
						<p>{artist?.abstract}</p>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Container>
	)
}

export default ArtistAbstractDrawer
