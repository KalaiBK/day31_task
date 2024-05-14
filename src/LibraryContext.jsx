import { createContext, useState } from "react";

export const BookContext = createContext();
export const BookProvider = ({ children }) => {
    const [book, setBook] = useState([]);
    const updateBook = (newValue) => {
        setBook(newValue);
    };
    return(
        <BookContext.Provider value={{book, updateBook}}>
            {children}
        </BookContext.Provider>
    )
}

export const AuthorContext = createContext();
export const AuthorProvider = ({ children }) => {
    const [author, setAuthor] = useState([]);
    const updateAuthor = (newValue) => {
        setAuthor(newValue);
    };
    return(
        <AuthorContext.Provider value={{author, updateAuthor}}>
            {children}
        </AuthorContext.Provider>
    )
}