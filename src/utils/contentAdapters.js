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

export const normalizeClassRecord = (record) => {
  const category = record.category || 'Dance';
  let subtype = record.danceStyle || record.style || 'Bollywood';
  if (category === 'Music') {
    subtype = record.musicType || 'Vocal & Instrumental';
  } else if (category === 'Fitness') {
    subtype = record.fitnessType || 'Fitness & Movement';
  } else if (category === 'Events & Productions') {
    subtype = record.productionType || 'Production & Events';
  }

  const totalSeats = Number(record.totalSeats) >= 0 ? Number(record.totalSeats) : 20;
  const enrolledSeats = Number(record.enrolledSeats) >= 0 ? Number(record.enrolledSeats) : 0;
  const availableSeats = Math.max(0, totalSeats - enrolledSeats);

  return {
    ...record,
    id: record._id || record.id,
    name: record.name || record.title || 'Class',
    category,
    danceStyle: record.danceStyle || record.style || 'Bollywood',
    musicType: record.musicType || '',
    fitnessType: record.fitnessType || '',
    productionType: record.productionType || '',
    subtype,
    style: subtype,
    description: record.description || 'Studio instruction at Geet Studio.',
    longDescription: record.longDescription || record.description || 'Studio instruction at Geet Studio.',
    schedule: Array.isArray(record.schedule) ? record.schedule : (record.days || []),
    time: record.time || record.classTiming || 'Schedule to be announced',
    startDate: formatDate(record.startDate),
    duration: record.duration || record.classDuration || '1 Hour',
    mode: record.mode || (record.isOnline ? 'Online' : 'Offline'),
    totalSeats,
    enrolledSeats,
    availableSeats,
    price: Number(record.price ?? record.fees) || 0,
    discount: Number(record.discount) || 0,
    image: getImage(record),
    level: record.level || 'All Levels',
    highlights: record.highlights || [],
    instructor: record.instructor || record.instructorId?.name || 'Arpit Mahor',
  };
};

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