import { useCallback, useEffect, useState } from 'react'
import './Form.scss'

import { useTelegram } from '../../hooks/useTelegram'
import Order from '../Order/Order'

const Form = () => {
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('physical')
    const { tg } = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject,
        }
        tg.sendData(JSON.stringify(data))
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send Data',
        })
    }, [])

    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <>
            <Order />

            <div className={'form'}>
                <h3>Enter your information</h3>
                <input
                    className={'input'}
                    type='text'
                    placeholder={'Country'}
                    value={country}
                    onChange={onChangeCountry}
                />
                <input
                    className={'input'}
                    type='text'
                    placeholder={'Street'}
                    value={street}
                    onChange={onChangeStreet}
                />
                <select value={subject} onChange={onChangeSubject} className={'select'}>
                    <option value={'physical'}>Natural person</option>
                    <option value={'legal'}>Legal entity</option>
                </select>
            </div>
        </>
    )
}

export default Form
