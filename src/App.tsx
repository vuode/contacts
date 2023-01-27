import { ContactListItem } from "./components/ContactListItem"
import { LoadingItem } from "./components/LoadingItem"
import { useContacts } from "./hooks/useContacts"
import { useScrollLoad } from "./hooks/useScrollLoad"
import { useSlowLoad } from "./hooks/useSlowLoad"

const App: React.FC = () => {
  const [filteredContactsList, setTerm, checked, toggleChecked] = useContacts()
  const [renderedContactsList, loadMore, reachedEnd] = useSlowLoad(filteredContactsList, 10)
  const [scrollHandler, loading] = useScrollLoad(loadMore, reachedEnd)

  return (
    <div className="h-screen h-screen-ios overflow-scroll" onScroll={scrollHandler}>
      <div className="mx-auto max-w-3xl">
        <div className="my-8 mx-4 bg-slate-200 rounded-3xl">
          <header className="p-4 bg-slate-100 rounded-3xl flex justify-center">
            <h1 className="text-lg">Contacts App</h1>
          </header>
          <main className="p-4">
            <input
              className="mb-4 p-2 flex-grow rounded-xl bg-slate-50 w-full"
              onChange={({ target }) => setTerm(target.value.toLowerCase())}
              placeholder="Search"
            />
            <ul className="px-2 bg-slate-50 rounded-xl">
              {renderedContactsList.map((contact) => (
                <ContactListItem
                  key={contact.id}
                  contact={contact}
                  toggle={toggleChecked}
                  isChecked={checked.includes(contact.id)}
                />
              ))}
              {loading && <LoadingItem />}
            </ul>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
