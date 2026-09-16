export default function NewReview() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-medium text-zinc-500">
          NEW REVIEW
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          What are we testing?
        </h1>

        <p className="mt-3 text-zinc-400">
          Enter the product details before starting the protocol.
        </p>

        <form className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Brand
            </label>
            <input
              type="text"
              placeholder="Sony"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Model
            </label>
            <input
              type="text"
              placeholder="WF-1000XM5"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Product type
            </label>

            <select
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="earbuds">Earbuds</option>
              <option value="headphones">Headphones</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-white px-5 py-4 font-semibold text-black"
          >
            Begin 10-Test Review
          </button>
        </form>
      </div>
    </main>
  );
}
