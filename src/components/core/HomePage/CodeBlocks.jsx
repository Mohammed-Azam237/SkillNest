import React from 'react'
import CTAButton from "../HomePage/Button"
import HighlightText from './HighlightText'
import {FaArrowRight} from "react-icons/fa"
import {TypeAnimation} from "react-type-animation"

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient = { codeGradient: "", glow: "" },
    codeColor,
  }) => {
    return (
      <div className={`flex ${position} my-20 items-center  justify-center gap-x-[150px] `}>
        {/* Section 1 */}
        <div className="w-[500px] flex flex-col justify-center gap-8">
          {heading}
          <div className="text-richblack-300 font-bold">{subheading}</div>
          <div className="flex gap-7 ">
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className="flex gap-2 items-center">
                {ctabtn1.btnText}
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btnText}
            </CTAButton>
          </div>
        </div>
  
        {/* Section 2 */}
        <div
              className={`w-[500px] flex flex-row text-[16px]   relative p-1 border border-white  rounded-md ${backgroundGradient?.codeGradient ?? ''} `}
                style={{ backgroundColor: backgroundGradient?.backgroundColor }}
              >

        {/* Yellow radial gradient glow */}
        {backgroundGradient?.glow && (
            <div
              className="absolute left-[8rem] top-20 opacity-50 w-[100px] h-[100px] rounded-full"
              style={{ ...backgroundGradient.glow }}
            ></div>
          )}
          {/* Line numbers */}
          <div className="text-center flex flex-col w-[10%] text-gray-800 font-inter font-bold bg-gray-800">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>

          {/* Code content with linear gradient */}
          <div
            className={`w-[90%] flex flex-col font-bold  rounded-md font-mono ${codeColor}  relative`}
          >
            <TypeAnimation
              sequence={[codeblock, 2000, ""]}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
                overflowX: "hidden",
                fontSize: "16px",
                background: "transparent",
                color: "inherit",
                
              }}
              omitDeletionAnimation={true}
            />
          </div>
        
      </div>
      </div>
    );
  };
  
  export default CodeBlocks;


