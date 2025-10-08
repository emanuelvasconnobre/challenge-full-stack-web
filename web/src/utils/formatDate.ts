export default function formatDate(date: string | Date): string {
  const finalDate = typeof date === "string" ? new Date(date) : date;
  return finalDate.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
