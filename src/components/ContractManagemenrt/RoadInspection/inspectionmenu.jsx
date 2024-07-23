import React, { Component } from "react";

class InspectionMenu extends Component {
  
    state = {};
 
  render() {
    return (
      <>
      <div className="mb-5">
    <div className="max-w-[320px] md:max-w-[990px] mx-auto">
        <div className="md:flex justify-between space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
            <div className="p-3 lg:p-5 border border-black dark:border-[#1b2e4b] text-center rounded group hover:border-primary">
                <h3 className="text-xl lg:text-2xl">Beginner Savers</h3>
                <div className="border-t border-black dark:border-white-dark w-1/5 mx-auto my-6 group-hover:border-primary"></div>
                <p className="text-[15px]">For people who are starting out in the water saving business</p>
                <div className="my-7 p-2.5 text-center text-lg group-hover:text-primary">
                    <strong className="text-[#3b3f5c] dark:text-white-dark text-3xl lg:text-5xl group-hover:text-primary">$19</strong> / monthly
                </div>
                <ul className="space-y-2.5 mb-5 font-semibold group-hover:text-primary">
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Free water saving e-book
                    </li>
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Free access to forums
                    </li>
                    <li className="flex justify-center items-center">
                        <svg>...</svg>
                        Beginners tips
                    </li>
                </ul>
                <button
                    type="button"
                    className="btn text-black shadow-none group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10 dark:text-white-dark dark:border-white-dark/50 w-full"
                >
                    Buy Now
                </button>
            </div>
            
            
        </div>
    </div>
</div>
      </>
    )
  }
}
export default InspectionMenu;