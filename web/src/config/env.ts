export default function getEnvSettings() {
  return {
    api: {
      url: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
    },
  };
}
