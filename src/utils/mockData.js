let listings = [
  {
    id: 1,
    car: 'Demo Car 1',
    owner: 'Demo User 1',
    status: 'pending',
  },
  {
    id: 2,
    car: 'Demo Car 2',
    owner: 'Demo User 2',
    status: 'pending',
  }
];

let auditTrail = [];

export function getListings(statusFilter) {
  if (!statusFilter || statusFilter === 'all') return listings;
  return listings.filter(listing => listing.status === statusFilter);
}

export function updateListing(id, updates, admin = 'admin') {
  listings = listings.map(listing =>
    listing.id === id ? { ...listing, ...updates } : listing
  );
  const updated = listings.find(l => l.id === id);
  auditTrail.push({
    listingId: id,
    action: updates.status || 'edited',
    admin,
    timestamp: new Date().toISOString()
  });
  return updated;
}

export function getAuditTrail() {
  return auditTrail;
}