import React, { useContext, useEffect, useState } from 'react'
import './Books.css'
import { BookContext } from './LibraryContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function Books() {
     //To maintain the current data of book and access it throughout the app we use useContext here.
    const { book, updateBook } = useContext(BookContext);
    {/* to edit the existing data in library the element was accessed by id, when user clicked edit button the particular object was filtered in hadleEdit
and set to selectedData state variable to perform update */}
    const [selectedData, setSelectedData] = useState();
    const handleEdit = (e) => {
        setSelectedData(book.filter((item) => item.id == e.id)[0]);
    }
{/*to delete the particular element or data in book handleDelete func used to filter the data set the remaining to book variable */}
    const handleDelete = (e) => {
        updateBook(book.filter((item) => item.id != e.id));
    }
{/* to update the changes made in particular elements data handleupdate func used and splice method used to update the new changes in the element
and the data was set to book variable  */}
    const handleUpdate = () => {
        const updatedItems = [...book];
        updatedItems.splice(selectedData.id,1,selectedData);
        updateBook(updatedItems);
        // console.log(book)
    }
    return (
        <div className='container-fluid p-5'>
            <div className='col-10 main'>
                {/*an modal was created to edit the existing data in library when user click edit icon it will popup with picked data
                and we can edit the data in the library to make update */}
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            </div>
                            <div className="modal-body">
                                <Formik
                                 // initials values was created to get the input from field and to validate it.
                                    initialValues={selectedData}
                                    enableReinitialize={true}
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
                                        setSelectedData(values);
                                        return error;
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                               {/* to display the error message when users input was not included as per validation the error message was added for each
                                            input field  */}
                                            <div className='py-2 px-3'>
                                                <label htmlFor="bookName" className='pb-1'>Title</label><br />
                                                <Field type='text' name="bookName" className={errors.bookName && touched.bookName ? "is-invalid input-width form-control" : "input-width form-control"}/>
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
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" onClick={() => {handleUpdate()}}  data-dismiss="modal">Update</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
                {/* to display the book data's separately in list table was created */}
                <table className='table table-striped table-bordered'>
                    <thead className='table-secondary text-center'>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">ISBN Number</th>
                            <th scope="col">Publication Date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/**to create the table row dynamically depend upon the data's in array map func was used */}
                        {book.map((item) => {
                            // console.log(item.bookName);
                            return (
                                <tr key={item.id}>
                                    <td>{item.bookName}</td>
                                    <td>{item.authorName}</td>
                                    <td>{item.isbnNumber}</td>
                                    <td>{item.publicationDate}</td>
                                    <td className='text-center'><button id={item.id} type="button" onClick={(e) => handleEdit(e.target)} className='btn btn-info'  data-toggle="modal" data-target="#exampleModal"><i className="bi bi-pencil"></i></button></td>
                                    <td className='text-center'><button id={item.id} type="button" onClick={(e) => handleDelete(e.target)} className='btn btn-danger'><i className="bi bi-trash"></i></button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Books;