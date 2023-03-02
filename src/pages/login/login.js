import {
  Box,
  Button,
  Center,
  color,
  Container,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
//   import jwt_decode from "jwt-decode";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import LoginImage from "../../image/hotel_img.jpg";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    console.log("show Password");
    setPasswordShown(passwordShown ? false : true);
  };

  const { user, loading, error, dispatch } = useContext(AuthContext);
  console.log("user", user);
  console.log("error", error);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    // validationSchema: Yup.object({
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .required("No password provided.")
    //     .min(8, "Password is too short - should be 8 chars minimum."),
    // }),

    onSubmit: async (values, { resetForm }) => {
      //   console.log("values", values);

      dispatch({ type: "LOGIN_START" });

      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/login",
          values
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
        console.log("res", res);
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      }
    },
  });

  return (
    <>
      <SimpleGrid columns={2} spacing={0}>
        <Box bg="#e3e3e3">
          <Image src={LoginImage} alt="Dan Abramov" />
        </Box>
        <Flex h="100vh" justifyContent="center">
          <Center>
            <Container>
              <Text fontSize="3xl" textAlign="center">
                Login
              </Text>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username</label>
                <Input
                  _autofill={{
                    transition: "background-color 5000s ease-in-out 0s",
                  }}
                  my="3"
                  id="username"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div style={{ color: "red" }}>{formik.errors.username}</div>
                ) : null}
                <label htmlFor="username">Password</label>
                <InputGroup>
                  <Input
                    _autofill={{
                      transition: "background-color 5000s ease-in-out 0s",
                    }}
                    my="3"
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <InputRightElement
                    mt="3"
                    children={
                      passwordShown ? (
                        <AiFillEye
                          fontSize="22px"
                          cursor="pointer"
                          onClick={() => togglePassword()}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          fontSize="22px"
                          cursor="pointer"
                          onClick={() => togglePassword()}
                        />
                      )
                    }
                  />
                </InputGroup>
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
                <Box textAlign="right" mt="2">
                  Don't have an account ?
                  <Link
                    pl="2"
                    as={RouterLink}
                    to="/register"
                    color="#2c5282"
                    textDecoration="underline"
                  >
                    Register
                  </Link>
                </Box>
                <Box textAlign="center">
                  <Button
                    disabled={loading}
                    colorScheme="blue"
                    justifyContent="center"
                    mt="5"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
                {error && <span style={{ color: "red" }}>{error}</span>}
              </form>
            </Container>
          </Center>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Login;
