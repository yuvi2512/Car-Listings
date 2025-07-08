import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useState, useEffect } from 'react';

export default function EditDialog({ data, onClose, onSave }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleSave = async () => {
    const res = await fetch(`/api/listings/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const updated = await res.json();
    onSave(updated);
  };

  return (
    <Dialog open={!!data} onClose={onClose}>
      <DialogTitle>Edit Listing</DialogTitle>
      <DialogContent>
        <TextField
          label="Car"
          fullWidth
          margin="normal"
          value={form.car || ''}
          onChange={e => setForm({ ...form, car: e.target.value })}
        />
        <TextField
          label="Owner"
          fullWidth
          margin="normal"
          value={form.owner || ''}
          onChange={e => setForm({ ...form, owner: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
