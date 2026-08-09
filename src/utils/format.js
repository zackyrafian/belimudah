const formatIDR = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0, 
}).format;

const fmt = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
});

const formatDate = (value) =>  {
  if (!value) return '-';
  const d = new Date(value);
  return isNaN(d) ? '-' : fmt.format(d);
}

export { formatIDR, formatDate };