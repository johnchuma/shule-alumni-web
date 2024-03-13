import { Button, Col, Container, Form, Image, Row, Stack, Table } from "react-bootstrap";
import { deleteUser, getSchoolAlumni } from "../controllers/user_controller";
import { useEffect, useState } from "react";
import Heading from "./heading";
import DeleteConfirmation from "./delete_confirmation";
import UpdateSchoolAlumni from "../pages/dashboard/update_models/update_school_alumni";
import { getUser } from "../utils/local_storage";
import Paragraph from "./paragraph";
import { primaryColor } from "../utils/colors";
import { useNavigate } from "react-router-dom";

export const AlumniList = ({ refresh, uuid }) => {
  const [users, setUsers] = useState([]);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const usersPerPage = 5; // Number of users to display per page
  const user = getUser();

  useEffect(() => {
    if (refresh === false) {
      getSchoolAlumni(uuid).then((data) => setUsers(data));
    }
  }, [refresh, showUpdateUserModal,showDeleteModal]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredUsers = users.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const navigate = useNavigate()
  return (
    <div className="p-3" style={{ backgroundColor: "white" }}>
      <DeleteConfirmation
        deleteFunction={() => {
          deleteUser(selectedUser.uuid).then(()=>{
          setShowDeleteModal(false);
        });
        }}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
      <UpdateSchoolAlumni
        show={showUpdateUserModal}
        onHide={() => setShowUpdateUserModal(false)}
        user={selectedUser}
      />

      <Heading fontSize={"1.5vw"} className={"mb-2"} text={"School alumni"} />
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
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Graduation year</th>
              {user.role === "Moderator" && (
                <>
                  <th></th>
                  <th></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={index}>
                <td  onClick={()=>navigate(`/dashboard/user/${item.uuid}`)}>
                  <Image
                    src={item.image}
                    roundedCircle
                    style={{ height: 35, width: 35, objectFit: "cover" }}
                  />
                </td>
                <td onClick={()=>navigate(`/dashboard/user/${item.uuid}`)}>{item.name}</td>
                <td onClick={()=>navigate(`/dashboard/user/${item.uuid}`)}>{item.email}</td>
                <td onClick={()=>navigate(`/dashboard/user/${item.uuid}`)}>{item.phone}</td>
                <td>{item.graduation_year}</td>
                {user.role === "Moderator" && (
                  <>
                    <td>
                      <Button
                        style={{}}
                        onClick={() => {
                          setShowUpdateUserModal(true);
                          setSelectedUser(item);
                        }}
                        className="bg-success border-0 btn btn-sm py-1"
                      >
                        Update
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setSelectedUser(item);
                          setShowDeleteModal(true);
                        }}
                        className="bg-danger border-0 btn btn-sm py-1"
                      >
                        Delete
                      </Button>
                    </td>
                  </>
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

export default AlumniList;
