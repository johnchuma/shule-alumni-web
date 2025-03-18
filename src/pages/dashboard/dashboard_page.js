import React, { useEffect, useState } from "react";
import Heading from "../../general_widgets/heading";
import { Col, Row, Stack } from "react-bootstrap";
import CustomButton from "../../general_widgets/button";
import DataTable from "../../general_widgets/datatable";
import DashboardCard from "../../general_widgets/dashboard_card";
import { BsPeople } from "react-icons/bs";
import { mutedBlack, primaryColor } from "../../utils/colors";
import { FaBookOpen, FaFileArchive, FaMoneyBill, FaUser } from "react-icons/fa";
import UsersList from "../../general_widgets/users_list";
import { totalResources, totalUsers } from "../../controllers/user_controller";
import { contributionAmount } from "../../controllers/contribution_controller";
import { totalSchools } from "../../controllers/school_controller";
import SchoolList from "../../general_widgets/school_list";
import { getTotalAlumniDonations } from "../../controllers/transaction_controller";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [registeredSchools, setregisteredSchools] = useState(0);
  const [totalAlumni, settotalAlumni] = useState(0);
  const [totalDonation, settotalDonation] = useState(0);
  const [totalResource, settotalResource] = useState(0);
  useEffect(() => {
    totalUsers().then((data) => settotalAlumni(data || 0));
    totalResources().then((data) => settotalResource(data || 0));
    totalSchools().then((data) => setregisteredSchools(data || 0));
    getTotalAlumniDonations().then((data) => settotalDonation(data || 0));
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <Stack
        direction="horizontal"
        className="d-flex justify-content-between mt-4"
      >
        <Heading text={`Dashboard`} />
      </Stack>
      <Row className="mb-5 mt-2">
        <Col md={3}>
          <DashboardCard
            onClick={() => navigate("/dashboard/schools")}
            className={"btn border-0 text-start p-0"}
            icon={<FaBookOpen size={20} style={{ color: primaryColor }} />}
            title={registeredSchools}
            subtitle={"Registered school"}
          />
        </Col>
        <Col md={3}>
          <DashboardCard
            onClick={() => navigate("/dashboard/schools")}
            className={"btn border-0 text-start p-0"}
            icon={<FaUser size={20} style={{ color: primaryColor }} />}
            title={totalAlumni}
            subtitle={"Total alumni"}
          />
        </Col>
        <Col md={3}>
          <DashboardCard
            onClick={() => navigate("/dashboard/donation")}
            className={"btn border-0 text-start p-0"}
            icon={<FaMoneyBill size={20} style={{ color: primaryColor }} />}
            title={`${totalDonation}TZS`}
            subtitle={"Total donations"}
          />
        </Col>
        <Col md={3}>
          <DashboardCard
            onClick={() => navigate("/dashboard/general-news")}
            className={"btn border-0 text-start p-0"}
            icon={<FaFileArchive size={20} style={{ color: primaryColor }} />}
            title={totalResource}
            subtitle={"Uploaded resources"}
          />
        </Col>
      </Row>
      <div className="bg-white p-3 ">
        <Heading className={`mb-3`} text={"Registered schools"} />
        <SchoolList refresh={showCreateUserModal} />
      </div>
    </div>
  );
};

export default DashboardPage;
