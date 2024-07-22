import SearchPage from "./_components/SearchPage";

export default async function Home() {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  await fetch(`${url}/api/accessToken`, { method: "GET" });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h1>Search for Spotify Tracks</h1>
        <SearchPage />
      </div>
    </main>
  );
}
