export interface Contact {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  avatar: string | null
}

export const getContacts = async () => {
  const response = await fetch('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json')

  const data = await response.json() as Contact[]

  return data.sort((a, b) => a.last_name.localeCompare(b.last_name)) ?? []
}