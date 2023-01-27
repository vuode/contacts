export const LoadingItem = () => {
  return (
    <li className="flex p-2 items-center animate-pulse">
      <div className="h-12 w-12 rounded-full bg-slate-200" />
      <div className="grow mx-10 h-4 rounded-lg bg-slate-200" />
      <input
        className="h-6 w-6 rounded-lg text-slate-200 shadow"
        type="checkbox"
        disabled
        checked
      />
    </li>
  )
}
