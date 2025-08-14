import React from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");
    const [activeOption, setActiveOption] = useState(1);


    //fetch all categories
    useEffect(()=>{
       const getCategories = async()=>{
        const res = await apiConnector("GET",categories.CATEGORIES_API);
        const category_id = 
        res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName) [0].
        _id;
        setCategoryId(category_id);
       }
       getCategories();
    },[catalogName]);

    useEffect(()=>{
        const getCategoryDetails = async()=>{
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("Printing res:", res);
                setCatalogPageData(res);
            }
            catch(error){
                console.log(error)
            }

        }
        if(categoryId){
        getCategoryDetails();}
    },[categoryId]);
  return (
    <div className="text-white bg-richblack-900 font-montserrat">
    {/* HEADER BANNER */}
    <section className="relative w-full bg-gradient-to-br from-richblack-800 to-richblack-900 px-6 py-20">
      <div className="max-w-maxContent mx-auto flex flex-col items-start gap-4">
        <p className="text-sm text-richblack-300 tracking-wide">
          Home / Catalog /
          <span className="text-yellow-50 ml-1">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
  
        <h1 className="text-5xl font-bold text-richblack-5 drop-shadow-md">
          {catalogPageData?.data?.selectedCategory?.name}
        </h1>
  
        <p className="text-lg text-richblack-200 max-w-[880px] leading-relaxed">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>
  
      {/* Optional background blur glow */}
      <div className="absolute -top-12 -right-12 h-64 w-64 bg-yellow-50 opacity-10 blur-3xl rounded-full"></div>
    </section>
  
    {/* SECTION: Courses to Get You Started */}
    <section className="max-w-maxContent mx-auto px-6 py-20">
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-richblack-5 mb-4">
          🚀 Courses to Get You Started
        </h2>
  
        <div className="flex gap-4 border-b border-richblack-600">
          <button
            onClick={() => setActiveOption(1)}
            className={`px-4 py-2 text-base font-medium transition-all duration-200 ${
              activeOption === 1
                ? "border-b-2 border-yellow-50 text-yellow-50"
                : "text-richblack-300 hover:text-yellow-50"
            }`}
          >
            Most Popular
          </button>
          <button
            onClick={() => setActiveOption(2)}
            className={`px-4 py-2 text-base font-medium transition-all duration-200 ${
              activeOption === 2
                ? "border-b-2 border-yellow-50 text-yellow-50"
                : "text-richblack-300 hover:text-yellow-50"
            }`}
          >
            New
          </button>
        </div>
      </div>
  
      <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
    </section>
  
    {/* SECTION: Top Courses in This Category */}
    <section className="relative px-6 py-20 rounded-[30px] bg-gradient-to-br from-[#1C1F28] via-[#111322] to-[#0E0F1A] shadow-[0_10px_40px_rgba(255,255,255,0.05)] overflow-hidden my-16">
                <div className="absolute -top-20 -left-20 h-64 w-64 bg-yellow-50 opacity-10 blur-3xl rounded-full z-0"></div>
                <div className="relative z-10 max-w-maxContent mx-auto">
                    <h2 className="text-4xl font-bold text-yellow-25 mb-10 text-center tracking-wide">
                        🔥 Top Courses in {catalogPageData?.data?.selectedCategory?.name}
                    </h2>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                </div>
            </section>
  
    {/* SECTION: Frequently Bought */}
    <section className="max-w-maxContent mx-auto px-6 py-20">
      <h2 className="text-4xl font-semibold text-richblack-5 mb-10">
        ❤️ Frequently Bought Together
      </h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {catalogPageData?.data?.mostSellingCourses
          ?.slice(0, 4)
          .map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              Height="h-[360px]"
            />
          ))}
      </div>
    </section>
  
    <Footer />
  </div>
  
  
  )
}

export default Catalog
