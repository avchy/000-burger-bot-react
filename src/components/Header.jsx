import React, { useEffect, useState } from 'react'
import { Button, Typography, MenuItem, Select, Box } from '@mui/material'
import { useTelegram } from 'hooks/useTelegram'
import 'App.scss'
import { FlexRowContainer } from 'components/AllHelpComponents'
import generatedGitInfo from 'helpers/generatedGitInfo.json'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { serverIP, port } from 'constants/api'
import { tableData } from 'constants/constants'
import { languageButtons } from '../constants/languageButtons'
import { useTheme } from '@mui/material/styles'
import { StyledButton } from 'components/StyledButton'
import waiterImg from 'images/waiter.png'

import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export const Header = () => {
  const location = useLocation()
  console.log('location :>> ', location)
  const query = queryString.parse(location.search)
  console.log('query', query)
  console.log('query.restaurant_id', query.restaurant_id)

  const { gitCommitHash, timeCommitPushed, timeUploadingToNetlify } = generatedGitInfo

  const theme = useTheme()
  // const tele = window.Telegram.WebApp

  const { user, queryId, onClose } = useTelegram()
  const { t, i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isTestTextVisible, setTestTextVisible] = useState(false)
  const [tableNumber, setTableNumber] = useState('')
  const [restaurant_id, setRestaurant_id] = useState('')
  const [formOpenSendWaiter, setFormOpenSendWaiter] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    console.log('window.location.search :>> ', window.location.search)
    console.log('searchParams :>> ', searchParams)

    const restaurant_id = searchParams.get('restaurant_id')
    setRestaurant_id(restaurant_id)

    const fullPath = window.location.href
    console.log('Полный путь адреса:', fullPath)
  }, [])

  const handleTableNumberChange = (event) => {
    setTableNumber(event.target.value)
  }

  const toggleTestText = () => {
    setTestTextVisible(!isTestTextVisible)
  }
  useEffect(() => {
    // const language_code = user?.language_code
    if (user?.language_code && currentLanguage !== user?.language_code) {
      setCurrentLanguage(user?.language_code)
      i18n.changeLanguage(user?.language_code)
    }
  }, [user?.language_code])

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
    i18n.changeLanguage(language)
  }

  async function onSendWaiter() {
    const dataPay = {
      queryId: '0',
      cartItems: [],
      comment: 'Send Waiter',
      totalPrice: '-',
      paymentMethod: '-',

      address: `tableNumber: ${tableNumber}`,
      optionDelivery: 'Send Waiter',

      user_id: user?.id || 0,
      user_name: user?.username || '',
    }

    try {
      const response = await axios.post(serverIP + '/create_order_db', dataPay)
      console.log('Запрос "onSendWaiter" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "onSendWaiter":', error)
      return
    } finally {
      setFormOpenSendWaiter(false)
    }
  }

  const onOpenSendWaiter = () => {
    setFormOpenSendWaiter(formOpenSendWaiter ? false : true)
  }

  return (
    <>
      <FlexRowContainer sx={{ justifyContent: 'space-between' }}>
        <Select
          value={currentLanguage}
          onChange={(event) => changeLanguage(event.target.value)}
          sx={{
            border: '2px solid orange',
            backgroundColor: theme.blue,
            width: '150px',
            marginBottom: '10px',
          }}
        >
          {languageButtons.map((button) => (
            <MenuItem key={button.code} value={button.code} sx={{ height: '100px' }}>
              <FlexRowContainer>
                <Box>{button.flag} </Box>

                <Box>{button.label}</Box>
              </FlexRowContainer>
            </MenuItem>
          ))}
        </Select>

        <StyledButton onClick={onOpenSendWaiter} variant='contained'>
          {t('Call the waiter')}
          <div className='imageContainer'>
            <img loading='lazy' src={waiterImg} alt={'waiterImg'} width='50' height='50' />
          </div>
        </StyledButton>
        {formOpenSendWaiter && (
          <Box sx={{ padding: '10px 20px ', backgroundColor: theme.blue }}>
            <Select
              value={tableNumber}
              onChange={handleTableNumberChange}
              sx={{ width: '150px', marginBottom: '10px' }}
            >
              {tableData.map((table) => (
                <MenuItem key={table.value} value={table.value}>
                  {table.label}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant='contained'
              sx={{ width: '150px', color: 'black', height: '100%' }}
              onClick={onSendWaiter}
              disabled={!tableNumber}
            >
              call the waiter{' '}
            </Button>
          </Box>
        )}
      </FlexRowContainer>

      <Button
        sx={{
          width: '100%',
          color: 'black',
          height: '30px',
          border: '1px solid black',
        }}
        onClick={toggleTestText}
      ></Button>

      {isTestTextVisible && (
        <>
          <p className={'testText'}>{`window.location.href - ${window.location.href}`} </p>
          <p className={'testText'}>{`restaurant_id - ${query.restaurant_id}`} </p>
          <p className={'testText'}>{`user?.language_code - ${user?.language_code}`} </p>
          <p className={'testText'}>{`currentLanguage - ${currentLanguage}`} </p>

          <p className={'testText'}>{`timeCommitPushed - ${timeCommitPushed}`} </p>

          <p className={'testText'}>{`timeUploadNetlify - ${timeUploadingToNetlify}`}</p>

          <p className={'testText'}>{`gitCommitHash - ${gitCommitHash}`}</p>

          <p className={'testText'}>{`queryId - ${queryId}`}</p>

          <p className={'testText'}>
            branch = master ---
            <a href='https://app.netlify.com/sites/burger-web-app/deploys'>
              <img
                src='https://api.netlify.com/api/v1/badges/b7a2257c-e7b7-4c1b-8770-02c390f46ab0/deploy-status'
                alt='Netlify Status'
              />
            </a>
          </p>

          <p className={'testText'}>
            branch = dev ---
            <a href='https://app.netlify.com/sites/burger-web-app/deploys'>
              <img
                src='https://api.netlify.com/api/v1/badges/b7a2257c-e7b7-4c1b-8770-02c390f46ab0/deploy-status?branch=dev'
                alt='Netlify Status'
              />
            </a>
          </p>
        </>
      )}
    </>
  )
}
