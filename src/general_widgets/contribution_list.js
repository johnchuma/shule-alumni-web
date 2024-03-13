import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Heading from "./heading";
import { useNavigate } from "react-router-dom";
import { getAllContribution } from "../controllers/contribution_controller";
import { timeAgo } from "../utils/tile_ago";
import Paragraph from "./paragraph";
import { primaryColor } from "../utils/colors";
import { getProjectTransactions } from "../controllers/transaction_controller";
import FormatMoney from "../utils/format_money";

export const ContributionList = ({ uuid }) => {
  const navigate = useNavigate();
  const [contributions, setContributions] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const contributionsPerPage = 5; // Number of contributions to display per page

  let [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    getProjectTransactions(uuid).then((data)=>{
      setContributions(data)
    })
  }, []);

  useEffect(() => {
    let amount = 0;
    contributions.map((item) => {
      amount = item.amount + amount;
    });
    setTotalContributions(amount);
  }, [contributions]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredContributions = contributions.filter((item) =>
    item.customer_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastContribution = currentPage * contributionsPerPage;
  const indexOfFirstContribution = indexOfLastContribution - contributionsPerPage;
  const currentContributions = filteredContributions.slice(
    indexOfFirstContribution,
    indexOfLastContribution
  );
  const totalPages = Math.ceil(filteredContributions.length / contributionsPerPage);

  return (
    <div className=" p-3" style={{ backgroundColor: "white" }}>
      {/* <Stack className="d-flex justify-content-between mb-2" direction="horizontal">
        <Heading fontSize={"1.5vw"} text={"Project Contributions"} />
        <div className="btn btn-pill" style={{ backgroundColor: "#FFD1D1", borderRadius: 30 }}>
          <Paragraph fontWeight={600} text={"Total Contributions: " + totalContributions + "TZS"} />
        </div>
      </Stack> */}
      <Stack className="d-flex justify-content-between mb-2" direction="horizontal">
        <div className={"d-block d-md-none p-0 text-start"}  style={{ fontSize:"5vw",fontWeight:600 }} >{`Contributions`}</div>
        {/* <Heading fontSize={"1.5vw"} text={"Project Contributions"} /> */}

      <Heading className={"d-none d-md-block"} fontSize={"1.5vw"} text={"Project Contributions"} />
          <div className="btn btn-pill" style={{ backgroundColor:"#FFD1D1",borderRadius:30 }}>
          <Paragraph className={"d-none d-md-block"} fontWeight={600} text={"Total Contributions: " + FormatMoney(totalContributions) + "TZS"} />
          <div className={"d-block d-md-none"}  style={{ fontSize:"3.3vw",fontWeight:600 }} >{"Total: " + FormatMoney(totalContributions) + "TZS"} </div>

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

      <Table>
        <thead>
          <tr>
            <th>Paid</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentContributions.map((item, index) => (
            <tr key={index}>
              <td>{timeAgo(item.createdAt)}</td>
              <td>{item.customer_name}</td>
              <td>{item.customer_phone}</td>
              <td>{item.customer_email}</td>
              <td>{FormatMoney(item.amount)+"TZS"}</td>
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

export default ContributionList;
