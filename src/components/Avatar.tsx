import { useMemo } from "react"

interface AvatarProps {
  firstName: string
  lastName: string
  src?: string | null
}

export const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, src }) => {
  const initials = useMemo(
    () => firstName.slice(0, 1) + lastName.slice(0, 1),
    [firstName, lastName]
  )

  return src
    ? <img className="h-12 w-12 border-2 border-blue-200 rounded-full" src={src} />
    : (
      <div
        className="flex justify-center items-center bg-blue-100 h-12 w-12 border-2 border-blue-200 rounded-full font-bold text-blue-400"
        >
        {initials}
      </div>
    )
}