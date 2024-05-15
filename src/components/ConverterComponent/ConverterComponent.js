import React,{ useEffect, useState } from  "react"
import './ConverterComponent.css'

function ConverterComponent() {
    const currencyUnits = []
    const [currency, setCurrency] = useState([]) 
    const [input, setInput] = useState({
      currencyValueToBeConverted:'',
      convertedCurrencyValue: '',
      concurrencyUnitToBeConverted:'USD',
      convertedCurrencyUnit:'INR'
    })
  
    const fetchData = async() => {
      const response = await fetch('http://localhost:3500/api/v1/currency')
      const data = await response.json()
      data.map(iterator=> currencyUnits.push(iterator.code))
      setCurrency(currencyUnits)
    }
  
  
    const handleConvert = async() => {
      const response = await fetch(`http://localhost:3500/api/v1/convert/${input.concurrencyUnitToBeConverted}/${input.convertedCurrencyUnit}`,{
        method:'POST',
        crossDomain: true,
        headers: {
           'Content-type':'application/json',
           'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
          currencyValueToBeConverted: input.currencyValueToBeConverted
        })
    })
    const data = await response.json()
    setInput({ ...input,  convertedCurrencyValue: data.result.toFixed(5) })
    } 
  
    useEffect(() => {
      fetchData() 
    }, []) 
  
  
    useEffect(() => {
      if (input.currencyValueToBeConverted) {
        handleConvert() 
      }
    }, [input.convertedCurrencyUnit]) 
  
    return (
        <React.Fragment>
        <div className='master'>
          <div className='user-input'>
            <div className='title'>
              From:
              <select
                className='select'
                value={input.concurrencyUnitToBeConverted}
                onChange={(event) => {
                  setInput({ ...input, concurrencyUnitToBeConverted: event.target.value }) 
                }}
              >
                {currency?.map((item, itemIndex) => {
                  return <option key={itemIndex}>{item}</option> 
                })}
              </select>
            </div>
              <input
                className='input'
                value={input.currencyValueToBeConverted}
                placeholder='Enter the currency value'
                onChange={(event) => {
                  setInput({ ...input,  currencyValueToBeConverted: event.target.value }) 
                }}
                type='number'
              />
          </div>
          <div className='user-input'>
            <div className='title'>
              To:
              <select
                className='select'
                value={input.convertedCurrencyUnit}
                onChange={(event) => {
                  setInput({ ...input,  convertedCurrencyUnit: event.target.value }) 
                }}
              >
                {currency?.map((item, itemIndex) => {
                  return <option key={itemIndex}>{item}</option> 
                })}
              </select>
            </div>
            <input
              className='input'
              value={input.convertedCurrencyValue}
              placeholder='Find the converted currency'
              disabled
              onChange={(event) => {
                setInput({ ...input,  convertedCurrencyValue: event.target.value }) 
              }}
              type='text'
            />
          </div>
        </div>
        <div className='button-container'>
          <button onClick={handleConvert}>Convert</button>
        </div>
        </React.Fragment>
    ) 
}

export default ConverterComponent