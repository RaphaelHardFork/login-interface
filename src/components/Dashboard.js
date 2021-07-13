import { Button, Heading } from "@chakra-ui/react"

const Dashboard = ({ username, setIsLogged }) => {
  return (
    <>
      <Heading color="purple.100" mb="4">
        Welcome {username}
      </Heading>
      <Button colorScheme="messenger" onClick={() => setIsLogged(false)}>
        Log out
      </Button>
    </>
  )
}

export default Dashboard
