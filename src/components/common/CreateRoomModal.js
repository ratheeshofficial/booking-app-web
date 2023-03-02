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
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import * as Yup from "yup";

const CreateRoomModal = ({ isOpen, onOpen, onClose }) => {
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8000/api/hotels`
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      maxPeople: "",
      desc: "",
      chooseHotel: "",
      rooms: [],
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      price: Yup.number().required("Required"),
      maxPeople: Yup.number().required("Required"),
      desc: Yup.string().required("Required"),
      // chooseHotel: Yup.string().required("Required"),
      rooms: Yup.array()
        .max(10, "Only 10 rooms are allowed")
        .required("Provide at least one rooms"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const roomIds = values.rooms.map((r) => ({ number: Number(r) }));
      console.log("roomIds", roomIds);

      // alert(JSON.stringify(values, null, 2));

      try {
        await axios
          .post(`http://localhost:8000/api/rooms/${values.chooseHotel}`, {
            title: values.title,
            price: values.price,
            maxPeople: values.maxPeople,
            desc: values.desc,
            chooseHotel: values.chooseHotel,
            roomNumbers: roomIds,
          })
          .then((res) => {
            console.log(res, "resssssssssssssssss");
          })
          .catch((error) => {
            console.log(error);
          });
        onClose();
        // navigate("/login");
      } catch (error) {
        console.log(error, "error");
      }
    },
  });

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>Create New Room</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                id="title"
                name="title"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              ) : null}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                id="price"
                name="price"
                type="number"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div style={{ color: "red" }}>{formik.errors.price}</div>
              ) : null}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Max People</FormLabel>
              <Input
                id="maxPeople"
                name="maxPeople"
                type="number"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.maxPeople}
              />
              {formik.touched.maxPeople && formik.errors.maxPeople ? (
                <div style={{ color: "red" }}>{formik.errors.maxPeople}</div>
              ) : null}
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
              {formik.touched.desc && formik.errors.desc ? (
                <div style={{ color: "red" }}>{formik.errors.desc}</div>
              ) : null}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Choose a Hotel</FormLabel>
              <Select
                id="chooseHotel"
                name="chooseHotel"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.chooseHotel}
                placeholder="Select option"
              >
                {loading
                  ? "loading"
                  : data &&
                    data?.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
              </Select>
              {formik.touched.chooseHotel && formik.errors.chooseHotel ? (
                <div style={{ color: "red" }}>{formik.errors.chooseHotel}</div>
              ) : null}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rooms</FormLabel>
              <Textarea
                id="rooms"
                name="rooms"
                type="text"
                // variant="flushed"
                placeholder="Enter the numbers with commas"
                onChange={(e) => {
                  formik.setFieldValue("rooms", e.target.value.split(","));
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rooms && formik.errors.rooms ? (
                <div style={{ color: "red" }}>{formik.errors.rooms}</div>
              ) : null}
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

export default CreateRoomModal;
