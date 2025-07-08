import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function ListingTable({ rows, setEditData, setRows }) {
  const handleAction = async (id, action) => {
    const res = await fetch(`/api/listings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: action })
    });
    const updated = await res.json();
    setRows(prev => prev.map(row => row.id === id ? updated : row));
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
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
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.car}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleAction(row.id, 'approved')}>Approve</Button>
                <Button onClick={() => handleAction(row.id, 'rejected')}>Reject</Button>
                <Button onClick={() => setEditData(row)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
