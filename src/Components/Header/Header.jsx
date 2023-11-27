import { Box, Container, Heading } from "@chakra-ui/react"

const Header = () => {
  return(
    <Box as='header' bg='#112132' color='#aaccee' position='sticky' w='full' boxShadow='dark-lg'>
      <Container maxW='700px' textAlign={"center"}>
        <Heading>Tarea Clase 6</Heading>
        
      </Container>
    </Box>
  )
}

export { Header }