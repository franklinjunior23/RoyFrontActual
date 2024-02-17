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
    <article className=" w-full h-[170px] shadow-md border  border-black/5  rounded-lg text-white dark:bg-DarkComponent p-6 py-10">
      <div   className="grid gap-10">
        <div className="skeleton rounded-lg w-[55%] h-6 mx-auto"></div>
        <div className="skeleton rounded-lg w-full h-10 mx-auto"></div>
      </div>
    </article>
  );
}
