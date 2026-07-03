export default function Loading() {
  return (
    <main className="container-shell py-16">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-80 animate-pulse rounded-2xl border border-outline-variant bg-white" />
        ))}
      </div>
    </main>
  );
}
