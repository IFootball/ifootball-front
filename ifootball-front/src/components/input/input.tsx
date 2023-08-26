'use client'
import { InputHTMLAttributes, ReactNode } from 'react';
import styles from '../../../styles/page.module.scss'

interface inputProps extends InputHTMLAttributes<ReactNode> {
    label: string
}

export default function Input(props: inputProps) {
    return (
        <div className={styles.loginField}>
            <input className={styles.loginInput} type={props.type} id={props.name} name={props.name}  placeholder=" "/>
            <label htmlFor={props.name} className={styles.loginLabel}>{props.label}</label>
        </div>
    );
}

// autoComplete="off"