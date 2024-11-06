import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { createUser, updateUser } from "../services/userService";
import { UserData } from "../types/user.types";
import { useFormik } from "formik";
import * as Yup from "yup";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  user: UserData | null;
  onSubmitSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  user,
  onSubmitSuccess,
}) => {
  const formik = useFormik({
    initialValues: {
      id: user ? user.id : undefined,
      fullName: user?.fullName || "",
      email: user?.email || "",
      address: user?.address || "",
      dateOfBirth: user?.dateOfBirth || "",
      phoneNumber: user?.phoneNumber || "",
      gender: user?.gender || "MALE",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required."),
      email: Yup.string()
        .email("Email is invalid.")
        .required("Email is required."),
      address: Yup.string().required("Address is required."),
      dateOfBirth: Yup.date().required("Date of birth is required.").nullable(),
      phoneNumber: Yup.string()
        .required("Phone number is required.")
        .max(15, "Phone number cannot exceed 15 characters."),
      gender: Yup.string().required("Gender is required."),
    }),
    onSubmit: async (values) => {
      try {
        if (user) {
          if (values.id !== undefined) {
            await updateUser(values.id, values);
          }
        } else {
          await createUser(values);
        }
        onSubmitSuccess();
        onClose();
      } catch (error) {
        console.error("Error while submitting the form", error);
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        id: user.id,
        fullName: user.fullName || "",
        email: user.email || "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || "",
        phoneNumber: user.phoneNumber || "",
        gender: user.gender || "MALE",
      });
    } else {
      formik.resetForm();
    }
  }, [user]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Update User" : "Add User"}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            label="Full name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={
              formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
            }
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            label="Gender"
            name="gender"
            select
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </TextField>
        </DialogContent>
        <DialogActions
          sx={{
            margin: "16px"
          }}
        >
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {user ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;
