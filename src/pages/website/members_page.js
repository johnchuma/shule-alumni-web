import { Button, Col, Container, Form, Image, Row, Stack } from "react-bootstrap";
import Paragraph from "../../general_widgets/paragraph";
import CustomButton from "../../general_widgets/button";
import Heading from "../../general_widgets/heading";
import SubHeading from "../../general_widgets/subheading";
import Small from "../../general_widgets/small";
import { communityMembers } from "../../utils/arrays";
import AlumniCarousel from "../../general_widgets/carousel";
import { getAllAlumni } from "../../controllers/user_controller";
import { useEffect, useState } from "react";
import { primaryColor } from "../../utils/colors";

const MembersPage = () => {
  const heroItems = [
    {
      image: "https://missouristate.info/images/calendar/96897.jpg",
      title: "Community Members",
    },
  ];

  const [alumni, setAlumni] = useState([]);
  useEffect(() => {
    getAllAlumni().then((item) => setAlumni(item));
  }, []);

  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const alumniPerPage = 4; // Number of alumni to display per page

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredAlumni = alumni.filter(
    (item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.School.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastAlumni = currentPage * alumniPerPage;
  const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstAlumni, indexOfLastAlumni);
  const totalPages = Math.ceil(filteredAlumni.length / alumniPerPage);

  // Function to handle pagination
  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <AlumniCarousel objectArray={heroItems} />
        <Container>
          <Row>
            <Col className="text-center" md={{ span: 8, offset: 2 }}>
              <Paragraph
                className={"my-4"}
                text={
                  "Welcome to our Shule Alumni community! Here, you can easily find and connect with fellow alumni from our esteemed institution. Reconnect with old friends, expand your professional network, or simply stay up-to-date with the achievements of your fellow graduates."
                }
              />
              <Row>
                <Col className="py-4" md={{ offset: 2, span: 8 }}>
                  <Stack direction="horizontal" className="d-flex justify-content-center">
                    <Form.Control
                      placeholder="Search alumni"
                      type="text"
                      value={searchInput}
                      onChange={handleSearchInputChange}
                    />
                    <CustomButton className={"py-2 px-4 ms-4 me-auto"} text={"Search"} />
                  </Stack>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            {currentAlumni.map((item) => {
              return (
                <Col md="3" className="py-4 text-center" key={item.id}>
                  <Image
                    roundedCircle
                    style={{ height: 90, width: 90, objectFit: "cover" }}
                    src={item.image}
                  />
                  <SubHeading text={item.name} />
                  <Small text={item.School.name} />
                  <Small text={"Graduation year: " + item.graduation_year} />
                  <Small text={item.designation} />
                </Col>
              );
            })}
          </Row>
          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center my-3">
        {/* Previous Button */}
        <Button
          className="shadow-none me-3 py-1"
          style={{
            backgroundColor: primaryColor,
            color: "white",
            borderColor: primaryColor,
            display: currentPage === 1 ? "none" : "block",
          }}
          onClick={() => handlePagination(currentPage - 1)}
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
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
        </Container>
      </div>
    </div>
  );
};

export default MembersPage;
