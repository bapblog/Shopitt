import React, { FC, ReactElement } from "react";
import { RiRefund2Line, RiSecurePaymentFill, RiSurgicalMaskLine } from 'react-icons/ri'
import {TbTruckDelivery} from 'react-icons/tb'
type Props = {};

type featureCardProps = {
  icon: ReactElement;
  text: string;
  flex?: string ;
  py?: string;
};
const FeatureCard: FC<featureCardProps> = ({ icon, text,flex='row',py='10' }) => {
  return (
    <div
      className={`flex flex-${flex} flex-nowrap justify-center items-center gap-6 px-6 py-${py} bg-slate-50 rounded-lg shadow-md shadow-yellow-200`}
    >
      {icon}
      <h1 className="text-base text-black font-medium">{text}</h1>
    </div>
  );
};

const HeroFeatures = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 bg-white w-full md:p-8 mx-auto p-2 shadow-sm shadow-yellow-200">
        <FeatureCard text={'Supper Free Delivery'} flex={'col'}   icon={<TbTruckDelivery size={'2rem'} color={'#44318D'}/>} />
        <div className="flex flex-col gap-4 md:gap-4">
            <FeatureCard text={'Non-contact Shipping'}  py={'8'} icon={<RiSurgicalMaskLine size={'2rem'} color={'#44318D'}/>} />
            <FeatureCard text={'Money-back Guarantee'}   py={'8'} icon={<RiRefund2Line size={'2rem'} color={'#44318D'}/>} />
        </div>
        <FeatureCard text={'Secure Payment System'} flex={'col'}  icon={<RiSecurePaymentFill size={'2rem'} color={'#44318D'}/>} />
    </div>
  );
};

export default HeroFeatures;
