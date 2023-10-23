import React, { FC } from 'react'
import {FiLoader} from 'react-icons/fi'
type Props = {}

const Loader: FC = (props: Props) => {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
           <FiLoader />
       </div>
  )
}

export default Loader;

