const fallbackImage = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80';

const formatDate = (value) => {
  if (!value) return 'Coming soon';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const getImage = (record) => record.images?.[0]?.url || record.image || fallbackImage;

export const normalizeClassRecord = (record) => ({
  ...record,
  id: record._id || record.id,
  name: record.name || record.title || 'Dance Class',
  style: record.style || record.category || 'Dance',
  description: record.description || 'Studio dance instruction at Geet Studio.',
  longDescription: record.longDescription || record.description || 'Studio dance instruction at Geet Studio.',
  schedule: record.schedule || record.days || [],
  time: record.time || record.classTiming || 'Schedule to be announced',
  startDate: formatDate(record.startDate),
  duration: record.duration || record.classDuration || '1 Hour',
  mode: record.mode || (record.isOnline ? 'Online' : 'Offline'),
  totalSeats: Number(record.totalSeats) || 0,
  availableSeats: Number(record.availableSeats ?? record.totalSeats) || 0,
  price: Number(record.price ?? record.fees) || 0,
  discount: Number(record.discount) || 0,
  image: getImage(record),
  level: record.level || 'All Levels',
  highlights: record.highlights || [],
  instructor: record.instructor || record.instructorId?.name || 'Geet Studio',
});

export const normalizeWorkshopRecord = (record) => ({
  ...normalizeClassRecord(record),
  date: formatDate(record.date || record.startDate),
  instructorBio: record.instructorBio || '',
  includes: record.includes || [],
});

export const normalizeCommunityRecord = (record) => ({
  ...record,
  id: record._id || record.id,
  image: record.image || record.profileImage?.url || fallbackImage,
  services: Array.isArray(record.services) ? record.services : [],
  city: record.city || record.location || 'Indore',
  area: record.area || '',
});