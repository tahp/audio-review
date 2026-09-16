export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-medium text-zinc-400">
          AUDIO REVIEW PROTOCOL
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Test audio.
          <br />
          Test it the same way.
        </h1>

        <p className="mt-5 text-zinc-400 leading-7">
          A guided, repeatable testing protocol for headphones and earbuds.
        </p>

     <a
  href="/review/new"
  className="mt-10 block w-full rounded-2xl bg-white px-5 py-4 text-center font-semibold text-black"
>
  Start New Review
</a>
        <div className="mt-10 border-t border-zinc-800 pt-6">
          <p className="text-sm text-zinc-500">
            Protocol v0.1 · 10 essential tests
          </p>
        </div>
      </div>
    </main>
  );
}
