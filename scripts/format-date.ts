const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(value: string): string {
  if (value === "present") return "Present";
  const m = value.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
  if (!m) return value;
  const [, year, month] = m;
  if (month) {
    const idx = parseInt(month, 10) - 1;
    if (idx >= 0 && idx < 12) return `${MONTHS[idx]} ${year}`;
  }
  return year;
}
