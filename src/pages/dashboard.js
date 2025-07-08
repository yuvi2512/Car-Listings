import { useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Card,
  CardHeader,
  Divider,
} from "@mui/material";
import EditDialog from "@/components/EditDialog";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import toast from "react-hot-toast";


export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/listings");
  const listings = await res.json();
  return { props: { listings } };
}

export default function Dashboard({ listings }) {
  const [rows, setRows] = useState(listings);
  const [editData, setEditData] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    if (isLoggedIn===false) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  const handleAction = async (id, action) => {
    const res = await fetch(`/api/listings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: action }),
    });
    const updated = await res.json();
    setRows((prev) => prev.map((row) => (row.id === id ? updated : row)));

    if (action === "rejected") { 
      toast.error("Listing rejected");
    } else if (action === "approved") {
      toast.success("Listing approved");
    } 
  };

  const filteredRows =
    statusFilter === "all"
      ? rows
      : rows.filter((row) => row.status === statusFilter);

  return (
    <Card sx={{ padding: 4, margin: 10 }} elevation={5}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CardHeader title="Admin Dashboard" />
        <Button variant="outlined" color="error" onClick={logout}>Logout</Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mt: 4 }}>
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={statusFilter}
            label="Status Filter"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Car</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.car}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleAction(row.id, "approved")}>Approve</Button>
                    <Button onClick={() => handleAction(row.id, "rejected")}>Reject</Button>
                    <Button onClick={() => setEditData(row)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <EditDialog
          data={editData}
          onClose={() => setEditData(null)}
          onSave={(updatedRow) => {
            setRows((prev) =>
              prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
            );
            setEditData(null);
          }}
        />
      </Box>
    </Card>
  );
}