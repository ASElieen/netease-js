import React from 'react'
import { LoadingWrapper } from './CircleLoadingStyle'

const CircleLoading = () => {
  return (
    <LoadingWrapper>
        <div></div>
        <div></div>
    </LoadingWrapper>
  )
}

export default React.memo(CircleLoading);