import { FC,useEffect} from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Pic from '../../assets/brand/profile-pic.svg'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BsBoxSeam } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
// import { logoutUser } from '../../actions/userAction';

type Props = {
  activeTab: string;
};
type ActionBtnProp = {
  icon: ReactJSXElement;
  text: String;
};
const ActionBtn: FC<ActionBtnProp> = ({ icon, text }) => {
  return (
    <Link to={'/'} className="flex flex-row justify-start  items-center gap-4 py-2 px-4 w-full border-slate-200 border-2 rounded-md">
       <>
      {icon}
      <h1>{text}</h1>
       </> 
    </Link>
  );
};
const Sidebar: FC<Props> = ({ activeTab }) => {
//   const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { user, isUser } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (isUser === false) {
      navigate("/login");
    }
  }, [isUser, navigate]);

  const handleLogout = () => {
    // dispatch(logoutUser());
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate("/login");
  };

  return (
    <div className="Account-wrapper flex flex-col items-start md:flex-row gap-4 py-4 px-1 md:px-14  bg-[#F1F3F6] ">
      {/* Action Section - Account info and Account related buttons */}
      <div className="actions-sec md:w-1/4 sm:mt-4 grid grid-cols-1 justify-start gap-4">
          {/*Action Button p- left / top section */}
          <div className="p-left-top flex flex-row  md:flex-col justify-center items-center gap-2 shadow-sm rounded-sm ">
            <div className="Account-info flex flex-row justify-center md:justify-start p-2  items-center gap-4 w-full bg-[#FFFFFF] shadow-sm">
              <img src={Pic} alt="Account-pic" className="w-12" />
              <div className="flex flex-col justify-start items-start gap-2">
                <h1>Hello</h1>
                <h1>{user?.name}</h1>
              </div>
            </div>
          </div>
          <div>
          <div className="flex items-center gap-5 px-4 py-4 border-b bg-[#FFFFFF]">
                <span className="text-primary-blue"><FolderIcon /></span>
                <Link className="flex w-full justify-between font-medium text-gray-500 hover:text-primary-blue" to="/orders">
                    My Actions
                <span><ChevronRightIcon /></span>
                </Link>
            </div>
          {/*Action Button p- right / bottom section */}
          <div className="p-right-bottom grid grid-cols-2 md:grid-cols-1  gap-y-6 gap-x-4 px-2 py-4 items-center  justify-items-start bg-[#FFFFFF] shadow-sm rounded-sm">
            <ActionBtn
              icon={<BsBoxSeam size="1.5rem" color="black" />}
              text="Orders"
            />
            <ActionBtn
              icon={<CgProfile size="1.5rem" color="black" />}
              text="Profile"
            />
            <ActionBtn
              icon={<AiOutlineHeart size="1.5rem" color="black" />}
              text="Wishlist"
            />
            <ActionBtn
              icon={<AiOutlineLogout size="1.5rem" color="black" />}
              text="Logout"
            />

            {/* <h1>Orders</h1> */}
            {/* <h1>Account</h1> */}
            {/* <h1>Wishlist</h1> */}
            {/* <h1>Logout</h1> */}
          </div>
          </div>
          
        </div>

      {/* Outlet of particular section Ex: Profile ! Order ! Wishlist ! Logout*/}
      {/* <div className="bg-[#FFFFFF] shadow-sm rounded-sm md:w-3/4">I am Outlet</div> */}
      <Outlet />
    </div>
  );
};

export default Sidebar;
