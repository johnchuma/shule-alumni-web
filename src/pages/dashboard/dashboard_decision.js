import { getUser } from "../../utils/local_storage";
import DashboardPage from "./dashboard_page";
import SchoolDashboard from "./school_dashboard";

const DashboardDecision = () => {
    const user = getUser()
    return user.role == "Admin"?<DashboardPage/>:<SchoolDashboard/>;
}
 
export default DashboardDecision;