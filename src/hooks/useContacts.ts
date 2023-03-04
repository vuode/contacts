import {useCallback, useEffect, useMemo, useState} from 'react'
import {type Contact, getContacts} from '../api/contacts'

export const useContacts = () => {
  const [contactsList, setContactsList] = useState<Contact[]>([])
  const [term, setTerm] = useState('')
  const [checked, setChecked] = useState<Set<number>>(new Set())

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
        const newChecked = new Set(previous)
        const removed = newChecked.delete(id)

        if (!removed) {
          newChecked.add(id)
        }

        if (log) {
          console.log(newChecked)
        }

        return newChecked
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

  return [filteredContactsList, setTerm, checked, toggleChecked] as const
}
