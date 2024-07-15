import React, { forwardRef, useEffect, useRef } from 'react'
import classes from './Input.module.css'
import { useImperativeHandle } from 'react';

const Input = forwardRef((props, ref) => {

    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    });
    // useEffect(() => {
    //     inputRef.current.focus();
    // }, []);


    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                placeholder={props.placeholder}
            />
        </div>
    )
})

export default Input
