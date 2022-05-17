import { Image } from '@chakra-ui/react'

const GraphNode = ({ imgUrl }: any) => {
	return <Image src={imgUrl} fallbackSrc='https://via.placeholder.com/150/' />
}

export default GraphNode
