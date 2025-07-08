import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function AuditTrailPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/audit')
      .then(res => res.json())
      .then(setLogs);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Audit Trail</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Listing ID</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.listingId}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.admin}</TableCell>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}