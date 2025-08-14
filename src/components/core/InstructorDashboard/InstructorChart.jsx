import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export const InstructorChart = ({ courses }) => {
  const [activeTab, setActiveTab] = useState('revenue')

  if (!courses || courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-richblack-400">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Create courses to see performance metrics</p>
        </div>
      </div>
    )
  }

  // Calculate chart data
  const chartData = courses.map(course => ({
    name: course.courseName,
    students: course.totalStudents,
    revenue: course.totalRevenue
  }))

  // Revenue Chart Data (Vibrant Green & Gold Theme)
  const revenueChartData = {
    labels: chartData.map(course => course.name),
    datasets: [
      {
        label: 'Revenue (₹)',
        data: chartData.map(course => course.revenue),
        backgroundColor: [
          'rgba(34, 197, 94, 0.9)',   // Bright Green
          'rgba(251, 191, 36, 0.9)',  // Golden Yellow
          'rgba(16, 185, 129, 0.9)',  // Emerald Green
          'rgba(245, 158, 11, 0.9)',  // Amber
          'rgba(5, 150, 105, 0.9)',   // Dark Green
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(5, 150, 105, 1)',
        ],
        borderWidth: 3,
        borderRadius: 10,
      },
    ],
  }

  // Student Chart Data (Vibrant Blue & Purple Theme)
  const studentChartData = {
    labels: chartData.map(course => course.name),
    datasets: [
      {
        label: 'Students',
        data: chartData.map(course => course.students),
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)',  // Bright Blue
          'rgba(147, 51, 234, 0.9)',  // Purple
          'rgba(99, 102, 241, 0.9)',  // Indigo
          'rgba(168, 85, 247, 0.9)',  // Violet
          'rgba(139, 92, 246, 0.9)',  // Purple Blue
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 3,
        borderRadius: 10,
      },
    ],
  }

  // Pie Chart Data for Students (Rainbow Theme)
  const studentPieData = {
    labels: chartData.map(course => course.name),
    datasets: [
      {
        data: chartData.map(course => course.students),
        backgroundColor: [
          'rgba(239, 68, 68, 0.9)',   // Red
          'rgba(245, 101, 101, 0.9)',  // Light Red
          'rgba(251, 146, 60, 0.9)',   // Orange
          'rgba(251, 191, 36, 0.9)',   // Yellow
          'rgba(34, 197, 94, 0.9)',    // Green
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 101, 101, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 3,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: activeTab === 'revenue' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            size: 11,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
      },
    },
  }

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'revenue'
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-richblack-700 text-richblack-300 hover:bg-richblack-600 hover:text-white'
          }`}
        >
          Revenue
        </button>
        <button
          onClick={() => setActiveTab('student')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'student'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-richblack-700 text-richblack-300 hover:bg-richblack-600 hover:text-white'
          }`}
        >
          Student
        </button>
      </div>

             {/* Chart Content */}
       <div className="h-96">
         {activeTab === 'revenue' ? (
           <div className="h-full">
             <h3 className="text-lg font-semibold text-white mb-4">Revenue by Course</h3>
             <div className="h-80">
               <Bar data={revenueChartData} options={chartOptions} />
             </div>
           </div>
         ) : (
           <div className="h-full">
             <h3 className="text-lg font-semibold text-white mb-4">Student Distribution</h3>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-80">
               <div className="h-full">
                 <h4 className="text-md font-medium text-white mb-3">Students by Course (Bar)</h4>
                 <div className="h-64">
                   <Bar data={studentChartData} options={chartOptions} />
                 </div>
               </div>
               <div className="h-full">
                 <h4 className="text-md font-medium text-white mb-3">Student Distribution (Pie)</h4>
                 <div className="h-64">
                   <Pie data={studentPieData} options={pieOptions} />
                 </div>
               </div>
             </div>
           </div>
         )}
       </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-richblack-700">
        <div className="bg-richblack-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-richblack-300">Total Revenue</p>
              <p className="text-lg font-bold text-yellow-50">
                ₹{chartData.reduce((sum, course) => sum + course.revenue, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-richblack-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-richblack-300">Total Students</p>
              <p className="text-lg font-bold text-blue-50">
                {chartData.reduce((sum, course) => sum + course.students, 0)}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorChart
