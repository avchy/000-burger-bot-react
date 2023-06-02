import React from 'react'
import '../App.scss'

export function BigButton({ title, disable, onClick }) {
    return (
        <button className={`bigButton`} disabled={disable} onClick={onClick}>
            {title}
        </button>
    )
}
