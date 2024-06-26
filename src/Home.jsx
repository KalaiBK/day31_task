import React, { useContext, useEffect, useState } from 'react'
import { AuthorContext, BookContext } from './LibraryContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import './Home.css'

function Home() {
    //To maintain the current data of book,author and access it throughout the app we use useContext here.
    const { book, updateBook } = useContext(BookContext);
    const { author, updateAuthor } = useContext(AuthorContext);
    //To update the current count of book and author we use useState here.
    const [bookCount, setBookCount] = useState(0);
    const [authorCount, setAuthorCount] = useState(0);
  //To maintain the currrent count of the book & author when the count was increased or deleted from the library data we use useEffect here.  
    useEffect(() => {
        setBookCount(book.length);
        setAuthorCount(author.length);
    }, [book, author]);
    return (
        //to show the total available count of book and author two tile created with separated column and some style applied to look good
        <div className='col-10 main'>
            <div className='row'>
                <div className='col-6'>
                    <div className='rounded-2'>
                        <div className='book-tile rounded-1'>
                            <div className='row'>
                                <div className='col-8'><p className='total-books-count'>{bookCount}</p><p className='total-books-text'>Books</p></div>
                                <div className='col-4 d-flex justify-content-center'><img src='src\assets\Book.png' className='book-tile-image'></img></div>
                            </div>
                            <div className='book-tile-footer rounded-bottom-1 d-flex justify-content-center'>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='rounded-2'>
                        <div className='author-tile rounded-1'>
                            <div className='row'>
                                <div className='col-8'><p className='total-books-count'>{authorCount}</p><p className='total-books-text'>Authors</p></div>
                                <div className='col-4 d-flex justify-content-center'><img src='src\assets\Author.png' className='book-tile-image'></img></div>
                            </div>
                            <div className='author-tile-footer rounded-bottom-1 d-flex justify-content-center'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

{/* to add new book and author data into the library input field with formik validation was created for both separately with two
splitted columns and all necessary validation was added to the form*/}
            <div className='row section-top-margin'>
                {/* new book creating input field. */}
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-10 offset-md-1'>
                            <div className='shadow mb-5 bg-body-tertiary rounded-2'>
                                <div className='headerBook d-flex align-items-center rounded-top-2'>
                                    <i className="bi bi-plus-circle p-2"></i>Book
                                </div>
                                <Formik
                                // initials values was created to get the input from field and to validate it.
                                    initialValues={{ bookName: '', authorName: '', isbnNumber: '', publicationDate: '' }}
                                    validate={(values) => {
                                        const error = {};
                                        if (values.bookName.length < 6) {
                                            error.bookName = "Title should contain Minimum 5 Characters"
                                        }
                                        if (values.authorName.length < 6) {
                                            error.authorName = "Author Name should contain Minimum 5 Characters"
                                        }
                                        if (!/^[0-9]{13}$/.test(values.isbnNumber)) {
                                            error.isbnNumber = "ISBN must be of length 13 and should not contain characters"
                                        }
                                        if (values.publicationDate.length == 0) {
                                            error.publicationDate = "Please Select Publication Date"
                                        }
                                        return error;
                                    }}
                                    // the entered inputs was updated to the state variables dynamically by onSubmit function all operations are added to perform.
                                    onSubmit={(values, { resetForm }) => {
                                        values.id = book.length;
                                        book.push(values);
                                        console.log(book);
                                        updateBook(book);
                                        setBookCount(book.length);
                                        resetForm({ values: '' })
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            {/* to display the error message when users input was not included as per validation the error message was added for each
                                            input field  */}
                                            <div className='py-2 px-3'>
                                                <label htmlFor="bookName" className='pb-1'>Title</label><br />
                                                <Field type='text' name="bookName" className={errors.bookName && touched.bookName ? "is-invalid input-width form-control" : "input-width form-control"} />
                                                <ErrorMessage name='bookName' className='invalid-feedback' component='div' />
                                            </div>
                                            <div className='pb-2 px-3'>
                                                <label htmlFor="authorName" className='pb-1'>Author</label><br />
                                                <Field type='text' name="authorName" className={errors.authorName && touched.authorName ? "is-invalid input-width form-control" : "input-width form-control"} />
                                                <ErrorMessage name='authorName' className='invalid-feedback' component='div' />
                                            </div>
                                            <div className='pb-2 px-3'>
                                                <label htmlFor="isbnNumber" className='pb-1'>ISBN Number</label><br />
                                                <Field type='text' name="isbnNumber" className={errors.isbnNumber && touched.isbnNumber ? "is-invalid input-width form-control" : "input-width form-control"} />
                                                <ErrorMessage name='isbnNumber' className='invalid-feedback' component='div' />
                                            </div>
                                            <div className='pb-2 px-3'>
                                                <label htmlFor="publicationDate" className='pb-1'>Publication Date</label><br />
                                                <Field type='date' name="publicationDate" className={errors.publicationDate && touched.publicationDate ? "is-invalid input-width form-control" : "input-width form-control"} />
                                                <ErrorMessage name='publicationDate' className='invalid-feedback' component='div' />
                                            </div>
                                            <div className='py-4 px-3'>
                                                <button type='submit' className='custom-button'>Submit</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>

                            </div>
                        </div>
                    </div>
                </div>
{/* new author creating input field. */}
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-10 offset-md-1'>
                            <div className='shadow mb-5 bg-body-tertiary rounded-2'>
                                <div className='headerBook d-flex align-items-center rounded-top-2'>
                                    <i className="bi bi-plus-circle p-2"></i>Author
                                </div>
                                <Formik
                                // initials values was created to get the input from field and to validate it.
                                    initialValues={{ authorName: '', dateOfBirth: '', shortBiography: '' }}
                                    validate={(values) => {
                                        const error = {};
                                        if (values.authorName.length < 6) {
                                            error.authorName = "Author Name should contain Minimum 5 Characters"
                                        }
                                        if (values.dateOfBirth.length == 0) {
                                            error.dateOfBirth = "Please Select Date of Birth"
                                        }
                                        if (values.shortBiography.length < 40) {
                                            error.shortBiography = "Biography should contain Minimum 20 Characters"
                                        }
                                        return error;
                                    }}
                                    // the entered inputs was updated to the state variables dynamically by onSubmit function all operations are added to perform.
                                    onSubmit={(values, { resetForm }) => {
                                        values.id = author.length;
                                        console.log(author);
                                        author.push(values);
                                        updateAuthor(author);
                                        setAuthorCount(author.length);
                                        resetForm({ values: '' })
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                              {/* to display the error message when users input was not included as per validation the error message was added for each
                                            input field  */}
                                            <div className='py-2 px-3'>
                                                <label htmlFor="authorName" className='pb-1'>Author</label><br />
                                                <Field type='text' name="authorName" className={errors.authorName && touched.authorName ? "is-invalid input-width form-control" : "input-width form-control"} />
                                                <ErrorMessage name='authorName' className='invalid-feedback' component='div' />
                                            </div>
                                            <div className='pb-2 px-3'>
                                                <label htmlFor="dateOfBirth" className='pb-1'>Date Of Birth</label><br />
                                                <Field type='date' name="dateOfBirth" className={errors.dateOfBirth && touched.dateOfBirth ? "is-invalid input-width form-control" : "input-width form-control"} />
                                                <ErrorMessage name='dateOfBirth' className='invalid-feedback' component='div' />
                                            </div>
                                            <div className='pb-2 px-3'>
                                                <label htmlFor="shortBiography" className='pb-1'>Short Biography</label><br />
                                                <Field type='text' name="shortBiography" as={"textarea"} className={errors.shortBiography && touched.shortBiography ? "is-invalid textarea-expand input-width form-control" : "input-width textarea-expand form-control"} rows="4" />
                                                <ErrorMessage name='shortBiography' className='invalid-feedback' component='div' />
                                            </div>
                                            <div className='py-3 px-3'>
                                                <button type='submit' className='custom-button'>Submit</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;