import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import React, { useMemo ,useRef} from 'react';
import { useEffect, useState, ChangeEvent } from 'react';
import OtpInputs from 'react-otp-input';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import { RE_DIGIT } from './constants';

import * as auth from '../../services/authService';

import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
//import * as auth from "../../services/authService";
import * as userService from '../../services/userService';
import './OtpInput.css';
import Target from '../../components/rmfplannings/Program/target';



export default function OtpInput() {
    //--------------------------------------------------------------
    const [errors, setErrors] = useState<any>({});
let currentOTPIndex: number=0;
const location = useLocation();
const { Email, password } = location.state || {};
    //------------------------------------------------------------
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const [otp, setOtp] = useState<number[]>(new Array(7).fill(''));
    const [otpA, setOtpA] = useState('');
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>):void => {
        const { value } = target;
        const newOTP: number[] = [...otp];
        newOTP[currentOTPIndex] = parseInt(value.substring(value.length - 1));

        if (!value) 
            setActiveOTPIndex(currentOTPIndex - 1);
        else setActiveOTPIndex(currentOTPIndex + 1);

        setOtp(newOTP);
        setOtpA(newOTP.join("").toString());
        // Vérifier si tous les champs sont remplis
        if (newOTP.every((char) => char)) {
           // handleSubmit(newOTP); // Soumettre le formulaire
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        if (pastedText.length === 7) {
            const newOTP: number[] = [...otp];
            for (let i = 0; i < newOTP.length && i < pastedText.length; i++) {
                newOTP[i] = parseInt(pastedText[i]);
            }
            if (newOTP.every((char) => char)) {
                setOtp(newOTP);
                setActiveOTPIndex(newOTP.length - 1);
                setOtpA(newOTP.join("").toString());
                //handleSubmit(newOTP);
            }
        }
    };
    const handleOnKeyDown=({key}:React.KeyboardEvent<HTMLInputElement>, index:number)=>{
        currentOTPIndex=index
    if(key==='Backspace')  setActiveOTPIndex(currentOTPIndex-1) ;  
    }
    useEffect(()=>{
        inputRef.current?.focus();
     },[activeOTPIndex]);
 

    const handleSubmit = async() => {
    try {    
        const verify = await auth.verify(Email,otpA);
        const verified=JSON.stringify(verify.data.verified)
        if(verify.data.verified){
           
            await auth.logins(Email,password);
           toast.success(
                `Your OTP has been verified: }`
              );
              navigate('/analytics');    
        }
        else {
             toast.error(
               `Your OTP has been failled`
             );

        }
        
        console.log(`OTP Number is ${otp  } and array ${otpA}, username=${Email} and password ${password}`);
        
    } catch (ex) {
        const axiosError = ex as AxiosError;
        if (axiosError.response && (axiosError.response.status === 400 || axiosError.response.status === 409)) {
            const newErrors = { ...errors };
            newErrors.username = axiosError.response.data as string;
            toast.error('Error: ' + newErrors.username);
            setErrors(newErrors);
        }
    }
}
    

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Verify Account</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter OTP Code here</p>
                            </div>
                            <div className="otp-group">
                            {otp.map((_, index) => {
                                return (
                                <React.Fragment key={index}>
                                  <input
                                    ref={activeOTPIndex === index ? inputRef : null}
                                    type="number"
                                    className={
                                        'w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition Spin-button-none'
                                    }
                                    onChange={handleOnChange}
                                    onKeyDown={(e) => handleOnKeyDown(e, index)}
                                    value={otp[index]}
                                    onPaste={handlePaste} // paste event
                                />
                                {index===otp.length-1? null:(
                                    <span className='w-2 py-0.5 bg-gray-400'/>
                                )}
                                </React.Fragment>
                                );
                           
                                 })}
                            </div>

                            <div className="mb-10 md:mb-[60px]">
                                <button onClick={handleSubmit} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Send OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
