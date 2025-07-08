import { getListings } from '@/utils/mockData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { status } = req.query;
    res.status(200).json(getListings(status));
  } else {
    res.status(405).end();
  }
}