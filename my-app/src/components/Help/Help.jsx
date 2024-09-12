import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Sidebar from "../sidebar/Sidebar";
function Help() {
  const [sidebarToggle, setSidebarToggle] = React.useState(true);
  const toggleClick = () => {
    setSidebarToggle(!sidebarToggle);
  };
  return (
    <>
      <div className="coutmers flex font-[Poppins]">
        {sidebarToggle ? <div className="w-[320px] nirav"></div> : null}
        <Sidebar toggleClick={toggleClick} sidebarToggle={sidebarToggle} />
        <div className="w-[100%] ">
          <div className="w-[90%] mx-auto mt-16  xl:grid md:grid-cols-12 ">
            <div className=" md:col-span-3">
              {" "}
              <div>
                <h1 className="text-2xl md:text-4xl font-bold">Contact Us</h1>
                <p>We’d love to hear from you!</p>
              </div>
            </div>
            <div className=" md:col-span-9">
              <div className="grid md:grid-cols-3 gap-5 ">
                <div className="">
                  <div className="h-48 px-6 py-6 rounded-xl bg-white text-black shadow-md">
                    <FaPhoneVolume className="text-3xl sm:text-4xl" />
                    <div className="mt-3">
                      <p className="font-semibold text-lg sm:text-xl">
                        Mobile Number
                      </p>
                      <p className="font-normal text-base sm:text-lg">
                        +91 9913292933
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="h-48 px-6 py-6 rounded-xl bg-white text-black shadow-md">
                    <MdEmail className="text-3xl sm:text-4xl" />
                    <div className="mt-3">
                      <p className="font-semibold text-lg sm:text-xl">Email</p>
                      <p className="font-normal text-base sm:text-lg">
                        info@smjevents.in
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="h-48 px-6 py-6 rounded-xl bg-white text-black shadow-md">
                    <FaLocationDot className="text-3xl sm:text-4xl" />
                    <div className="mt-3">
                      <p className="font-semibold text-lg sm:text-xl">
                        Location
                      </p>
                      <p className="font-normal text-base sm:text-lg">
                        Anmol farm & party plot, Ahmedabad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117424.3824806983!2d72.4623154918155!3d23.11495517138586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9de66bf15aa1%3A0x344a80e6b94bd2fe!2sANMOL%20FARM%20%26%20PARTY%20PLOT!5e0!3m2!1sen!2sin!4v1725257710551!5m2!1sen!2sin"
                  title="Google Map of ANMOL FARM & PARTY PLOT"
                  className="rounded-xl w-full h-64 md:h-96 border border-white"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
