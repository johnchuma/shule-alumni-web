import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Heading from "../../../general_widgets/heading";
import { getGeneralTransactions } from "../../../controllers/transaction_controller";
import { timeAgo } from "../../../utils/tile_ago";
import Paragraph from "../../../general_widgets/paragraph";
import { primaryColor } from "../../../utils/colors";

export const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const donationsPerPage = 5; // Number of donations to display per page
  const [totalDonations, setTotalDonations] = useState(0);
  useEffect(() => {
    getGeneralTransactions().then((data) => {
      console.log(data);
      setDonations(data || []);
    });
  }, []);
  useEffect(() => {
    let amount = 0;
    donations.map((item) => {
      amount = item.amount + amount;
    });
    setTotalDonations(amount);
  }, [donations]);
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredDonations = donations.filter((item) =>
    item.customer_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );
  const totalPages = Math.ceil(filteredDonations.length / donationsPerPage);

  return (
    <div className="p-3" style={{ backgroundColor: "white" }}>
      <Stack
        className="d-flex justify-content-between mb-2"
        direction="horizontal"
      >
        <Heading fontSize={"1.5vw"} text={"Donations"} />
        <div
          className="btn btn-pill"
          style={{ backgroundColor: "#FFD1D1", borderRadius: 30 }}
        >
          <Paragraph
            className={"d-none d-md-block"}
            fontWeight={600}
            text={"Total Donations: " + totalDonations + "TZS"}
          />
          <div
            className={"d-block d-md-none"}
            style={{ fontSize: "3.3vw", fontWeight: 600 }}
          >
            {"Total: " + totalDonations + "TZS"}{" "}
          </div>
        </div>
      </Stack>
      <Stack className="d-flex justify-content-end">
        <Row>
          <Col md={{ span: 4, offset: 8 }}>
            <Form.Control
              placeholder="Search here..."
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </Col>
        </Row>
      </Stack>
      <div className="table-responsive-md">
        <Table className="table">
          <thead>
            <tr>
              <th>Created</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentDonations.map((item, index) => (
              <tr key={index}>
                <td>{timeAgo(item.createdAt)}</td>
                <td>{item.customer_name}</td>
                <td>{item.customer_phone}</td>
                <td>{item.customer_email}</td>
                <td>
                  {item.amount}
                  {item.currency}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Pagination */}
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

export default DonationList;
