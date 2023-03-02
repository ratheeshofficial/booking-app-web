import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import AdminHome from "./pages/admin/AdminHome";
import HotelTable from "./pages/admin/HotelTable";
import RoomTable from "./pages/admin/RoomTable";
import UserTable from "./pages/admin/UserTable";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

function App() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.isAdmin ? <AdminHome /> : <Home />} />
        <Route
          path="/users"
          element={user?.isAdmin ? <UserTable /> : "users"}
        />
        <Route
          path="/hotels"
          element={user?.isAdmin ? <HotelTable /> : <List />}
        />
        <Route
          path="/rooms"
          element={user?.isAdmin ? <RoomTable /> : "rooms"}
        />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
