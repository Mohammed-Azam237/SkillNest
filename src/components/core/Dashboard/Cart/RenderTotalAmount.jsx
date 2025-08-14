import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'

const RenderTotalAmount = () => {
  const { total, cart, totalItems } = useSelector((state) => state.cart)

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    console.log("Bought these courses:", courses)
  }

  return (
    <div className="flex flex-col gap-6 text-white">
      {/* Card Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-wide text-richblack-5 montserrat">
          🧾 Order Summary
        </h2>
        <p className="text-sm text-richblack-300 italic">
          Total items in cart: <span className="font-medium">{totalItems}</span>
        </p>
      </div>

      {/* Price Display */}
      <div className="flex justify-between items-center border-b border-richblack-500 pb-4">
        <span className="text-lg font-semibold text-richblack-300">Total Price</span>
        <span className="text-3xl font-bold text-yellow-300 tracking-wide">
          ₹ {total}
        </span>
      </div>

      {/* Buy Button */}
      <button
        className="rounded-lg bg-gradient-to-tr from-yellow-400 to-yellow-50 text-black font-bold text-lg py-3 hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(255,255,0,0.3)]"
        onClick={() => alert("Redirecting to checkout 🚀")}
      >
        🚀 Buy Now
      </button>
    </div>
  );
};

export default RenderTotalAmount
