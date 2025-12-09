export function formatDate(input: Date | string | number): string {
  const d = new Date(input); // Date-Objekt erzeugen

  if (isNaN(d.getTime())) return ""; // Ungültiges Datum abfangen
  const pad = (n: number) => n.toString().padStart(2, "0"); // führende Nullen
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
