import './App.css';
import  Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Services from './pages/Policy';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserDashboard from './pages/userRoutes/UserDashboard';
import Privateroute from './components/Privateroute';
import ProfileInfo from './pages/userRoutes/ProfileInfo';
import UserProvider from './context/UserProvider';
import BuySellSection from './pages/userRoutes/BuySellSection';
import BorrowSection from './pages/userRoutes/BorrowSection';
import ExchangeSection from './pages/userRoutes/ExchangeSection';
import ExchangeForm from './pages/userRoutes/ExchangeForm';
import AddBorrow from './pages/userRoutes/AddBorrow';
import AddExchange from './pages/userRoutes/AddExchange';
import OrderPlaceForm from './pages/userRoutes/OrderPlaceForm';
import BorrowForm from './pages/userRoutes/BorrowForm';
import ExchangeRequests from './pages/userRoutes/ExchangeRequests';
import BorrowRequests from './pages/userRoutes/BorrowRequests';
import OrderRequests from './pages/userRoutes/OrderRequests';
import MySellPosts from './components/MySellPosts';
import MyBorrowPosts from './components/MyBorrowPosts';
import MyExchangePosts from './components/MyExchangePosts';
import MyPurchase from './pages/userRoutes/MyPurchase';
import MyBorrowedBooks from './pages/userRoutes/MyBorrowedBooks';
import MyExchangedBooks from './pages/userRoutes/MyExchangedBooks';
import MySellRecords from './pages/userRoutes/MySellRecords';
import MyLendRecords from './pages/userRoutes/MyLendRecords';
import MyExchangeRecords from './pages/userRoutes/MyExchangeRecords';
import EditSellPost from './pages/userRoutes/EditSellPost';
import EditBorrowPost from './pages/userRoutes/EditBorrowPost';
import EditExchangePost from './pages/userRoutes/EditExchangePost';
import Adminroute from './components/Adminroute';
import AllUser from './pages/adminRoutes/AllUser';
import TransactionBuySell from './pages/adminRoutes/TransactionBuySell';
import TransactionBorrow from './pages/adminRoutes/TransactionBorrow';
import TransactionExchange from './pages/adminRoutes/TransactionExchange';
import About from './pages/About';
import Contact from './pages/Contact';
import AllBuySellPost from './pages/adminRoutes/AllBuySellPost';
import AllBorrowPost from './pages/adminRoutes/AllBorrowPost';
import AllExchangePost from './pages/adminRoutes/AllExchangePost';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />


      <Route path="/user" element={<Privateroute />}>
        <Route path="addsell" element={<UserDashboard />} />
        <Route path="buysell" element={<BuySellSection />} />
        <Route path="borrow" element={<BorrowSection />} />
        <Route path="exchange" element={<ExchangeSection />} />
        <Route path="profile/:userId" element={<ProfileInfo />} />
        <Route path="addborrow" element={<AddBorrow />} />
        <Route path="addexchange" element={<AddExchange />} />
        <Route path="book-info/:sid" element={<OrderPlaceForm />} />
        <Route path="borrow-book-info/:borrId" element={<BorrowForm />} />
        <Route path="exchange-book-info/:ebId" element={<ExchangeForm />} />
        <Route path="exchange-requests/:eEmail" element={<ExchangeRequests/>} />
        <Route path="borrow-requests/:eEmail" element={<BorrowRequests/>} />
        <Route path="order-requests/:eEmail" element={<OrderRequests/>} />
        <Route path="my-sell-posts/:eEmail" element={<MySellPosts/>} />
        <Route path="my-borrow-posts/:eEmail" element={<MyBorrowPosts/>} />
        <Route path="my-exchange-posts/:eEmail" element={<MyExchangePosts/>} />
        <Route path="my-purchase/:eEmail" element={<MyPurchase/>} />
        <Route path="my-borrow/:eEmail" element={<MyBorrowedBooks/>} />
        <Route path="my-exchange/:eEmail" element={<MyExchangedBooks/>} />
        <Route path="my-sell-records/:eEmail" element={<MySellRecords/>} />
        <Route path="my-lend-records/:eEmail" element={<MyLendRecords/>} />
        <Route path="my-exchange-records/:eEmail" element={<MyExchangeRecords/>} />
        <Route path="edit-sell-post/:sid" element={<EditSellPost/>} />
        <Route path="edit-borrow-post/:borrId" element={<EditBorrowPost/>} />
        <Route path="edit-exchange-post/:ebId" element={<EditExchangePost/>} />
      </Route>

      <Route path="/admin" element={<Adminroute />}>
          <Route path="all-user" element={<AllUser />} />
          <Route path="buy-sell-transaction" element={<TransactionBuySell />} />
          <Route path="borrow-transaction" element={<TransactionBorrow />} />
          <Route path="exchange-transaction" element={<TransactionExchange />} />
          <Route path="all-buy-sell-post" element={<AllBuySellPost />} />
          <Route path="all-borrow-post" element={<AllBorrowPost />} />
          <Route path="all-exchange-post" element={<AllExchangePost />} />
        
      </Route>

    </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
