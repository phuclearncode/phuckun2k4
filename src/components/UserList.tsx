import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import UserForm from "./UserForm";
import { getUsers, deleteUser } from "../services/userService";
import { UserData } from "../types/user.types";
import { useSnackbar } from 'notistack';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleEdit = (user: UserData) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await deleteUser(userId);
        fetchUsers();
        enqueueSnackbar('User deleted successfully!', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Failed to delete user.' + error, { variant: 'error' });
      }
    }
  };

  const handleFormSubmitSuccess = () => {
    enqueueSnackbar('User saved successfully!', { variant: 'success' });
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFormOpen(true)}
      >
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.dateOfBirth}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>View</Button>
                  <Button onClick={() => user.id && handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserForm
        open={isFormOpen}
        onClose={handleFormClose}
        user={selectedUser}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    </div>
  );
};

export default UserList;
