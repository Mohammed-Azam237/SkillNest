import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="text-white mx-auto w-11/12 max-w-[1200px] py-10">
      <h1 className="mb-10 text-4xl font-bold text-richblack-5 montserrat tracking-wide">
        🛒 Your Cart
      </h1>

      <p className="mb-6 border-b border-richblack-600 pb-3 text-lg font-semibold text-richblack-300 crimson">
        {totalItems} Course{totalItems > 1 ? "s" : ""} in Cart
      </p>

      {total > 0 ? (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          <div>
            <RenderCartCourses />
          </div>

          <div className="w-full">
            <div className="rounded-xl bg-gradient-to-br from-richblack-800/60 to-richblack-900/80 p-6 backdrop-blur-sm border border-richblack-700 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
              <RenderTotalAmount />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-16 text-xl text-richblack-300 italic">
          🚫 Your Cart is Empty. Let’s find you something worth learning!
        </div>
      )}
    </div>
  )
}
