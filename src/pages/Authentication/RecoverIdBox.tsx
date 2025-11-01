import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLock from '../../components/Icon/IconLock';
import { toast } from 'react-toastify';
import * as userService from '../../services/userService';

const RecoverIdBox = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Reset Password'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [flag, setFlag] = useState(themeConfig.locale);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const checkPasswordStrength = (pwd: string) => {
        setPasswordStrength({
            length: pwd.length >= 8,
            uppercase: /[A-Z]/.test(pwd),
            lowercase: /[a-z]/.test(pwd),
            number: /\d/.test(pwd),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            email: '',
            password: '',
            confirmPassword: '',
        };

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            valid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Don't proceed if validation fails
        }

        try {
            // Call your userService to reset the password
            await userService.resetpassword(email, password);

            // Show success message
            toast.success('Password has been reset successfully!');

            // Redirect to login page or home page
            navigate('/auth/boxed-signin');
        } catch (ex: any) {
            // Using 'any' temporarily, better to define proper error type
            let errorMessage = 'An error occurred while resetting your password';

            if (ex.response) {
                // Handle API response errors
                if (ex.response.status === 400 || ex.response.status === 409) {
                    errorMessage = ex.response.data || errorMessage;

                    // Update specific error state if needed
                    setErrors((prev) => ({
                        ...prev,
                        password: ex.response.data.includes('password') ? ex.response.data : prev.password,
                        email: ex.response.data.includes('email') ? ex.response.data : prev.email,
                    }));
                }
            } else if (ex.message) {
                errorMessage = ex.message;
            }

            toast.error(errorMessage);
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="background gradient" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="decoration 1" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="decoration 2" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="decoration 3" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="polygon decoration" className="absolute bottom-0 end-[28%]" />

                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-7">
                                <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Reset Password</h1>
                                <p>Enter your email and new password</p>
                            </div>

                            <form className="space-y-5" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Email" className="dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="email"
                                            placeholder="Enter Email"
                                            className={`form-input ps-10 placeholder:text-white-dark ${errors.email ? 'border-red-500' : ''}`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                    {errors.email && <p className="mt-1 text-red-500">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="Password" className="dark:text-white">
                                        New Password
                                    </label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            type="password"
                                            placeholder="Enter New Password"
                                            className={`form-input ps-10 placeholder:text-white-dark ${errors.password ? 'border-red-500' : ''}`}
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLock fill={true} />
                                        </span>
                                    </div>
                                    {errors.password && <p className="mt-1 text-red-500">{errors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="ConfirmPassword" className="dark:text-white">
                                        Confirm Password
                                    </label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="ConfirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            className={`form-input ps-10 placeholder:text-white-dark ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLock fill={true} />
                                        </span>
                                    </div>
                                    {errors.confirmPassword && <p className="mt-1 text-red-500">{errors.confirmPassword}</p>}
                                </div>
                                <div className="mt-2">
                                    <p className="text-xs">Password must contain:</p>
                                    <ul className="text-xs space-y-1 mt-1">
                                        <li className={`flex items-center ${passwordStrength.length ? 'text-green-500' : 'text-gray-500'}`}>
                                            {passwordStrength.length ? '✓' : '•'} At least 8 characters
                                        </li>
                                        <li className={`flex items-center ${passwordStrength.uppercase ? 'text-green-500' : 'text-gray-500'}`}>
                                            {passwordStrength.uppercase ? '✓' : '•'} One uppercase letter
                                        </li>
                                        <li className={`flex items-center ${passwordStrength.lowercase ? 'text-green-500' : 'text-gray-500'}`}>
                                            {passwordStrength.lowercase ? '✓' : '•'} One lowercase letter
                                        </li>
                                        <li className={`flex items-center ${passwordStrength.number ? 'text-green-500' : 'text-gray-500'}`}>{passwordStrength.number ? '✓' : '•'} One number</li>
                                        <li className={`flex items-center ${passwordStrength.specialChar ? 'text-green-500' : 'text-gray-500'}`}>
                                            {passwordStrength.specialChar ? '✓' : '•'} One special character
                                        </li>
                                    </ul>
                                </div>

                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Reset Password
                                </button>
                            </form>

                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light"></span>
                            </div>

                            <div className="text-center dark:text-white">
                                 
                                <Link to="/" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverIdBox;
