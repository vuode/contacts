import {useCallback, useEffect, useMemo, useState} from 'react'
import {type Contact, getContacts} from '../api/contacts'

export const useContacts = (): [
  Contact[],
  React.Dispatch<React.SetStateAction<string>>,
  number[],
  (id: number) => void,
] => {
  const [contactsList, setContactsList] = useState<Contact[]>([])
  const [term, setTerm] = useState('')
  const [checked, setChecked] = useState<number[]>([])

  const filteredContactsList = useMemo(
    () =>
      contactsList.filter(({first_name, last_name}) =>
        `${first_name} ${last_name}`.toLowerCase().includes(term),
      ),
    [contactsList, term],
  )

  const toggleChecked = useCallback(
    (id: number, log?: boolean) => {
      setChecked((previous) => {
        if (previous.includes(id)) {
          const updatedValue = previous.filter(
            (selectedId) => selectedId !== id,
          )

          if (log) {
            console.log(updatedValue)
          }

          return updatedValue
        }

        const updatedValue = [...previous, id]

        if (log) {
          console.log(updatedValue)
        }

        return updatedValue
      })
    },
    [setChecked],
  )

  useEffect(() => {
    const populate = async () => {
      const data = await getContacts()

      setContactsList(data)
    }

    void populate()
  }, [])

  return [filteredContactsList, setTerm, checked, toggleChecked]
}
