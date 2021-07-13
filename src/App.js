import { Box, Heading, Container } from "@chakra-ui/react"
import { useState } from "react"
import LoginInput from "./components/LoginInput"

import Dashboard from "./components/Dashboard"

const App = () => {
  const [username, setUsername] = useState("")
  const [isLogged, setIsLogged] = useState(false)

  return (
    <>
      <Box bg="black" minH="100vh">
        <Container textAlign="center">
          <Heading color="white" py="10" as="h1">
            Login Interface App
          </Heading>

          {isLogged ? (
            <Dashboard setIsLogged={setIsLogged} username={username} />
          ) : (
            <LoginInput
              setIsLogged={setIsLogged}
              username={username}
              setUsername={setUsername}
            />
          )}
        </Container>
      </Box>
    </>
  )
}

export default App
