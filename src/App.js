import {
  FormControl,
  Input,
  InputGroup,
  Button,
  Box,
  Heading,
  Container,
  InputRightElement,
  FormLabel,
  Flex,
} from "@chakra-ui/react"
import { useState } from "react"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [confirmPW, setConfirmPW] = useState(0)

  return (
    <>
      <Box bg="black" minH="100vh">
        <Container textAlign="center">
          <Heading color="white" py="10" as="h1">
            Login Interface App
          </Heading>
          <FormControl mb="4">
            <FormLabel htmlFor="user">Username</FormLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              id="user"
              _placeholder={{ color: "gray" }}
              placeholder="joe87"
              bg="white"
              color="black"
              value={username}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="pass">Password</FormLabel>
            <InputGroup>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                color="black"
                id="pass"
                _placeholder={{ color: "gray" }}
                placeholder="***********"
                bg="white"
                type={show ? "text" : "password"}
                value={password}
              />
              <InputRightElement width="4.5rem">
                <Button
                  onClick={() => setShow(!show)}
                  h="1.75rem"
                  size="sm"
                  colorScheme="blackAlpha"
                >
                  Show
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {confirmPW !== 0 ? (
            <FormControl mb="4">
              <FormLabel htmlFor="confirm-pass">Confirm password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => setConfirmPW(e.target.value)}
                  color="black"
                  id="confirm-pass"
                  _placeholder={{ color: "gray" }}
                  placeholder="***********"
                  bg="white"
                  type={show ? "text" : "password"}
                  value={confirmPW}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    onClick={() => setShow(!show)}
                    h="1.75rem"
                    size="sm"
                    colorScheme="blackAlpha"
                  >
                    Show
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          ) : (
            ""
          )}
          <Flex justifyContent="space-between">
            <Button disabled={confirmPW !== 0} colorScheme="whatsapp">
              Login
            </Button>
            <Button
              onClick={
                confirmPW !== 0
                  ? () => console.log(confirmPW)
                  : () => setConfirmPW("")
              }
              colorScheme={confirmPW !== 0 ? "whatsapp" : "red"}
            >
              {confirmPW !== 0 ? "Register" : "Not registered yet?"}
            </Button>
            {confirmPW !== 0 ? (
              <Button onClick={() => setConfirmPW(0)} colorScheme="red">
                Cancel
              </Button>
            ) : (
              ""
            )}
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default App
