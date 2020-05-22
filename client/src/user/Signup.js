import React, {useState} from 'react'
import Layout from '../core/Layout'
import {signup} from './userApi'

const Signup = () => {
    //writing state with multiple properties using useState()
    // values respresents the state and setValues represents a function to update the state
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    //destructuring properties from state
    const {name, email, password, error, success} = values

    // Higher Order Function(HOF), is a functiton returning another function
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    

    const clickSubmit = (event) => {
        event.preventDefault()
        // sending name, email, password of user property to backend by destructoring
        signup({name, email, password})
        .then(data => {
            if(data.error) {
                // updating the state by grabbing all the properties from the state named values with the setValues method
                // then updating them 
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })

    }

    const signUpForm = () => (
        <form>
           <div className='form-group'>
                <label className='text-muted'>
                    Name
                </label>
                <input onChange={handleChange('name')} type='text' value={name} className='form-control' />
            </div>
            
            <div className='form-group'>
                <label className='text-muted'>
                    Email
                </label>
                <input onChange={handleChange('email')} type='email' value={email} className='form-control' />
           </div>

           <div className='form-group'>
                <label className='text-muted'>
                    Password
                </label>
                <input type='password' onChange={handleChange('password')} value={password} className='form-control' />
           </div>
           <button onClick={clickSubmit} className='btn btn-primary'>
               Sign Up
           </button>
       </form> 
    )

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
            New account is created. Please sign in
        </div>
    )
    
    return (
        <Layout className='container col-md-8 offset-md-2' title='Sign Up' description='Sign Up to E-commerce App'>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup