import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap'
import * as formik from 'formik'
import * as yup from 'yup'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard_layout';
import UsersPage from './pages/dashboard/users_page';
import NewsPage from './pages/dashboard/news_page';
import SchoolsPage from './pages/dashboard/schools_page';
import ProjectPage from './pages/dashboard/project_page';
import DashboardPage from './pages/dashboard/dashboard_page';
import EventPage from './pages/dashboard/event_page';
import PostsPage from './pages/dashboard/posts_page';
import ProjectDetails from './pages/dashboard/project_details';
import GeneralNewsPage from './pages/dashboard/general_news_page';
import LoginPage from './pages/auth/login_page';
import RegistrationPage from './pages/auth/registration_page';
import PrivateRoute from './pages/auth/private_route';
import AlumniPage from './pages/dashboard/alumni_page';
import ViewGeneralNews from './pages/dashboard/view_pages/view_general_news';
import ViewSchoolNews from './pages/dashboard/view_pages/view_school_news';
import ViewSchoolEvent from './pages/dashboard/view_pages/view_school_event';
import DashboardDecision from './pages/dashboard/dashboard_decision';
import InquiriesPage from './pages/dashboard/inquiries_page';
import SchoolMemorium from './pages/dashboard/school_memorium_page';
import SchoolJob from './pages/dashboard/school_job_page';
import ViewSchoolJob from './pages/dashboard/view_pages/view_school_job';
import ViewSchoolMemorium from './pages/dashboard/view_pages/view_school.memorium';
import WebsiteLayout from './layouts/website_layout';
import HomePage from './pages/website/home_page';
import ContactPage from './pages/website/contact_page';
import AboutPage from './pages/website/aboutus_page';
import LeadershipPage from './pages/website/leadership_page';
import MembersPage from './pages/website/members_page';
import NewzPage from './pages/website/news_page';
import DonationPage from './pages/dashboard/donation_page';
import ViewSchool from './pages/dashboard/view_pages/view_school';
import MyProfile from './pages/dashboard/my_profile';
import UserProfilePage from './pages/dashboard/user_profile_page';
import ComposeMessage from './pages/dashboard/create_models/compose_message';
import ResetPassword from './pages/auth/reset_password';
import NewPassword from './pages/auth/new_password';
function App() {
const {Formik} = formik;
 const schema = yup.object().shape({
  name: yup.string().required(),
  email:yup.string().email().required(),
  phone:yup.number("It must be number type").required()
})
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/reset-password' element={<ResetPassword/>}/>
    <Route path='/new-password/:uuid' element={<NewPassword/>}/>
    <Route path='/register' element={<RegistrationPage/>}/>
    <Route path='/' element={<WebsiteLayout/>}>
      <Route index path='/' element={<HomePage/>}/>
      <Route  path='/contact' element={<ContactPage/>}/>
      <Route  path='/about-us' element={<AboutPage/>}/>
      <Route  path='/leadership' element={<LeadershipPage/>}/>
      <Route  path='/members' element={<MembersPage/>}/>
      <Route  path='/news' element={<NewzPage/>}/>
      <Route  path='/news' element={<NewzPage/>}/>
    </Route>
      <Route path='/dashboard' element={<PrivateRoute><DashboardLayout/></PrivateRoute> }>
        <Route path='/dashboard/dashboard' element={<DashboardDecision/>}/>
        <Route path='/dashboard/users' element={<UsersPage/>}/>
        <Route path='/dashboard/user/:uuid' element={<UserProfilePage/>}/>
        <Route path='/dashboard/profile/:uuid' element={<MyProfile/>}/>
        <Route path='/dashboard/donation' element={<DonationPage/>}/>
        <Route path='/dashboard/news' element={<NewsPage/>}/>
        <Route path='/dashboard/events' element={<EventPage/>}/>
        <Route path='/dashboard/news/:uuid' element={<NewsPage/>}/>
        <Route path='/dashboard/alumni' element={<AlumniPage/>}/>
        <Route path='/dashboard/alumni/:uuid' element={<AlumniPage/>}/>
        <Route path='/dashboard/notification' element={<ComposeMessage/>}/>

        

        <Route path='/dashboard/general-news/:uuid' element={<ViewGeneralNews/>}/>
        <Route path='/dashboard/school-news/:uuid' element={<ViewSchoolNews/>}/>
        
        <Route path='/dashboard/school-event/:uuid' element={<ViewSchoolEvent/>}/>
        <Route path='/dashboard/general-news' element={<GeneralNewsPage/>}/>
        <Route path='/dashboard/schools' element={<SchoolsPage/>}/>
        <Route path='/dashboard/school/:uuid' element={<ViewSchool/>}/>
        <Route path='/dashboard/school-job' element={<SchoolJob/>}/>
        <Route path='/dashboard/school-jobs/:uuid' element={<SchoolJob/>}/>
        <Route path='/dashboard/school-job/:uuid' element={<ViewSchoolJob/>}/>
        <Route path='/dashboard/school-memorium' element={<SchoolMemorium/>}/>
        <Route path='/dashboard/school-memoriums/:uuid' element={<SchoolMemorium/>}/>
        <Route path='/dashboard/school-memorium/:uuid' element={<ViewSchoolMemorium/>}/>
        <Route path='/dashboard/inquiries' element={<InquiriesPage/>}/>
        <Route path='/dashboard/projects' element={<ProjectPage/>}/>
        <Route path='/dashboard/projects/:uuid' element={<ProjectPage/>}/>

        <Route path='/dashboard/projects/details/:uuid' element={<ProjectDetails/>}/>
        <Route path='/dashboard/posts' element={<PostsPage  />}/>
        <Route path='/dashboard/posts/:uuid' element={<PostsPage  />}/>
        <Route path='/dashboard/events/:uuid' element={<EventPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
