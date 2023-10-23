import React from 'react'

// type Props = {}
// Helper Component-Heading
const TagLine = ({text}: {text: string}) => {
    return (
      <h2 className='text-white bold tracking-widest text-sm'>{text}</h2>
    )
  }
const TopHeader:React.FC = () => {
    return (
        <>
        <div className="th-wrapper hidden sm:hidden md:flex flex-nowrap justify-evenly items-center bg-black p-1">
            <TagLine text="SIGN UP TO SHOPZ1 & GET 15% OFF"/>
            <TagLine text="FREE DELIVERY FOR ALL ORDERS"/>
            <TagLine text="EXTRA 10% OFF ON HDFC CARD*"/>
        </div>
        </>
    )
}
export default TopHeader