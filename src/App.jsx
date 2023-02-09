import React, { useState, useRef } from 'react'
import './App.css'
import {
  Box,
  Center,
  Heading,
  Card,
  CardBody,
  Flex,
  Image,
  Stack,
  Text,
  Divider,
  CardFooter,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Select,
  Skeleton,
  Spinner,
  useToast,
  Input,
  Link,
} from '@chakra-ui/react'
import axios from 'axios'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import reactLogo from './assets/react.svg'
import AppConfig from '../App.config'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [planet, setPlanet] = useState('')
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const captchaRef = useRef(null)
  const toast = useToast()

  const onSignUp = () => {
    setLoading(true)

    if (!token) {
      setLoading(false)
      toast({
        title: 'Error',
        position: 'bottom-right',
        description: 'You must verify the captcha.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      return
    }

    axios
      .post('/signup', {
        token,
      })
      .then(() => {
        toast({
          title: 'Account created',
          position: 'bottom-right',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
      })
      .catch(e => {
        const description = JSON.parse(e)
        toast({
          title: 'Error',
          position: 'bottom-right',
          description,
          status: 'error',
          duration: 2500,
          isClosable: true,
        })
      })
      .finally(() => {
        captchaRef.current.resetCaptcha()
        setToken(null)
        setLoading(false)
      })
  }

  const onGenerate = () => {
    setLoading(true)

    axios
      .get('/generate')
      .then(res => {
        setName(res.data.randomName)
        setEmail(res.data.randomEmail)
        setPlanet(res.data.randomPlanet)
        setPassword(res.data.randomPassword)
        setPasswordRepeat(res.data.randomPassword)
      })
      .catch(e => {
        const description = e
        toast({
          title: 'Error',
          position: 'bottom-right',
          description,
          status: 'error',
          duration: 2500,
          isClosable: true,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box className="App">
      {loading && (
        <Center
          position="absolute"
          width="100%"
          height="100%"
          backgroundColor="black"
          opacity="0.70"
          zIndex="999"
        >
          <Spinner color="#9368fe" size="xl" />
        </Center>
      )}
      <Center>
        <Link href="https://vitejs.dev" isExternal>
          <Image src="/vite.svg" className="logo" alt="Vite logo" />
        </Link>
        <Link href="https://reactjs.org" isExternal>
          <Image src={reactLogo} className="logo react" alt="React logo" />
        </Link>
      </Center>
      <Center>
        <Heading
          bgGradient="linear(to-l, #01d4fa, #9368fe)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
          width="fit-content"
        >
          hCaptcha test
        </Heading>
      </Center>
      <Center>
        <Card marginTop="2rem" maxW="sm">
          <CardBody>
            <Image
              src="https://source.unsplash.com/350x225/?space"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              height="220px"
              onLoad={() => setIsImageLoaded(true)}
              hidden={!isImageLoaded}
            />
            {!isImageLoaded && <Skeleton height="220px" borderRadius="lg" />}
            <Stack mt="6" spacing="3">
              <Heading fontSize="3xl">Join us</Heading>
              <Text fontSize="lg">
                Go on a wild space adventure and discover extraterrestrial life.
              </Text>
            </Stack>
            <FormControl marginTop="2rem" isRequired>
              <FormLabel>Full name</FormLabel>
              <Input
                value={name}
                onChange={e => setName(e.currentTarget.value)}
                placeholder="Full name"
              />
              <FormLabel marginTop="1rem">Email</FormLabel>
              <Input
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
                type="email"
                placeholder="Email"
              />
              <FormLabel marginTop="1rem">Password</FormLabel>
              <Input
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                type="password"
                placeholder="Password"
              />
              <FormLabel marginTop="1rem">Repeat password</FormLabel>
              <Input
                value={passwordRepeat}
                onChange={e => setPasswordRepeat(e.currentTarget.value)}
                type="password"
                placeholder="Enter your password again"
              />
              <FormLabel marginTop="1rem">Destination</FormLabel>
              <Select value={planet} placeholder="Select planet">
                <option onSelect={() => setPlanet('Mars')}>Mars</option>
                <option onSelect={() => setPlanet('Jupiter')}>Jupiter</option>
                <option onSelect={() => setPlanet('Uranus')}>Uranus</option>
              </Select>
              <Flex
                direction="row"
                align="center"
                justifyContent="center"
                backgroundColor="#f5f5f5"
                borderRadius="lg"
                padding="0.25rem 0"
                marginTop="1.5rem"
                boxSizing="border-box"
              >
                <HCaptcha
                  sitekey={AppConfig.hCaptchaSiteToken}
                  onVerify={t => setToken(t)}
                  onExpire={() => setToken(null)}
                  ref={captchaRef}
                />
              </Flex>
            </FormControl>
          </CardBody>
          <Divider color="blue.100" />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => onSignUp()}
              >
                Sign up
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={() => onGenerate()}
              >
                Generate
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Center>
    </Box>
  )
}

export default App
