export default function BranchSkeleton() {
  return (
    <main className="grid grid-cols-2  md:grid-cols-4  gap-4">
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
    </main>
  );
}

function ItemSkeleton() {
  return (
    <article className="bg-gray-100 w-full h-[170px] shadow-md border border-black/5 dark:border-none rounded-lg text-white dark:bg-DarkComponent"></article>
  );
}
