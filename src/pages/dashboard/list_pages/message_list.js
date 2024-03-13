import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Stack, Table } from "react-bootstrap";
import { getMessage } from "../../../controllers/message_controller";
import { timeAgo } from "../../../utils/tile_ago";
import CustomButton from "../../../general_widgets/button";
import Heading from "../../../general_widgets/heading";
import SendMessageModal from "../create_models/send_message_modal";
import Paragraph from "../../../general_widgets/paragraph";
import { primaryColor } from "../../../utils/colors";

export const MessageList = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessage().then((data) => setMessages(data));
  }, []);

  const [message, setMessage] = useState(null);
  const [replyMessageModal, setReplyMessageModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredMessages = messages.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  return (
    <div className="p-3" style={{ backgroundColor: "white" }}>
      <SendMessageModal
        show={replyMessageModal}
        user={message}
        onHide={() => setReplyMessageModal(false)}
      />
      <Heading fontSize={"1.5vw"} className={"mb-3"} text={"All inquiries"} />
      <Stack className="d-flex justify-content-end">
        <Row>
          <Col md={{ span: 4, offset: 8 }}>
            <Form.Control
              placeholder="Search here..."
              type="text"
              onChange={handleSearchInputChange}
            />
          </Col>
        </Row>
      </Stack>
      <div className="table-responsive-md">
        <Table>
          <thead>
            <tr>
              <th>Sent</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((item, index) => (
              <tr key={index}>
                <td>{timeAgo(item.createdAt)}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <CustomButton
                    ariaControls={"noma"}
                    color={"green"}
                    className={"py-1"}
                    onClick={() => {
                      setMessage(item);
                      setReplyMessageModal(true);
                    }}
                    text={"Read & reply"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-end align-items-center my-3">
        {/* Previous Button */}
        <Button
          className="shadow-none me-3 py-1"
          style={{
            backgroundColor: primaryColor,
            color: "white",
            borderColor: primaryColor,
            display: currentPage === 1 ? "none" : "block",
          }}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Current Page Number */}
        <Paragraph text={`Page ${currentPage}/${totalPages}`} />

        {/* Next Button */}
        <Button
          className="shadow-none ms-3 py-1"
          style={{
            backgroundColor: primaryColor,
            color: "white",
            borderColor: primaryColor,
            display: currentPage === totalPages ? "none" : "block",
          }}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MessageList;
