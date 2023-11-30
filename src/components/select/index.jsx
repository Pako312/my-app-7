import React from 'react'
// import Select from 'react-select/dist/declarations/src/Select'
import styles from './style.module.scss'
import Select from 'react-select'
import clsx from 'clsx'
import { isDisabled } from '@testing-library/user-event/dist/utils'
import style from './style.module.scss'
const CustomSelect = (props) => {
    const {
        value,
            options,
            onChange,
            label,
            className,
            disabled

    }=props
    const selectClassnames = clsx(
        styles ['select-wrap'],
        className
    )
    return (
    
        <div className={selectClassnames}>
               {label && 
        <span className={styles['label']}>
            {label}
            </span>}
            <Select
            classNamePrefix='custom-select'
                value={value}
                onChange={onChange}
                options={options}
                disabled={!isDisabled}
            />
    
        </div>
    
    )
}

export default CustomSelect;