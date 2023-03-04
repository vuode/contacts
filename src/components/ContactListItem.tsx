import {type Contact} from '../api/contacts'
import {Avatar} from './Avatar'

type ContactListItemProps = {
  contact: Contact
  toggle: (id: number, log?: boolean) => void
  isChecked: boolean
}

export const ContactListItem: React.FC<ContactListItemProps> = ({
  contact,
  toggle,
  isChecked,
}) => {
  const {id, avatar, first_name, last_name} = contact

  return (
    <li className="border-b border-slate-200 last:border-none">
      <button
        className="p-2 flex items-center w-full"
        onClick={() => {
          toggle(id)
        }}
      >
        <Avatar src={avatar} firstName={first_name} lastName={last_name} />
        <span className="mx-4 grow">{`${first_name} ${last_name}`}</span>
        <input
          className="h-6 w-6 rounded-lg shadow focus:ring-transparent"
          type="checkbox"
          checked={isChecked}
          readOnly
        />
      </button>
    </li>
  )
}
