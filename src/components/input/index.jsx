import React from 'react';
import style from './style.module.scss';
import clsx from "clsx";

const InputBox = (props) => {
  const {
    value,
    onChange,
    label,
    className,
    disabled,
  }= props;
  const inputClass =clsx(
    style.InputBox,
    className
  )
  return (
    <div className='inputField'>
<form>
    <label htmlFor="number">Enter Amount</label>
    <input 
    type="text" 
    value={value}
    onChange={onChange}
    className={inputClass}
    placeholder='1000'
    disabled={disabled}
    
    >

    </input>
</form>

    </div>
  )
}

export default InputBox;