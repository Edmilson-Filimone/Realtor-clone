import React from "react";
import { Link } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillPencilFill} from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { DateTime } from "luxon";

function Card({ id, data, onEdit, onDelete }) {
  return (
    <div className="relative h-[370px] w-full mt-4 mb-4 rounded-md overflow-x-hidden overflow-y-hidden bg-white shadow-md shadow-slate-300">
      <Link to={`category/${data.type}/${id}`}>
        <img
          className="w-full min-h-[200px] max-h-[200px] object-cover transform hover:scale-110 transition ease-in duration-150"
          src={data.imgUrls[0]}
          alt="Image of the house"
          title="Go to page"
        />
      </Link>
      <div className="p-5">
        <div className="flex justify-start items-center space-x-2 mb-1.5" title="Location">
          <span className="text-green-600">
            <HiLocationMarker />
          </span>
          <span className="text-base text-sky-900 truncate">
            {data.address}
          </span>
        </div>
        <div className="text-xl text-[#0a2632] font-normal truncate mb-1.5">
          {data.name}
        </div>
        <div className="text-lg text-sky-800  mb-1.5 truncate" title="Price">{`${
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
            <span title="Number of beds">{`${data.beds} ${data.beds > 1 ? "Beds" : "Bed"}`}</span>
            <span title="Number of baths">{`${data.baths} ${data.baths > 1 ? "Baths" : "Bath"}`}</span>
          </div>
          {onEdit && onDelete && (
            <div className="flex justify-start space-x-4 text-slate-900 font-semibold text-sm mb-1">
              <span className="text-black text-[18px] cursor-pointer" title="Edit" onClick={()=> onEdit(id)}>
                <BsFillPencilFill />
              </span>
              <span className="text-red-500 text-[18px] cursor-pointer" title="Delete" onClick={()=>onDelete(id)}>
                <FaTrash />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-4 w-28 p-1 shadow-sm rounded-r-md text-white uppercase font-medium text-center bg-blue-500">
        {" "}
        {DateTime.now()
          .minus(data.timeStamp.toDate())
          .toRelativeCalendar({ locale: "en" })}
      </div>
    </div>
  );
}

export default Card;
