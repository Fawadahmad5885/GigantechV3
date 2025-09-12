import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainButton from "./MainButton";

function MenuDropDown({ data }) {
  return (
    <div className="flex flex-row w-full overflow-x-hidden shadow-xl  ">
      <div className="w-1/5 bg-[#184a7d]">
        <div className="p-7">
          <h4 className="text-white text-[24px] font-normal mb-5">{data.title}</h4>
          <div>
            <p className="text-white text-sm mt-2 tracking-wide">
              {data.description}
            </p>
          </div>
          <div className="mt-10">
            <MainButton text = {"Learn More"}  />
          </div>
        </div>
      </div>
      <div className="w-4/5 bg-[#f6f8fa]">
        <div className="p-8">
          <ul className="gap-6  w-fit">
            {data.listItems.map((service, index) => (
              <li key={index} className=" mr-6  p-2 ">
                <div className="flex items-center">
                  {service.icon && (
                    <Image
                      width={100}
                      height={100}
                      src={service.icon}
                      alt={service.title}
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  <Link
                    href={service.link}
                    className="text-gray-700 text-[16px] hover:text-blue-500"
                  >
                    <span className="hover:text-blue-900 ml-3">{service.title}</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuDropDown;
