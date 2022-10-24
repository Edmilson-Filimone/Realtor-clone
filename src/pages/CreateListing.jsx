import { useState } from "react";

const createListing = () => {
  const [inputData, setInputData] = useState({
    type: "rent",
    name: "",
    beds: 2,
    baths: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offers: true,
    price: 0,
    discount: 0,
    image:""
  });

  const {
    type,
    name,
    beds,
    baths,
    parking,
    furnished,
    address,
    description,
    offers,
    price,
    discount,
    image
  } = inputData;

  const onchange = () => {/*implementation*/}

  return (
    <>
      <h1 className="mt-3 mb-3 text-3xl text-center font-bold ">
        Create a Listing
      </h1>
      <form className="w-[400px] mx-auto">
        <label className="font-medium">Sell / Rent</label>
        <div className="flex justify-between gap-5 mb-5">
          <button
            type="button"
            value={type}
            onChange={onchange}
            className={`w-full py-2 px-3 font-medium text-sm uppercase border border-gray-200 shadow-lg rounded ${
              type === "sell" ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            sell
          </button>
          <button
            type="button"
            value={type}
            onChange={onchange}
            className={`w-full py-2 px-3 font-medium text-sm uppercase border border-gray-200 shadow-lg rounded ${
              type === "rent" ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            Rent
          </button>
        </div>
        <label className="font-medium" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          required
          minLength={25}
          maxLength={200}
          onChange={onchange}
          className="shadow-md rounded border border-gray-300 focus:border-slate-300"
        />

        <div className="flex gap-5 my-5">
          <div className="w-1/4">
            <label className="font-medium" htmlFor="beds">
              Beds
            </label>
            <input
              type="number"
              name="beds"
              id="beds"
              value={beds}
              required
              minLength={0}
              maxLength={30}
              onChange={onchange}
              className="shadow-md rounded border border-gray-300 focus:border-slate-300"
            />
          </div>
          <div className="w-1/4">
            <label className="font-medium" htmlFor="baths">
              Baths
            </label>
            <input
              type="number"
              name="baths"
              id="baths"
              value={baths}
              required
              minLength={1}
              maxLength={30}
              onChange={onchange}
              className="shadow-md rounded border border-gray-300 focus:border-slate-300"
            />
          </div>
        </div>

        <label className="font-medium">Parking spot</label>
        <div className="flex justify-between gap-5 mb-5">
          <button
            type="button"
            value={parking}
            onChange={onchange}
            className={`w-full py-2 px-3 text-sm font-medium  border border-gray-200 shadow-lg rounded ${
              parking ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            value={!parking}
            onChange={onchange}
            className={`w-full py-2 px-3 text-sm font-medium uppercase border border-gray-200 shadow-lg rounded ${
              !parking ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            no
          </button>
        </div>

        <label className="font-medium">Furnished</label>
        <div className="flex justify-between gap-5 mb-5">
          <button
            type="button"
            value={furnished}
            onChange={onchange}
            className={`w-full py-2 px-3 text-sm font-medium uppercase border border-gray-200 shadow-lg rounded ${
              furnished ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            value={!furnished}
            onChange={onchange}
            className={`w-full py-2 px-3 text-sm font-medium uppercase border border-gray-200 shadow-lg rounded ${
              !furnished ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            no
          </button>
        </div>

        <label className="font-medium" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={address}
          required
          minLength={30}
          maxLength={300}
          onChange={onchange}
          className="shadow-md rounded border border-gray-300 focus:border-slate-300"
        />

        <label className="font-medium" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          required
          min={25}
          maxLength={300}
          onChange={onchange}
          className="shadow-md rounded border border-gray-300 focus:border-slate-300"
        />

        <label className="font-medium">Offers</label>
        <div className="flex justify-between gap-5 mb-5">
          <button
            type="button"
            value={offers}
            onChange={onchange}
            className={`w-full py-2 px-3 font-medium text-sm uppercase border border-gray-200 shadow-lg rounded ${
              offers ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            value={offers}
            onChange={onchange}
            className={`w-full py-2 px-3 font-medium text-sm uppercase border border-gray-200 shadow-lg rounded ${
              !offers ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            no
          </button>
        </div>

        <label className="font-medium" htmlFor="price">
          Regular Price
        </label>
        <div className="flex items-center gap-5">
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            required
            minLength={50000}
            maxLength={500000}
            onChange={onchange}
            className="w-1/4 shadow-md rounded border border-gray-300 focus:border-slate-300"
          />
          {type === "rent" && <span>$ / Month</span>}
        </div>

        {offers && (
          <div>
            <label className="font-medium" htmlFor="discount">
              Discount price
            </label>
            <div className="flex items-center gap-5">
              <input
                type="number"
                name="discount"
                id="discount"
                value={discount}
                minLength={0}
                onChange={onchange}
                className="w-1/4 shadow-md rounded border border-gray-300 focus:border-slate-300"
              />
              {type === "rent" && <span>$ / Month</span>}
            </div>
          </div>
        )}

        <label className="font-medium" htmlFor="image">
          Image
        </label>
        <label className="block text-sm mb-0" htmlFor="image">
          The image will be the cover (max 6)
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept=".jpg, .jpeg, .png"
          multiple
          value={image}
          max="6"
          required
          onChange={onchange}
          className="bg-white px-2 py-3 mt-0 shadow-md rounded border border-gray-300"
        />

        <button className="w-full text-white uppercase font-semibold bg-blue-500 px-2 py-2 mt-2 mb-4 shadow-md rounded hover:brightness-90 duration-75 ease-in-out" type="submit">create listing</button>
      </form>
    </>
  );
};

export default createListing;
