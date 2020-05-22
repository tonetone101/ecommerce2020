import React, {useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../user/userApi'
import {createCategory} from './adminApi'
import { Link } from 'react-router-dom'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // destructuring user and token from localstorage
    const {user, token} = isAuthenticated()

    const handleChange = (event) => {
        setError('')
        setName(event.target.value)
    }

    const showSuccess = () => {
        if (success) {
            return <h3 className='text-success'>{name} is created</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className='text-danger'>Category should be unique</h3>
        }
    }

    const goBack = () => (
        <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning'>
                Back to Dashboard
            </Link>
        </div>
    )

    const clickSubmit = (event) => {
        event.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api to create
        // sending the userId, token and the dat for the category whcih is name
        createCategory(user._id, token, {name})
        .then(data => {
            if (data.error) {
                setError(true)
            } else {
                setError('')
                setSuccess(true)
            }
        })

    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>
                    Name
                </label>
                <input type='text' value={name} className='form-control' onChange={handleChange} autoFocus required />
                
            </div>
            <button className='btn btn-outline-primary'> 
                    Create Category
            </button>
        </form>
    )

    return (
        
        <Layout title='Add a new Category' description={`G'day ${user.name}, ready to add a new category?`} >
           <div className='row'>
               <div className='col-md-8 offset-md-2'>
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
               </div>
           </div>

            
        </Layout>
    )

}

export default AddCategory