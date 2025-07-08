import { updateListing } from '@/utils/mockData';

export default function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'PUT') {
    const updated = updateListing(id, req.body, req.body.admin || 'admin');
    res.status(200).json(updated);
  } else {
    res.status(405).end();
  }
}

