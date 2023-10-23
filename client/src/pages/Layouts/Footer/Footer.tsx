import React, { FC, ReactElement } from "react";
import { footerLinksData } from "../../../assets/data/data";
import imgPaymentMethods from '../../../assets/images/payment-methods.svg'
import {MdWork} from 'react-icons/md'
import {FiHelpCircle} from 'react-icons/fi'
import { footerLinksProps } from "../../../types/types";
type Props = {};

const Footer: FC = (props: Props) => {
  return (
    <>
      {/* // footer Section Start */}
      <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12  bg-[#282C31] text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden">
        <div className="w-full sm:w-7/12 flex flex-col sm:flex-row">
          {footerLinksData.map(
            (el:footerLinksProps, i:number): ReactElement => (
              <div
                className="w-full sm:w-1/5 flex flex-col gap-2 my-3 sm:my-6 ml-5"
                key={i}
              >
                <h2 className="text-white font-bold text-base mb-2 uppercase">{el.title}</h2>
                {el.links.map((item, i) => (
                  <a
                    href={item.redirect}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                    key={i}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )
          )}
        </div>

        <div className="border-gray-600 h-36 w-1 border-l mr-5 mt-6 hidden sm:block"></div>
        <div className="w-full sm:w-5/12 my-6 mx-5 sm:mx-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
          <div className="w-full sm:w-1/2">
            <h2 className="text-white font-bold text-base">My Address:</h2>
            <p className="mt-2 leading-5">
              Harshal Gajanan Ingole,
              <br />
              At.Chikana, Post.Sawangi(Perka)
              <br />
              Tq.Ralegaon, Dist.Yavatmal,
              <br />
              Ralegaon, 445402,
              <br />
              Maharashtra, India
            </p>
          </div>

          <div className="w-full sm:w-1/2">
            <h2 className="text-white font-bold text-base">Contact Me:</h2>
            <p className="mt-2 leading-5">
              harshal.ingole21@gamil.com
              <br />
              <br />
              Mobile:{" "}
              <a className="text" href="tel:7507721344">
                7507721344
              </a>
            </p>
          </div>
        </div>
      </footer>
      {/* Footer Section Ends */}
      <div className="px-16 py-6 w-full bg-[#282C31] hidden sm:flex justify-between items-center text-sm text-white">
            <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <span className="text-[#00FAFF]"><MdWork size={'1rem'}/></span> Sell on Shopz1
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <span className="text-[#00FAFF]"><FiHelpCircle size={'1rem'} /></span> Help Center
            </a>
            <span>&copy; {new Date().getFullYear()} Shopz1.com by Harshal Inogle</span>
            <img draggable="false" src={imgPaymentMethods} alt="Card Payment" />
        </div>
    </>
  );
};

export default Footer;
