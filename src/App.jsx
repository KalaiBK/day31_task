import './App.css'
import { AuthorProvider, BookProvider } from './LibraryContext.jsx'
import Root from './Root.jsx'

function App() {
  return (
    <BookProvider>
      <AuthorProvider>
        <Root />
    </AuthorProvider>
    </BookProvider>
  )
}

export default App
