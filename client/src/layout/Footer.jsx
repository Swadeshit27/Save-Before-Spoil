import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import logo from "../assets/img/logo.png";

export default function FooterComp() {
  return (
    <footer className="border-t p-6 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com" className="flex items-center">
              <img src={logo} alt="Flowbite Logo" className="h-20 " />
              <span className="self-center text-xl font-semibold whitespace-nowrap translate-y-[-0.5rem]">
                Save Before Spoil
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                About
              </h2>
              <ul className="text-gray-600">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Flowbite
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-600">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Github
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-600">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2022{" "}
            <a href="#" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <BsFacebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <BsInstagram size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <BsTwitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <BsGithub size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <BsDribbble size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
