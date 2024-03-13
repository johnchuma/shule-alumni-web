import { Button, Col, Container, Form, Image, Row, Stack, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Heading from "./heading";
import { useNavigate } from "react-router-dom";
import { deletePledge, getAllPledge } from "../controllers/pledge_controller";
import DeleteConfirmation from "./delete_confirmation";
import { getUser } from "../utils/local_storage";
import { timeAgo } from "../utils/tile_ago";
import CustomButton from "./button";
import { primaryColor } from "../utils/colors";
import Paragraph from "./paragraph";
import { getLink } from "../controllers/transaction_controller";
import UpdatePledge from "../pages/dashboard/update_models/update_pledge";
import FormatMoney from "../utils/format_money";

export const PledgeList = ({ uuid }) => {
  const navigate = useNavigate();
  const [pledges, setPledges] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPledge, setSelectedPledge] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const pledgesPerPage = 5; // Number of pledges to display per page
  const [loading, setLoading] = useState(false);
  const user = getUser();
  const [totalPledges, setTotalPledges] = useState(0);
  const [updatePledgeModal, setUpdatePledgeModal] = useState(false);

  useEffect(() => {
    getAllPledge(uuid).then((data) => setPledges(data));
  }, [showDeleteModal,updatePledgeModal]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredPledges = pledges.filter((item) =>
    item.User.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastPledge = currentPage * pledgesPerPage;
  const indexOfFirstPledge = indexOfLastPledge - pledgesPerPage;
  const currentPledges = filteredPledges.slice(
    indexOfFirstPledge,
    indexOfLastPledge
  );
  const totalPages = Math.ceil(filteredPledges.length / pledgesPerPage);

  const requestPaymentLink = async (item) => {
    console.log(item)
    setLoading(true);
    await getLink(item.uuid);
    setLoading(false);
  };

  useEffect(() => {
    let amount = 0;
    pledges.map((item)=>{
      amount = item.amount + amount
    })
    setTotalPledges(amount)
  }, [pledges]);
  return (
    <div className=" p-3" style={{ backgroundColor: "white" }}>
      <DeleteConfirmation
        deleteFunction={async () => {
          await deletePledge(selectedPledge.uuid);
          setShowDeleteModal(false);
        }}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
      <UpdatePledge show={updatePledgeModal} pledge={selectedPledge} onHide={()=>setUpdatePledgeModal(false)}/>
 <Stack className="d-flex justify-content-between mb-2" direction="horizontal">
        <div className={"d-block d-md-none p-0 text-start"}  style={{ fontSize:"5vw",fontWeight:600 }} >{`Pledges`}</div>

      <Heading className={"d-none d-md-block"} fontSize={"1.5vw"} text={"Pledges"} />
          <div className="btn btn-pill" style={{ backgroundColor:"#FFD1D1",borderRadius:30 }}>
          <Paragraph className={"d-none d-md-block"} fontWeight={600}  text={"Total Pledges: "+FormatMoney(totalPledges)+"TZS"}/>
          <div className={"d-block d-md-none"}  style={{ fontSize:"3.3vw",fontWeight:600 }} >{"Total: "+FormatMoney(totalPledges)+"TZS"}</div>

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
            <th>Profile</th>
            <th>Pledged</th>
            <th>Name</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentPledges.map((item, index) => (
            <tr key={index}>
              <td>
                <Image
                  src={item.User.image}
                  roundedCircle
                  style={{ height: 35, width: 35, objectFit: "cover" }}
                />
              </td>
              <td>{timeAgo(item.createdAt)}</td>
              <td>{item.User.name}</td>
              <td>{FormatMoney(item.amount)+"TZS"}</td>
         
              {user.uuid === item.User.uuid && (
                <td>
                 <CustomButton
                    color={primaryColor}
                    className={"py-1 w-100"}
                    text={"Edit"}
                    onClick={() => {
                      setSelectedPledge(item);
                      setUpdatePledgeModal(true)
                    }}
                  
                  />
                </td>
              )}
              {user.uuid === item.User.uuid && (
                <td>
                  <CustomButton
                    color={"green"}
                    className={"py-1 w-100 d-none d-md-block"}
                    text={"Pay now"}
                    loading={loading && selectedPledge.id === item.id}
                    onClick={() => {
                      setSelectedPledge(item);
                      requestPaymentLink(item);
                    }}
                  />
                  <CustomButton
                    color={"green"}
                    className={"py-1 w-100 d-block d-md-none"}
                    text={"Pay"}
                    loading={loading && selectedPledge.id === item.id}
                    onClick={() => {
                      setSelectedPledge(item);
                      requestPaymentLink(item);
                    }}
                  />
                </td>
              )}
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

export default PledgeList;
