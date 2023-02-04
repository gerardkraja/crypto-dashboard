import { useState } from "react"

export function useCurrencyConverter(exchangeRate: number) {
  const [currencyInput, setCurrencyInput] = useState("")
  const [cryptoInput, setCryptoInput] = useState("")
  const allowedInputValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    null,
  ]
  const calculateCrypto = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newValue = (e.nativeEvent as InputEvent).data
    //Check if first character is dot
    if (newValue === "." && cryptoInput.length === 0) return
    //Check if the provided character is a number or dot
    if (!allowedInputValues.includes(newValue)) return
    //Check if there is a dot already in the string
    if (
      currencyInput.indexOf(newValue === null ? "null" : newValue) !== -1 &&
      newValue === "."
    )
      return
    if (newValue === null) {
      setCurrencyInput(currencyInput.substring(0, currencyInput.length - 1))
      if (currencyInput.substring(0, currencyInput.length - 1) === "") {
        setCryptoInput("")
      } else {
        setCryptoInput(String(parseFloat(e.target.value) / exchangeRate))
      }
    } else {
      setCurrencyInput(e.target.value)
      setCryptoInput(String(parseFloat(e.target.value) / exchangeRate))
    }
  }
  const calculateCurrency = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newValue = (e.nativeEvent as InputEvent).data
    //Check if first character is dot
    if (newValue === "." && cryptoInput.length === 0) return
    //Check if the provided character is a number or dot
    if (!allowedInputValues.includes(newValue)) return
    //Check if there is a dot already in the string
    if (
      cryptoInput.indexOf(newValue === null ? "null" : newValue) !== -1 &&
      newValue === "."
    )
      return
    if (newValue === null) {
      setCryptoInput(cryptoInput.substring(0, cryptoInput.length - 1))
      if (cryptoInput.substring(0, cryptoInput.length - 1) === "") {
        setCurrencyInput("")
      } else {
        setCurrencyInput(String(parseFloat(e.target.value) / exchangeRate))
      }
    } else {
      setCryptoInput(e.target.value)
      setCurrencyInput(String(parseFloat(e.target.value) / exchangeRate))
    }
  }
  return [currencyInput, cryptoInput, calculateCrypto, calculateCurrency]
}
