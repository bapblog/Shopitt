import React,{FC} from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/brand/shopz1logo.png";
import TopHeader from './TopHeader';
import Categories from '../../pages/Layouts/Header/Categories';
import HelperLinks from '../../pages/Layouts/Header/HelperLinks';
import IconBtnBar from '../../pages/Layouts/Header/IconBtnBar';
import SearchBar from '../../pages/Layouts/Header/SearchBar';


type Props = {
    
}

const Navbar:FC<Props> = () => {
  return (
    <>
    <TopHeader />
    <div className="hidden sm:hidden  md:flex flex-col sticky top-0 left-0 z-50 mb-2 border-b shadow-sm shadow-yellow-200">
          {/* Navbar Section */}
          <div className="navbar text-center flex flex-nowrap justify-between  items-center bg-white p-2 px-12">
            {/* Logo */}
            <Link to={"/"} className="h-[auto] w-[9rem]">
              <img draggable='false' src={Logo} alt="shopz1 logo" className=" h-max w-max" />
            </Link>
            {/* Categories Div */}
            <Categories />
            {/* Other Options */}
            <div className="flex flex-col flex-nowrap justify items-end gap-2 text-xl">
              {/* Helper Links div  - help / login*/}
              <HelperLinks />
              {/* Container for -- Search & user most used iconbtn*/}
              <div className="flex flex-nowrap  justify-between gap-4">
                {/* Search Bar */}
                <SearchBar />
                {/* Icon btn bar- user to perform action */}
                <IconBtnBar />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar