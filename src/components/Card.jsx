import React from "react";
import { Link } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { DateTime } from "luxon";


function Card({ id, data }) {
  return (
    <Link  to={`category/${data.type}/${data.id}`}>
    <div className="relative h-[370px] w-full mt-4 mb-4 rounded-md overflow-x-hidden overflow-y-hidden bg-white shadow-md shadow-slate-300">
      <img className="w-full object-cover transform hover:scale-110 transition ease-in duration-150" src={data.imgUrls[0]} alt="3" />
      <div className="p-5">
        <div className="flex justify-start items-center space-x-2 mb-1.5">
          <span className="text-green-600">
            <HiLocationMarker />
          </span>
          <span className="text-base text-sky-900 truncate">{data.address}</span>
        </div>
        <div className="text-xl text-[#0a2632] font-normal truncate mb-1.5">
          {data.name}
        </div>
        <div className="text-lg text-sky-800  mb-1.5 truncate">{`${
          data.offers
            ? data.discount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : data.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
        } ${data.type == "rent" ? "/ Month" : ""}`}</div>
        <div className="flex justify-between">
          <div className="flex justify-start space-x-4 text-slate-900 font-semibold text-sm mb-1.5">
            <span>{`${data.beds} ${data.beds > 1 ? "Beds" : "Bed"}`}</span>
            <span>{`${data.baths} ${data.baths > 1 ? "Baths" : "Bath"}`}</span>
          </div>
          <div className="flex justify-start space-x-4 text-slate-900 font-semibold text-sm mb-1">
            <span className="text-black text-[18px]">
              <BsFillPencilFill />
            </span>
            <span className="text-red-500 text-[18px]">
              <FaTrash />
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-2 w-28 p-1 shadow-sm rounded-r-md text-white uppercase font-medium text-center bg-blue-600" > {DateTime.now().minus(data.timeStamp.toDate()).toRelativeCalendar({locale:"en"})}</div>
    </div>
  </Link>
  );
}

export default Card;
