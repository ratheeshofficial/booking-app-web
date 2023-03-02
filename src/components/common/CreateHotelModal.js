import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import useFetch from "../../hooks/useFetch";

const CreateHotelModal = ({ isOpen, onOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      city: "",
      address: "",
      distance: "",
      desc: "",
      cheapestPrice: "",
      featured: false,
      rooms: [],
    },

    // validationSchema: Yup.object({
    //   username: Yup.string()
    //     .max(15, "Must be 15 characters or less")
    //     .required("Required"),
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .required("No password provided.")
    //     .min(8, "Password is too short - should be 8 chars minimum."),
    // }),

    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        await axios
          .post("http://localhost:8000/api/hotels", values)
          .then((res) => {
            console.log(res, "resssssssssssssssss");
          })
          .catch((error) => {
            console.log(error);
          });
        onClose();
      } catch (error) {
        console.log(error, "error");
      }
    },
  });

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8000/api/rooms`
  );
  //   console.log("data", data);
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>Create New Hotel</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Input
                id="type"
                name="type"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input
                id="city"
                name="city"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                id="address"
                name="address"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Distance from City Center</FormLabel>
              <Input
                id="distance"
                name="distance"
                type="number"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.distance}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                id="desc"
                name="desc"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.desc}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                id="cheapestPrice"
                name="cheapestPrice"
                type="number"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cheapestPrice}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Featured</FormLabel>
              <Select
                id="featured"
                name="featured"
                // type="boolean"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.featured}
              >
                <option checked value={false}>
                  No
                </option>
                <option value={true}>Yes</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Select Room</FormLabel>
              <Select
                id="rooms"
                name="rooms"
                h="100%"
                py="2"
                multiple
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rooms}
              >
                {loading
                  ? "loading..."
                  : data &&
                    data?.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateHotelModal;
