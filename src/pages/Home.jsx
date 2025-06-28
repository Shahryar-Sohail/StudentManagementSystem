import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  const students = [
    {
      id: '12345',
      degree: 'Computer Science',
      Semester: '5th',
      cgpa: '3.8',
      gender: '3.8',
      email: 'af',
      contact: 'fafad',
    },
    {
      id: '12345',
      degree: 'Computer Science',
      Semester: '5th',
      cgpa: '3.8',
      gender: '3.8',
      email: 'af',
      contact: 'fafad',
    }
  ]
  return (
    <div className='container mx-auto px-4'>
      <Navbar />

      {/* form  */}
      <form className="max-w-sm mx-auto mt-5">
        <div>
          <input type="text" id="search" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Search Student" />
        </div>
      </form>

      {/* card  */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">

          {students.map((student) => (
            <div key={student.id} className="w-full px-5 text-lg">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

              <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Ahmad Jawad</h5>

                <ul className="w-full divide-y divide-gray-300 border border-gray-300 rounded-md overflow-hidden">
                  <input type="hidden" className="mongo-id" value={student._id} />

                  <li className="px-4 py-2 bg-white hover:bg-gray-100">ID: {student.id}</li>
                  <li className="px-4 py-2 bg-white hover:bg-gray-100">Degree Name: {student.degree}</li>
                  <li className="px-4 py-2 bg-white hover:bg-gray-100">Semester: {student.Semester}</li>
                  <li className="px-4 py-2 bg-white hover:bg-gray-100">CGPA: {student.cgpa}</li>
                  <li className="px-4 py-2 bg-white hover:bg-gray-100">Gender: {student.gender}</li>
                  <li className="px-4 py-2 bg-white hover:bg-gray-100">Email: {student.email}</li>
                  <li className="px-4 py-2 bg-white hover:bg-gray-100">Contact: {student.contact}</li>
                </ul>
                <div className="flex mt-4 md:mt-6">
                  <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</a>
                  <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-700 rounded-lg border border-gray-200 hover:bg-red-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete</a>
                </div>
              </div>
            </div>
        </div>
          ))}


      </div>



    </div>
  )
}

export default Home
