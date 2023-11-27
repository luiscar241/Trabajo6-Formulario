import { Box, Container, Heading } from "@chakra-ui/react"

const Header = () => {
  return(
    <Box as='header' bg='#dc3545' color='#343a40' position='sticky' w='full' boxShadow='slate-50'>
      <Container maxW='650px' textAlign={"center"}>
        <Heading>Trabajo Practico Nº 6</Heading>
        
      </Container>
    </Box>
  )
}

export { Header }