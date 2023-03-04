export type Contact = {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  avatar: string | undefined
}

export const getContacts = async () => {
  const response = await fetch('/data.json')

  const data = (await response.json()) as Contact[]

  return data.sort((a, b) => a.last_name.localeCompare(b.last_name)) ?? []
}
