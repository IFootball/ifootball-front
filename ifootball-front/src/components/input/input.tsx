'use client'
import { InputHTMLAttributes, ReactNode } from 'react';
import styles from '../../../styles/page.module.scss'

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function Input(props: inputProps) {
    return (
        <div className={styles.loginField}>
            <input className={styles.loginInput} {...props} placeholder=" "/>
            <label htmlFor={props.name} className={styles.loginLabel}>{props.label}</label>
        </div>
    );
}
