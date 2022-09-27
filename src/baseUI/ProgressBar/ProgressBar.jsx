import React from 'react'
import { ProgressBarWrapper } from './ProgressStyle'

const ProgressBar = () => {
  return (
    <ProgressBarWrapper>
        <div className='bar-inner'>
            <div className='progress'></div>
            <div className='progress-btn-wrapper'>
                <div className='progress-btn'></div>
            </div>
        </div>
    </ProgressBarWrapper>
  )
}

export default ProgressBar