import React, { Children } from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'

const Button = (props) => {
    const {
        Children,
        className,
        onClick,
        type = 'button',
        disabled
    } = props
    const mainClasses = clsx(
        styles.button,
        className,
        disabled ? styles['disabledBtn'] : styles.button
    )
    return (


        <div className={styles['currency-converter-wrap']}>

            <button
                disabled={disabled}
                type={type}
                onClick={onClick}
                className={mainClasses}>
                {Children}
            </button>

        </div>

    )
}

export default Button;
