import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState, ChangeEvent, Suspense } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';

import * as auth from '../../services/authService';

import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Verify from './verifyOTP';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
const LoginBoxed = () => {
    const [errors, setErrors] = useState<any>({});
    const [Email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [openOTP, setopenOTP] = useState(false);

    const handleOpenOTP = () => setopenOTP(true);

    const handleCloseOTP = () => setopenOTP(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setpassword(e.target.value);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
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

    const submitForm = async () => {
       
        try {   
            
            
            
            if (Email === '' && password === '') {
                toast.info(`Those Field are Required, Please fill it!! ${Email} `);
                
            } else if (Email === '') {
                toast.info('Email is Required, Please fill it!!');
                
            } else if (password === '') {
                toast.info('password is Required, Please fill it!!');
                
            } else {
                {/**
                    --------------------OTP Verification has ben stoped due to  If the email account "noreply@rmf.gov.rw" has Two-Factor Authentication (2FA) enabled.

                    navigate('/auth/verifyotp',{state: { Email, password }});
                     */}
                
                const login=await auth.login(Email,password);
                //toast.info(`login${JSON.stringify(login)}`)
                if (login)
                {
                    navigate('/home'); 
                    toast.success(
                                    `Dear: ${Email} you are authentication is correct`
                                  );  
                }else {
                             toast.error(
                               `Your authentication has been failled`
                             );
                

                        }

                       window.location.reload();

                //navigate('/analytics'); 
                //console.log(`login information Email:${Email},password:${password}`)
                
            }
        } catch (ex) {
            const axiosError = ex as AxiosError;
            if (axiosError.response && (axiosError.response.status === 400 || axiosError.response.status === 409)) {
                const newErrors = { ...errors };
                newErrors.username = axiosError.response.data as string;
                toast.error('Error: ' + newErrors.username);
                setErrors(newErrors);
            }
        }
    };

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
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            
                                <div>
                                    <label htmlFor="Email">Emails</label>
                                    <div className="relative text-white-dark">
                                        <input id="Email" type="email" placeholder="Enter Email" onChange={handleEmailChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input id="Password" type="password" placeholder="Enter Password" onChange={handlePasswordChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                
                                <button onClick={submitForm}  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                            
                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light"></span>
                            </div>
                            
                            <div className="text-center dark:text-white">
                            Do you forget your Password ?  Please Reset it Here &nbsp;
                                <Link to="/auth/boxed-password-reset" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    Reset
                                </Link>
                            </div>

                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            {/** 
                            <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/boxed-signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                            */}
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
