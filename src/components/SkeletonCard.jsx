export function SkeletonMovieCard() {
  return (
    <div className="w-[150px] shrink-0 sm:w-[168px] md:w-[180px]">
      <div className="skeleton aspect-[2/3] w-full rounded-xl" />
      <div className="skeleton mt-2 h-4 w-4/5 rounded" />
      <div className="skeleton mt-1.5 h-3 w-1/3 rounded" />
    </div>
  )
}

export function SkeletonRail({ count = 6 }) {
  return (
    <div className="rail">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonMovieCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonMovieCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="skeleton relative h-[62vh] min-h-[420px] w-full sm:h-[75vh]">
      <div className="absolute bottom-10 left-4 right-4 space-y-4 sm:left-10 sm:max-w-xl">
        <div className="skeleton h-4 w-28 rounded" />
        <div className="skeleton h-10 w-4/5 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex gap-3 pt-2">
          <div className="skeleton h-11 w-36 rounded-lg" />
          <div className="skeleton h-11 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonDetails() {
  return (
    <div className="animate-fadeIn">
      <div className="skeleton h-[45vh] w-full sm:h-[55vh]" />
      <div className="mx-auto -mt-24 flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:px-8">
        <div className="skeleton h-[270px] w-[180px] shrink-0 rounded-xl" />
        <div className="mt-24 flex-1 space-y-4 sm:mt-0">
          <div className="skeleton h-8 w-2/3 rounded" />
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-24 w-full rounded" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonCastRow({ count = 6 }) {
  return (
    <div className="rail">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[110px] shrink-0 text-center">
          <div className="skeleton mx-auto h-[110px] w-[110px] rounded-full" />
          <div className="skeleton mx-auto mt-2 h-3 w-4/5 rounded" />
          <div className="skeleton mx-auto mt-1 h-3 w-3/5 rounded" />
        </div>
      ))}
    </div>
  )
}
