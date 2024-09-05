import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    ClockIcon,
    Cog6ToothIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, usePage } from '@inertiajs/react';
import Button from '@/app/_components/button';
import { useDispatch } from 'react-redux';
import { setTime } from '@/app/_redux/app-slice';
import moment from 'moment';


const userNavigation = [
    { name: 'Your profile', href: '/administrator/profile' },
    { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('bg-blue-500'); // State for message color
    const [fadeOut, setFadeOut] = useState(false);
    const dispatch = useDispatch();
    const { url } = usePage(); // Retrieves the current URL from Inertia.js

    const navigation = [
        { name: 'Dashboard', href: '/administrator/dashboard', icon: HomeIcon },
        { name: 'Users', href: '/administrator/users', icon: UsersIcon },
        { name: 'Time keeping', href: '/administrator/time', icon: FolderIcon },
        { name: 'Logs', href: '/administrator/logs', icon: ClockIcon },
    ];

    useEffect(() => {
        let timer;
        if (message) {
            timer = setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => {
                    setMessage('');
                    setColor('bg-blue-500'); // Reset to default color
                    setFadeOut(false);
                }, 500); // Duration of the fade-out animation
            }, 700); // Duration before fading out
        }
        return () => clearTimeout(timer);
    }, [message]);

    function time_handler(value) {
        const colorMap = {
            'Clock In': 'bg-blue-500',
            'Break': 'bg-yellow-500',
            'Back': 'bg-green-500',
            'Clock Out': 'bg-red-500',
        };
        dispatch(setTime({
            status: value,
            timer: moment().format('LLLL')
        }));
        setMessage(`You ${value}`);
        setColor(colorMap[value]); // Set the color based on button click
    }


    // const logAction = (actionName) => {
    //     const timestamp = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    //     const actionDetails = {
    //         logName: actionName,
    //         timestamp: timestamp,
    //         status: actionName,
    //         user: 'User',
    //         details: `${actionName} action performed.`,
    //         currentTime: new Date().toLocaleTimeString()
    //     };
    //     // Assuming there's a function or mechanism to store logs
    //     // Example: dispatch(logActionToStore(actionDetails));
    //     console.log(actionDetails); // Replace with actual logging implementation
    // };

    // const handleButtonClick = (action) => {
    //     dispatch(setTime({
    //         status: action,
    //         timer: new Date().toLocaleTimeString() // Use actual time if needed
    //     }));
    //     logAction(action);
    // };

    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
                    <div className="fixed inset-0 flex">
                        <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full">
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img alt="Your Company" src="../images/logo.png" className="max-h-16 w-auto max-w-full" />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className={classNames(
                                                                url === item.href
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                                                            <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>

                                        <li className="mt-auto">
                                            <a
                                                href="/administrator/profile"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                            >
                                                <Cog6ToothIcon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                        <div className="grid place-items-center">
                            <img alt="Empire One Logo" src="../images/logo.png" className="h-20" />
                        </div>

                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        url === item.href
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    )}
                                                >
                                                    <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <li className="mt-auto">
                                    <Link
                                        href="/administrator/profile"
                                        className={classNames(
                                            url === '/administrator/profile'
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                            'group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                        )}
                                    >
                                        <Cog6ToothIcon aria-hidden="true" className="h-6 w-6 shrink-0" />
                                        Settings
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

                        <div className="p-4">
                            <div className="block sm:hidden">
                                {/* Toggle Button for Dropdown */}
                                <Button
                                    onClick={() => setIsDropdown(!isDropdown)}
                                    className="bg-gray-500 text-white w-full px-6 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out shadow"
                                    type="button"
                                >
                                    Select Option
                                </Button>

                                {/* Dropdown for Small Screens */}
                                {isDropdown && (
                                    <select className="mt-4 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md shadow">
                                        <option>Clock In</option>
                                        <option>Break</option>
                                        <option>Back</option>
                                        <option>Clock Out</option>
                                    </select>
                                )}
                            </div>

                            {/* Buttons for Larger Screens */}
                            <div className="hidden sm:inline-flex gap-6 items-center justify-center">
                                <div>
                                    <Button
                                        onClick={() => time_handler('Clock In')}
                                        className="bg-blue-500 text-white px-6 py-2 rounded-md w-36 flex items-center justify-center hover:bg-blue-600 transition duration-300 ease-in-out shadow"
                                        type="button"
                                    >
                                        Clock In
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        onClick={() => time_handler('Break')}
                                        className="bg-yellow-500 text-white px-6 py-2 rounded-md w-36 flex items-center justify-center hover:bg-yellow-600 transition duration-300 ease-in-out shadow"
                                        type="button"
                                    >
                                        Break
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        onClick={() => time_handler('Back')}
                                        className="bg-green-500 text-white px-6 py-2 rounded-md w-36 flex items-center justify-center hover:bg-green-600 transition duration-300 ease-in-out shadow"
                                        type="button"
                                    >
                                        Back
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        onClick={() => time_handler('Clock Out')}
                                        className="bg-red-500 text-white px-6 py-2 rounded-md w-36 flex items-center justify-center hover:bg-red-600 transition duration-300 ease-in-out shadow"
                                        type="button"
                                    >
                                        Clock Out
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-1 gap-x-4">
                            <form action="#" method="GET" className="flex flex-1"></form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                {/* Separator */}
                                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                                                John Doe
                                            </span>
                                            <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                                        </span>
                                    </MenuButton>
                                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                                                >
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            {message && (
                                <div
                                    className={`mb-4 p-4 text-white ${color} rounded-md transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                                >
                                    {message}
                                </div>
                            )}
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
