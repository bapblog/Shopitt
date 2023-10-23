/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WelcomeImg from "../../assets/images/sitting.png";
import {
  useVerifyUserMailMutation,
} from "../../redux/api/authApi";
import { setErrors } from "../../redux/Slice/userSlice";
import Loader from "../Layouts/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSnackbar } from "notistack";

const VerifyEmail: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [verifyMail, {  error, isLoading, isError,isSuccess }] =
    useVerifyUserMailMutation();

  useEffect(() => {
    if (token) {
      verifyMail({ token });
    }
  }, [token, verifyMail]);

  const redirect = location.search ? location.search.split("=")[1] : "account";

  useEffect(() => {
    // Handling Error
    if(error) {
      const errorMsg = (error as any)?.data?.errors || (error as any)?.data?.msg;
      enqueueSnackbar(errorMsg, {
        variant: 'error',
      });
    }
    // After verifying email
    if(isSuccess){
      setTimeout(() => navigate(`/${redirect}`),1500)
      setTimeout(() => enqueueSnackbar(" Email Verified! Login Now", {variant: 'success'}),2000)
      
    }
  }, [enqueueSnackbar, error, isSuccess, navigate, redirect]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login-wrapper md:h-2/4 md:w-3/4 md:mx-auto flex flex-col  flex-nowrap justify-start items-center">
          {/* Left Side */}
          {/* Login- Info Text & Image */}
          <div className="login-info  md:flex flex-col gap-6 h-full py-8 px-6 bg-white border-r border-slate-500 rounded-lg shadow-2xl">
            {isSuccess &&
            <>
            <h1 className="text-2xl font-bold text-gray-700">User Email Verified</h1>
            <h1 className="text-lg font-normal text-gray-600">
              Now get access to your Orders, Wishlist and Recommendations.
            </h1>
            <img src={WelcomeImg} alt="" className="w-2/4 h-2/4 m-auto" />
            </>
            
            }
            {isError && <h1 className="text-2xl font-bold text-gray-700">Email Verification Failed! Try Again Later</h1>}
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
