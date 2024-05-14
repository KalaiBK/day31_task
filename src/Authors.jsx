import React, { useContext, useState } from 'react'
import { AuthorContext } from './LibraryContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function Authors() {
    //To maintain the current data of book and access it throughout the app we use useContext here.
    const { author, updateAuthor } = useContext(AuthorContext);
    {/* to edit the existing data in library the element was accessed by id, when user clicked edit button the particular object was filtered in hadleEdit
and set to selectedData state variable to perform update */}
    const [selectedData, setSelectedData] = useState();
    {/*to delete the particular element or data in author data handleDelete func used to filter the data set the remaining to author variable */}
    const handleDelete = (e) => {
        console.log(e.id);
        updateAuthor(author.filter((item) => item.id != e.id));
    }
    const handleEdit = (e) => {
        setSelectedData(author.filter((item) => item.id == e.id)[0]);
    }
{/* to update the changes made in particular elements data handleupdate func used and splice method used to update the new changes in the element
and the data was set to author variable  */}
    const handleUpdate = () => {
        const updatedItems = [...author];
        updatedItems.splice(selectedData.id, 1, selectedData);
        updateAuthor(updatedItems);
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
                                        if (values.authorName.length < 6) {
                                            error.authorName = "Author Name should contain Minimum 5 Characters"
                                        }
                                        if (values.dateOfBirth.length == 0) {
                                            error.dateOfBirth = "Please Select Date of Birth"
                                        }
                                        if (values.shortBiography.length < 40) {
                                            error.shortBiography = "Biography should contain Minimum 20 Characters"
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
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" onClick={() => { handleUpdate() }} data-dismiss="modal">Update</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* to display the author data's separately in list table was created */}
                <table className='table table-striped table-bordered'>
                    <thead className='table-secondary text-center'>
                        <tr>
                            <th scope="col">Author</th>
                            <th scope="col">Date of Birth</th>
                            <th scope="col">Biography</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                         {/**to create the table row dynamically depend upon the data's in array map func was used */}
                        {author.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.authorName}</td>
                                    <td>{item.dateOfBirth}</td>
                                    <td>{item.shortBiography}</td>
                                    <td className='text-center'><button id={item.id} type="button" onClick={(e) => handleEdit(e.target)} className='btn btn-info' data-toggle="modal" data-target="#exampleModal"><i className="bi bi-pencil"></i></button></td>
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

export default Authors;