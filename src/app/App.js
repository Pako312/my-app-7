import React, { Children, useEffect, useState } from 'react';
import Button from '../components/button';
import styles from './app.module.scss';
import CustomSelect from '../components/select';
import InputBox from '../components/input';
import swapImg from '../assets/img_7/swap.png'
import { REQUEST_HEADERS } from '../api/endpoints';
import { API } from '../api/endpoints';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import Loader from '../components/loader/loader';

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
  { value: 'AED', label: 'AED' },
  { value: 'EUR', label: 'EUR' },
  { value: 'AUD', label: 'AUD' },
  { value: 'KGS', label: 'KGS' }
]


function App() {
  const [inputBox, setInputBox] = useState('')
  const [fromOption, setFromOption] = useState(null)
  const [toOption, setToOption] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [symbolsOptions, setSymbolsOptions] = useState([])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleSwap = () => {
    setFromOption(toOption)
    setToOption(fromOption)
  }

  const getSymbols = async () => {
    const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS)
    const data = await res.json()
    return data.symbols
  }

  const transfromSymbolsDataToOptions = (symbolObj) => {
    return Object.keys(symbolObj).map(item => {
      return {
        value: item,
        label: item
      }
    })
  }
  const handleConvertCurr = async () => {
    if (!inputBox || !toOption || !fromOption) {
      return
    }

    try {
      setLoading(true)
      const res = await fetch(API.CURRENCY.convert(toOption.value, fromOption.value, inputBox), REQUEST_HEADERS)
      const data = await res.json()
      setResult({
        amount: data.query.amount,
        result: data.result,
        from: data.query.from,
        to: data.query.to,
      })

    } catch {
      alert('Error')
    } finally {
      setLoading(false);
    }
    

  }

  // IIFE функция
  useEffect(() => {
    (async () => {
      const symbols = await getSymbols()
      const options = transfromSymbolsDataToOptions(symbols)
      setSymbolsOptions(options)
    })()

  }, []);

  return (
    <div className={styles.container}>

      <div className={styles["currency-converter-wrap"]}>
        <div className={styles.header}>
          <h2>Currency Converter</h2>
        </div>
        <InputBox className={styles.inputBox}
          value={inputBox}
          onChange={(e) => setInputBox(e.target.value)}
        />
        <div className={styles.currBox}>
          <CustomSelect className={styles.customSelect}
            label='From'
            value={fromOption}
            onChange={val => setFromOption(val)}
            options={symbolsOptions} />

          <img
            onClick={handleSwap}
            className={styles.img}
            src={swapImg}>
          </img>


          <CustomSelect className={styles.customSelect}
            label='To'
            value={toOption}
            onChange={val => setToOption(val)}
            options={symbolsOptions}
          >


          </CustomSelect>
        </div>

        {selectedOption?.value}
        <Button
          Children={'Convert'}
          onClick={handleConvertCurr}
          className={styles['convert-btn ']}
        disabled={!inputBox && !fromOption && !toOption && isDisabled}
        >
          {/* {loading && <Loader/>} */}
        </Button>
        {result && `${result.amount} ${result.from} = ${result.result} ${result.to}`}
      </div>
    </div>

  );
}

export default App;


