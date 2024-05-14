import React, { useContext, useState } from 'react'
import { AuthorContext } from './LibraryContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function Authors() {
    const { author, updateAuthor } = useContext(AuthorContext)
    const [selectedData, setSelectedData] = useState()
    const handleDelete = (e) => {
        console.log(e.id);
        updateAuthor(author.filter((item) => item.id != e.id));
    }
    const handleEdit = (e) => {
        setSelectedData(author.filter((item) => item.id == e.id)[0])
    }

    const handleUpdate = () => {
        const updatedItems = [...author]
        updatedItems.splice(selectedData.id, 1, selectedData)
        updateAuthor(updatedItems)
    }
    return (
        <div className='container-fluid p-5'>
            <div className='col-10 main'>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            </div>
                            <div className="modal-body">
                                <Formik
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
                                        setSelectedData(values)
                                        return error;
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
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

export default Authors