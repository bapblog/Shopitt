/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, FormEvent, useEffect } from "react";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";
import WelcomeImg from "../../assets/images/sitting.png";
import Button from "../../components/Button/Button";
import { useSendForgotPassMailMutation } from "../../redux/api/authApi";
import { FormInput } from "./SignUp";
import { useSnackbar } from "notistack";
import Loader from "../Layouts/Loader";

const ForgotPassword: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [sendForgotPassMail, { error,data,isSuccess, isLoading }] =
    useSendForgotPassMailMutation();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email === "") {
      enqueueSnackbar("Email is Required", { variant: "error" });
      return;
    }
    sendForgotPassMail({ email });
  };

  useEffect(() => {
    // Handling Error
    if (error) {
      const errorMsg =
        (error as any)?.data?.errors || (error as any)?.data?.msg;
      enqueueSnackbar(errorMsg, {
        variant: "error",
      });
    }
    // Success
    if (isSuccess) {
      enqueueSnackbar(" Password Recovery Mail Send Successfully", {
        variant: "success",
      });
      if(data){
        console.log(data)
      }
    }
  }, [data, enqueueSnackbar, error, isSuccess]);

  return (
    <>
      {/* After Recovery Email Send Successfully */}
      {!(isSuccess) ? (
        <div className="login-wrapper md:scale-95 flex flex-col md:flex-row flex-nowrap justify-start items-center   md:w-3/5 mx-2 md:mx-auto ">
          {/* Left Side */}
          {/* Login- Info Text & Image */}
          <div className="login-info hidden md:flex flex-col gap-6 h-full py-8 px-6 bg-white border-r border-slate-500 rounded-lg shadow-2xl">
            <h1 className="text-2xl font-bold text-gray-700">
              Forgot Password
            </h1>
            <h1 className="text-lg font-normal text-gray-600">
              Enter your email address and receive verification mail for
              password change.
            </h1>
            <img src={WelcomeImg} alt="" className="w-3/4 m-auto scale-110" />
          </div>

          {/* Right Side */}
          {/* Login Center */}
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white   md:border-l border-slate-500 rounded-lg shadow-2xl  sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
              Forgot Password
            </div>

            {/*Form for login  */}
            <form
              autoComplete="off"
              className="mt-2 flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {/* Form Input - Email & Password */}
              <FormInput
                icon={<GrMail size="1rem" />}
                text="Your Email"
                onChangeHandler={(e) => setEmail(e.target.value)}
              />
              {/* Send Mail Button */}
              <Button text="Send Mail" color="00FAFF" btnType="submit" />
              {isLoading && <Loader h="1rem" w="1/4" />}
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
      ) : (
        <div className="login-wrapper md:h-2/4 md:w-3/4 md:mx-auto flex flex-col  flex-nowrap justify-start items-center">
          {/* Left Side */}
          {/* Login- Info Text & Image */}
          <div className="login-info  md:flex flex-col gap-6 h-full py-8 px-6 bg-white border-r border-slate-500 rounded-lg shadow-2xl">
            <h1 className="text-2xl font-bold text-gray-700">
              Password Recovery Mail Send Successfully
            </h1>
            <h1 className="text-lg font-normal text-gray-600">
              Go to your mail inbox and click on link to change password.
            </h1>
            <img src={WelcomeImg} alt="" className="w-2/4 h-2/4 m-auto" />
          </div>
        </div>
      )} 
    </>
  );
};

export default ForgotPassword;
