import React, { useState, useRef, useEffect } from 'react';
import './App.css';
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
} from '@chakra-ui/react';
import axios from 'axios';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import reactLogo from './assets/react.svg';
import AppConfig from '../App.config';

function App() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (token) { console.log(`hCaptcha Token: ${token}`); }
  }, [token]);

  const onSignUp = () => {
    if (!token) {
      toast({
        title: 'Error',
        variant: 'bottom-right',
        description: 'You must verify the captcha.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }

    setLoading(true);

    axios.post('/signup', {
      token,
    })
      .then(() => {
        toast({
          title: 'Account created',
          variant: 'bottom-right',
          description: "We've created your account for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch(({ res }) => {
        const description = res;
        toast({
          title: 'Error',
          variant: 'bottom-right',
          description,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      })
      .finally(() => {
        captchaRef.current.resetCaptcha();
        setToken(null);
        setLoading(false);
      });
  };

  return (
    <Box className="App">
      { loading && <Spinner color="#01d4fa" /> }
      <Center>
        <Link href="https://vitejs.dev" isExternal>
          <Image src="/vite.svg" className="logo" alt="Vite logo" />
        </Link>
        <Link href="https://reactjs.org" isExternal>
          <Image
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
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
            {!isImageLoaded
              && (
              <Skeleton
                height="220px"
                borderRadius="lg"
              />
              )}
            <Stack mt="6" spacing="3">
              <Heading fontSize="3xl">Join us</Heading>
              <Text fontSize="lg">
                Go on a wild space adventure and discover
                extraterrestrial life.
              </Text>
            </Stack>
            <FormControl marginTop="2rem" isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
              <FormLabel marginTop="1rem">Email</FormLabel>
              <Input type="email" placeholder="Email" />
              <FormLabel marginTop="1rem">Password</FormLabel>
              <Input type="password" placeholder="Password" />
              <FormLabel marginTop="1rem">Repeat password</FormLabel>
              <Input type="password" placeholder="Enter your password again" />
              <FormLabel marginTop="1rem">Destination</FormLabel>
              <Select placeholder="Select country">
                <option>Mars</option>
                <option>Jupiter</option>
                <option>Uranus</option>
              </Select>
              <Flex direction="row" align="center" justifyContent="center" backgroundColor="#f5f5f5" borderRadius="lg" padding="0.25rem 0" marginTop="1.5rem" boxSizing="border-box">
                <HCaptcha
                  sitekey={AppConfig.hCaptchaSiteToken}
                  onVerify={(t) => setToken(t)}
                  onExpire={() => setToken(null)}
                  ref={captchaRef}
                />
              </Flex>
            </FormControl>
          </CardBody>
          <Divider color="blue.100" />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue" onClick={() => onSignUp()}>
                Sign up
              </Button>
              <Button variant="outline" colorScheme="blue">
                Generate
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Center>
    </Box>
  );
}

export default App;
