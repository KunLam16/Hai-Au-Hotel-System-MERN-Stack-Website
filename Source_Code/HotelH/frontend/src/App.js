import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Pages/LandingPage.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import ManagerSignUp from './Pages/ManagerSignUp.jsx';
import Customer from './UserPage/Customer.jsx';
import Services from './UserPage/Services.jsx';
import Payment from './UserPage/Payment.jsx';
import BookedRoomPage from './UserPage/BookedRoomPage.jsx';
import BookedServicePage from './UserPage/BookedServicePage.jsx';
import Employee from './UserPage/Employee.jsx';
import Manager from './UserPage/Manager.jsx';
import PaymentStatus from './UserPage/PaymentStatus.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import RoomDisplay from './Components/RoomDisplay/RoomDisplay.jsx';
import ServiceDisplay from './Components/ServiceDisplay/ServiceDisplay.jsx';
import PaymentDetail from './Components/PaymentDetail/PaymentDetail.jsx';
import AddEmployeePage from './Components/AddEmployeePage/AddEmployeePage.jsx';
import ManageServicePage from './UserPage/ManageServicePage.jsx';
import ManagePaymentPage from './UserPage/ManagePaymentPage.jsx';
import CustomerBillPage from './UserPage/CustomerBillPage.jsx';
import ManageCustomerPage from './UserPage/ManageCustomerPage.jsx';
import EmployeeReportPage from './UserPage/EmployeeReportPage.jsx';
import EmployeeReportListPage from './UserPage/EmployeeReportListPage.jsx';
import ManagerReportPage from './UserPage/ManagerReportPage.jsx';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/managersignup" element={<ManagerSignUp />} />
          <Route path="/customer" element={<PrivateRoute element={Customer} />} />
          <Route path="/employee" element={<PrivateRoute element={Employee} />} />
          <Route path="/manager" element={<PrivateRoute element={Manager} />} />
          <Route path="/rooms/:id" element={<PrivateRoute element={RoomDisplay} />} /> 
          <Route path="/services/:id" element={<PrivateRoute element={ServiceDisplay} />} />
          <Route path="/customer/services" element={<PrivateRoute element={Services} />} />
          <Route path="/customer/booked-rooms" element={<PrivateRoute element={BookedRoomPage} />} />
          <Route path="/customer/booked-services" element={<PrivateRoute element={BookedServicePage} />} />
          <Route path="/customer/payment" element={<PrivateRoute element={Payment} />} />
          <Route path="/customer/payment-detail/:bookingId" element={<PrivateRoute element={PaymentDetail} />} />
          <Route path="/customer/payment/status" element={<PrivateRoute element={PaymentStatus} />} />
          <Route path="/manager/add-employee" element={<PrivateRoute element={AddEmployeePage} />} />
          <Route path="/employee/manage-service" element={<PrivateRoute element={ManageServicePage} />} />
          <Route path="/employee/manage-payment" element={<PrivateRoute element={ManagePaymentPage} />} />
          <Route path="/customer/payment/bills" element={<PrivateRoute element={CustomerBillPage} />} />
          <Route path="/manager/customers-management" element={<PrivateRoute element={ManageCustomerPage} />} />
          <Route path="/employee/report" element={<PrivateRoute element={EmployeeReportPage} />} />
          <Route path="/employee/report/list" element={<PrivateRoute element={EmployeeReportListPage} />} />
          <Route path="/manager/report" element={<PrivateRoute element={ManagerReportPage} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
