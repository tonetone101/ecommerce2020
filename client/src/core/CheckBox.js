import React, {useEffect, useState} from 'react'

const CheckBox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        // return the first index of -1
        const currentCategoryId = checked.indexOf(c) 
        // will equal to everything in the state
        const newCheckedCategoryId = [...checked]
        
        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        
        // sending data to parent component 
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((c, i) => {
        return (
            <li key={i} className='list-unstyled'>
                <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type='checkbox' className='form-check-input'/>
                <label className='form-check-label'>
                    {c.name}
                </label>
            </li>
        )
    })
}

export default CheckBox