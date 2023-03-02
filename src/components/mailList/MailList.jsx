import { Box, Button, Flex, Input, Spacer } from "@chakra-ui/react"
import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      {/* <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div> */}
      <Flex>
        <Input color='black' bg='white' placeholder='E-mail' size='md' />
        <Spacer />
        <Button colorScheme='blue' ml='2' px='5'>Subscribe</Button>
      </Flex>
    </div>
  )
}

export default MailList