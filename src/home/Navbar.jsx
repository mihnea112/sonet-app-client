import {useEffect, useState} from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import {CgLogIn} from "react-icons/cg";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {getProxyy} from "../App";
import axios from "axios";
import  {FaUserCircle} from "react-icons/fa"
const navigation = [
	{name: "Home", href: "/", current: false},
	{name: "Sonetele mele", href: "/dash", current: window.location.href.includes("/dash")},
	{name: "Sonetele pentru mine", href: "/for-me", current: window.location.href.includes("/for-me")},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [logged, setLogged] = useState(false);
	function logout() {
		setLogged(false);
		localStorage.removeItem("token");
		window.location.replace("/");
	}
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			axios.get(getProxyy() + "/user?token=" + token).then((res) => {
				setLogged(true);
			});
		} else setLogged(false);
	}, []);
	return (
		<Disclosure as="nav" className="bg-zinc-700">
			{({open}) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-emerald-300 hover:bg-zinc-900 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</DisclosureButton>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<img className="h-8 w-auto" src="/logo.jpeg" alt="Logo Sonet App" />
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-emerald-800 text-emerald-300"
														: "text-emerald-300 hover:bg-zinc-700 hover:text-emerald-700",
													"rounded-md px-3 py-2 text-sm font-medium"
												)}
												aria-current={item.current ? "page" : undefined}>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<Menu as="div" className="relative ml-3">
									<div>
										<MenuButton className="">
											{logged != true ? (
												<>
													<a
														className="btn text-emerald-300 bg-emerald-800 hover:bg-emerald-600 w-full mb-4 sm:w-auto sm:mb-0 p-3 rounded "
														href="#0">
														Login/Register
														<CgLogIn className="inline text-emerald-300" />
													</a>
												</>
											) : (
												<>
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													<FaUserCircle color={"white"} size={25}/>
												</>
											)}
										</MenuButton>
									</div>
									<Transition
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95">
										<MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{logged != true ? (
												<>
													<MenuItem>
														{({focus}) => (
															<a
																href="/login"
																className={classNames(
																	focus ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Login
															</a>
														)}
													</MenuItem>
													<MenuItem>
														{({focus}) => (
															<a
																href="/register"
																className={classNames(
																	focus ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Register
															</a>
														)}
													</MenuItem>
												</>
											) : (
												<>
													{/* <MenuItem>
														{({focus}) => (
															<a
																href="/"
																className={classNames(
																	focus ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Your Profile
															</a>
														)}
													</MenuItem>
													<MenuItem>
														{({focus}) => (
															<a
																href="/settings"
																className={classNames(
																	focus ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Settings
															</a>
														)}
													</MenuItem> */}
													<MenuItem>
														{({focus}) => (
															<span
																onClick={logout}
																className={classNames(
																	focus ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}>
																Sign out
															</span>
														)}
													</MenuItem>
												</>
											)}
										</MenuItems>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<DisclosurePanel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}>
									{item.name}
								</DisclosureButton>
							))}
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
