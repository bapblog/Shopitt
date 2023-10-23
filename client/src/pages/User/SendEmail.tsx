/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC,useEffect } from "react";
import {  useLocation} from "react-router-dom";
import WelcomeImg from "../../assets/images/sitting.png";
import {  useSendVerifyMailMutation } from "../../redux/api/authApi";
import Loader from "../Layouts/Loader";
import { useSnackbar } from "notistack";


const SendMail:FC = () => {

  const {enqueueSnackbar} = useSnackbar();
  const {state} = useLocation();
  const [sendVerifyMail, {data,error,isLoading}] = useSendVerifyMailMutation();
  if(data){
    console.log(data)
  }
  useEffect(() => {
    sendVerifyMail({email: state.email })
  },[sendVerifyMail, state.email])


  useEffect(() => {
    // Handling Error
    if(error) {
      const errorMsg = (error as any)?.data?.errors || (error as any)?.data?.msg;
      enqueueSnackbar(errorMsg, {
        variant: 'error',
      });
    }
  },[enqueueSnackbar, error,])

  
    return (
      <>{isLoading ? <Loader /> : (
        <div className="login-wrapper md:h-2/4 md:w-3/4 md:mx-auto flex flex-col  flex-nowrap justify-start items-center">
          {/* Left Side */}
          {/* Login- Info Text & Image */}
          <div className="login-info  md:flex flex-col gap-6 h-full py-8 px-6 bg-white border-r border-slate-500 rounded-lg shadow-2xl">
            <h1 className="text-2xl font-bold text-gray-700">Verification Mail Sended</h1>
            <h1 className="text-lg font-normal text-gray-600">
              Go to your mail inbox and click on link to verify email address.
            </h1>
            <img src={WelcomeImg} alt="" className="w-2/4 h-2/4 m-auto" />
          </div>
        </div>
      ) } 
      </>
        
    );
  };
  
  export default SendMail;