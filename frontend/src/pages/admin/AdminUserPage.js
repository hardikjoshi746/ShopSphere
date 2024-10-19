import UsersPageComponent from "./components/UsersPageComponent";
import axios from "axios";

const fetchUser = async (abctlr) => {
  const { data } = await axios.get("/api/users", {
    signal: abctlr.signal,
  });
  return data;
};

const deleteUser = async (usedId) => {
  const { data } = await axios.delete(`/api/users/${usedId}`);
  return data;
};

const AdminUserPage = () => {
  return <UsersPageComponent fetchUser={fetchUser} deleteUser={deleteUser} />;
};

export default AdminUserPage;
