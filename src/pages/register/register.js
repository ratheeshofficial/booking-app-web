import React, { useState } from "react";
import { useFormik } from "formik";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
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
import * as Yup from "yup";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import RegisterImage from "../../image/hotel_vector.jpg";

const SignupForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    console.log("show Password");
    setPasswordShown(passwordShown ? false : true);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),

    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values));
      try {
        await axios
          .post("http://localhost:8000/api/auth/register", values)
          .then((res) => {
            console.log(res, "LLLLLLLLLLLLLLLLLL");
            res.data.success === true &&
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            resetForm({ values: "" });
            navigate("/login");
          })
          .catch((res) => {
            console.log(res, "AAAAAAAAAAAAAAAA");
            !res.response.data.success &&
              toast({
                title: "Email is already exist",
                description: "We've Not created your account for you.",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
          });
        // navigate("/login");
      } catch (error) {
        console.log(error, "error");
      }
    },
  });

  return (
    <>
      <SimpleGrid columns={2} spacing={0}>
        <Box bg="#e3e3e3">
          <Image src={RegisterImage} alt="Dan Abramov" />
        </Box>
        <Flex justifyContent="center" h="100vh">
          <Center>
            <Container>
              <Text fontSize="3xl" textAlign="center">
                Register
              </Text>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">First Name</label>
                <Input
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

                <label htmlFor="email">Email Address</label>
                <Input
                  my="3"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
                <label htmlFor="email">Password</label>
                <InputGroup>
                  <Input
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
                  Already have an account ?
                  <Link
                    pl="2"
                    as={RouterLink}
                    to="/login"
                    color="#2c5282"
                    textDecoration="underline"
                  >
                    Login
                  </Link>
                </Box>
                <Box textAlign="center">
                  <Button
                    colorScheme="blue"
                    justifyContent="center"
                    mt="5"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Container>
          </Center>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default SignupForm;
