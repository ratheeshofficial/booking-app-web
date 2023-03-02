import {
  Box,
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

const BookNowModal = ({ hotelId }) => {
  console.log("hotelId", hotelId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log("isOpen", isOpen);
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [selectedRooms, setSelectedRooms] = useState([]);

  const btnRef = useRef(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates } = useContext(SearchContext);
  console.log("dates", dates);

  const BookNow = () => {
    if (user) {
      console.log("clicked", user);
      onOpen();
    } else {
      navigate("/login");
    }
  };

  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/hotels/room/${hotelId}`
  );
  console.log("data", data);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    // console.log("start", start);
    const end = new Date(endDate);
    // console.log("end", end);
    const date = new Date(start.getTime());
    // console.log("date", date);
    // console.log("date", date);
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    //javaScript some is a validate its true or not
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  // console.log("selectedRooms", selectedRooms);

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8000/api/rooms/availabilty/${roomId}`,
            { dates: allDates }
          );
          return res.data;
        })
      );
      onClose();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Button colorScheme="linkedin" mt={3} ref={btnRef} onClick={BookNow}>
        Reserve or Book Now
      </Button>

      <Modal
        onClose={onClose}
        size="xl"
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select your rooms:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data?.map((item) => (
              <SimpleGrid columns={2} spacing={10}>
                <Box my="3">
                  <Text fontWeight="bold">{item?.title}</Text>
                  <Text>Desc : {item?.desc}</Text>
                  <Text>price : {item?.price}</Text>
                  <Text>maxPeople : {item?.maxPeople}</Text>
                </Box>
                <Box alignSelf="center">
                  {item.roomNumbers.map((roomNumber) => (
                    <Checkbox
                      ml="2"
                      colorScheme="green"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    >
                      {roomNumber.number}
                    </Checkbox>
                  ))}
                </Box>
              </SimpleGrid>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClick}>Reserve Now</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookNowModal;
