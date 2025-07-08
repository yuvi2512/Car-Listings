import { getAuditTrail } from '@/utils/mockData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(getAuditTrail());
  } else {
    res.status(405).end();
  }
}