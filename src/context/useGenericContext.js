import React from 'react'
import { useContext } from 'react'
import { GenericContext } from './GenericContextProvider'

export default function useGenericContext() {
  return useContext(GenericContext)
}
