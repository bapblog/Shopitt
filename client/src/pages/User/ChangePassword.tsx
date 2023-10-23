/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC,useState,FormEvent,useEffect } from "react";
import { GrMail } from "react-icons/gr";
import { RiLockUnlockFill } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import WelcomeImg from "../../assets/images/sitting.png";
import Button from "../../components/Button/Button";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import { FormInput, IconBtn } from "./SignUp";
import { useSnackbar } from "notistack";
import {setErrors, setUser } from "../../redux/Slice/userSlice";
import Loader from "../Layouts/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


const ChangePassword:FC = () => {
  const dispatch = useAppDispatch();
  const {token} = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const location = useLocation();
  const [resetPassword, {data,error,isSuccess,isLoading}] = useResetPasswordMutation();
  const [password,setPassword] = useState<string>("");


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 
    if(password === ""){
      enqueueSnackbar("Please New Password",{variant: 'error'})
      return;
    }
    if(token){
      resetPassword({token: token,password: password});
    }
  }
  const redirect = location.search ? location.search.split("=")[1] : "login";


  useEffect(() => {
    // Handling Error
    if(error) {
      const errorMsg = (error as any)?.data?.errors || (error as any)?.data?.msg;
      enqueueSnackbar(errorMsg, {
        variant: 'error',
      });
    }

    if(isSuccess) {
      navigate(`/${redirect}`)
      enqueueSnackbar("Password Changed Successfully",{variant: "success"})
      setTimeout(() => enqueueSnackbar(" Login with new password", {variant: 'info'}),2000)
    }
  },[enqueueSnackbar, error, isSuccess, navigate, redirect])


    return (
      <> 
        <div className="login-wrapper md:scale-95 flex flex-col md:flex-row flex-nowrap justify-start items-center   md:w-3/5 mx-2 md:mx-auto ">
          {/* Left Side */}
          {/* Login- Info Text & Image */}
          <div className="login-info hidden md:flex flex-col gap-6 h-full py-8 px-6 bg-white border-r border-slate-500 rounded-lg shadow-2xl">
            <h1 className="text-2xl font-bold text-gray-700">Change Password</h1>
            <h1 className="text-lg font-normal text-gray-600">
              Enter your new password
            </h1>
            <img src={WelcomeImg} alt="" className="w-3/4 m-auto scale-110" />
          </div>
  
          {/* Right Side */}
          {/* Login Center */}
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white   md:border-l border-slate-500 rounded-lg shadow-2xl  sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
              Change Password
            </div>
  
            {/*Form for login  */}
            <form  autoComplete="off" className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit} >
              {/* Form Input - Email & Password */}
              <FormInput
                icon={<RiLockUnlockFill size="1rem" />}
                text="New Password"
                type="password"
                onChangeHandler={(e) => setPassword(e.target.value)}
              />

              {/* Login Button */}
             <Button  text="Send" color= "00FAFF" btnType="submit" />
             {isLoading && <Loader h="1rem" w="1/4"  />}
              <div className="flex items-center justify-center mt-6">
                <Link
                  to={"/login"}
                  className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 "
                >
                  <span className="ml-2 text-base">Cancel forgot password</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
  
  export default ChangePassword;