import React,{FC} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../Layouts/Footer/Footer'
import Metadata from '../Layouts/Header/Metadata'

type Props = {}

const Home: FC<Props> = () => {
  return (
    <div className='bg-[#F1F3F6]'>
        <Metadata title="Shopping Site for apparel,Clothes for Men,Women,and kids. Best Offers!" />
        {/* Top Layout- Navbar */}
        <Navbar />
        {/* Mid layout- Main  */}
        <Outlet />
        {/* Bottom Layout - Footer */}
        <Footer />
    </div>
  )
}

export default Home;