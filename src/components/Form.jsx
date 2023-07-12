import { useCallback, useEffect, useState } from 'react'
import '../App.scss'

import { useTelegram } from 'hooks/useTelegram'

export const Form = () => {
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('physical')
    const { tele } = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject,
        }
        tele.sendData(JSON.stringify(data))
    }, [country, street, subject])

    useEffect(() => {
        tele.onEvent('mainButtonClicked', onSendData)
        return () => {
            tele.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tele.MainButton.setParams({
            text: 'Send Data',
        })
    }, [])

    useEffect(() => {
        if (!street || !country) {
            tele.MainButton.hide()
        } else {
            tele.MainButton.show()
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
