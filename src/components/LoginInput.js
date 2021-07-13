import axios from "axios"
import { ethers } from "ethers"
import {
  FormControl,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  FormLabel,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import { useState } from "react"

const LoginInput = ({ username, setUsername, setIsLogged }) => {
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [confirmPW, setConfirmPW] = useState(0)
  const [alert, setAlert] = useState("")

  async function register() {
    let response
    try {
      let body = {}
      body[username] = ethers.utils.id(password)
      body = JSON.stringify(body)
      response = await axios.post(
        `http://localhost:3333/register/${username}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        setPassword("")
        setConfirmPW(0)
        setAlert(`Success: ${username} is well registered!`)
      }
    } catch (e) {
      console.error(e)
      if (e.message === "Request failed with status code 409") {
        let user = username
        setUsername("")
        setAlert(`Failed: "${user}" is already chosen...`)
      } else {
        setPassword("")
        setConfirmPW(0)
        setAlert(`Failed: Something went wrong...`)
      }
    }
  }

  async function login() {
    try {
      let body = {}
      body[username] = ethers.utils.id(password)
      body = JSON.stringify(body)
      let response = await axios.post(
        `http://localhost:3333/login/${username}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        setPassword("")
        setIsLogged(true)
      }
    } catch (e) {
      console.error(e)
      setPassword("")
      setAlert(`Failed: Username or password is incorrect...`)
    }
  }

  function handleChangeInput(e) {
    setAlert("")
    switch (e.target.id) {
      case "user":
        setUsername(e.target.value)
        break
      case "pass":
        setPassword(e.target.value)
        break
      case "confirm-pass":
        setConfirmPW(e.target.value)
        break
      default:
        setAlert("Failed: wrong input...")
    }
  }
  return (
    <>
      <FormControl mb="4">
        <FormLabel htmlFor="user">Username</FormLabel>
        <Input
          onChange={handleChangeInput}
          id="user"
          _placeholder={{ color: "gray" }}
          placeholder="joe87"
          bg="white"
          color="black"
          value={username}
          isInvalid={username === ""}
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel htmlFor="pass">Password</FormLabel>
        <InputGroup>
          <Input
            onChange={handleChangeInput}
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
              onChange={handleChangeInput}
              color="black"
              id="confirm-pass"
              _placeholder={{ color: "gray" }}
              placeholder="***********"
              bg="white"
              type={show ? "text" : "password"}
              value={confirmPW}
              isInvalid={password !== confirmPW}
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
      {alert ? (
        <Alert status={alert.startsWith("Failed") ? "error" : "success"} mb="4">
          <AlertIcon />
          {alert}
        </Alert>
      ) : (
        ""
      )}
      <Flex justifyContent="space-between">
        <Button
          onClick={login}
          disabled={confirmPW !== 0}
          colorScheme="whatsapp"
        >
          Login
        </Button>
        <Button
          disabled={
            confirmPW !== 0
              ? password !== confirmPW || username === "" || password.length < 7
              : false
          }
          onClick={confirmPW !== 0 ? () => register() : () => setConfirmPW("")}
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
    </>
  )
}

export default LoginInput
