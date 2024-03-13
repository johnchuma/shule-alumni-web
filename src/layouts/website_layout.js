import { Outlet } from "react-router-dom";
import Footer from "../widgets/footer";
import NavigationBar from "../widgets/navigation_bar";

const WebsiteLayout = () => {
    return <div>
        <NavigationBar/>
        <Outlet/>
        <Footer/>
    </div>;
}
 
export default WebsiteLayout;