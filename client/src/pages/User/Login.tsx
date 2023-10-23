/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC,useState,FormEvent,useEffect } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { GrMail } from "react-icons/gr";
import { RiLockUnlockFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WelcomeImg from "../../assets/images/sitting.png";
import Button from "../../components/Button/Button";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { FormInput, IconBtn } from "./SignUp";
import { useSnackbar } from "notistack";
import {setErrors, setUser } from "../../redux/Slice/userSlice";
import Loader from "../Layouts/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
interface errorsType {
  // data: {errors: {value: string,msg: string,param: string,location: string}[]}
  data?: unknown,
  status: number | string
}

const Login:FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const location = useLocation();
  const [loginUser, {data,error,isSuccess,isError,isLoading}] = useLoginUserMutation();
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 
    const values: {email: string,password: string} = {
      email: email,
      password: password
    }
    if(values.email === "" && values.password === ""){
      enqueueSnackbar("Please Enter Email & Password",{variant: 'error'})
      return;
    }
    loginUser({...values});
  }

  const redirect = location.search ? location.search.split("=")[1] : "account";
  


  useEffect(() => {
    // if user not verified
    if(isError) {
      if((error as any).data.msg === "Please Verify Your Email"){
        navigate('/send-verify-mail',{
          state: {email},
        })
      }
    }
    // Handling Error
    if(error) {
      const errorMsg = (error as any)?.data?.errors || (error as any)?.data?.msg;
      enqueueSnackbar(errorMsg, {
        variant: errorMsg === "Please Verify Your Email" ? "success" : 'error',
      });
    }
    // After successfully authentication redirect | msg | setUser data 
    
    if(isSuccess) {
      dispatch(setUser(data?.user))
      navigate(`/${redirect}`)
      enqueueSnackbar("Login Successfully",{variant: "success"})
    }
  },[data?.user, dispatch, email, enqueueSnackbar, error, isError, isSuccess, navigate, redirect])


  
    return (
      <> 
        <div className="login-wrapper md:scale-95 flex flex-col md:flex-row flex-nowrap justify-start items-center   md:w-3/5 mx-2 md:mx-auto ">
          {/* Left Side */}
          {/* Login- Info Text & Image */}
          <div className="login-info hidden md:flex flex-col gap-6 h-full py-8 px-6 bg-white border-r border-slate-500 rounded-lg shadow-2xl">
            <h1 className="text-2xl font-bold text-gray-700">Login</h1>
            <h1 className="text-lg font-normal text-gray-600">
              Get access to your Orders, Wishlist and Recommendations
            </h1>
            <img src={WelcomeImg} alt="" className="w-3/4 m-auto scale-110" />
          </div>
  
          {/* Right Side */}
          {/* Login Center */}
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white   md:border-l border-slate-500 rounded-lg shadow-2xl  sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-medium text-gray-600 sm:text-2xl ">
              Login to your account
            </div>
            {/* Login Option - FB & Google */}
            {/* <div className="flex gap-4 item-center">
              <IconBtn
                icon={<BsFacebook size="1.1rem" color="white" />}
                text="Facebook"
              />
              <IconBtn
                icon={<FcGoogle size="1.1rem" color="white" />}
                text="Google"
              />
            </div> */}
  
            {/*Form for login  */}
            <form  autoComplete="off" className="mt-8" onSubmit={handleSubmit} >
              {/* Form Input - Email & Password */}
              <FormInput icon={<GrMail size="1rem" />} text="Your Email" onChangeHandler={(e) => setEmail(e.target.value)}/>
              <FormInput
                icon={<RiLockUnlockFill size="1rem" />}
                text="Your Password"
                type="password"
                onChangeHandler={(e) => setPassword(e.target.value)}
              />
              {/* Forgot Password */}
              <div className="flex items-center mb-6 ">
                <div className="flex ml-auto ">
                  <Link
                    to={'/forgot-password'}
                    className="inline-flex text-xs font-thin text-gray-500 sm:text-sm hover:text-gray-700 "
                  >
                    Forgot Your Password?
                  </Link>
                </div>
              </div>
              {/* Login Button */}
             <Button  text="Login" color= "00FAFF" btnType="submit" />
             {isLoading && <Loader h="1rem" w="1/4"  />}
              <div className="flex items-center justify-center mt-6">
                <Link
                  to={"/signup"}
                  className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 "
                >
                  <span className="ml-2 text-base">Create an account?</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
  
  export default Login;