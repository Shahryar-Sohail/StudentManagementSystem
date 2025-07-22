import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Edit from '../components/Edit'
import Skeleton from '../components/Skeleton'
import '../index.css'; 

const Home = () => {
  const [students, setStudents] = useState([])
  const [isEdit, setIsEdit] = useState(true);
  const [editStudentId, setEditStudentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);


  // ✅ Move fetchStudents here so it's available to all functions
  const fetchStudents = async () => {
    try {
      setLoading(true); // 🔴 Start loading
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/students?search=${searchQuery}`);
      const data = Array.isArray(res.data) ? res.data : res.data.students;
      setStudents(data || []);
    } catch (err) {
      console.error('Failed to fetch students', err);
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  useEffect(() => {
    setLoading(true); // 🔴 Start loading
    if (searchQuery.length >= 1) {
      fetchStudents();
    } else {
      axios.get(`${import.meta.env.VITE_API_URL}/api/students`)
        .then(res => setStudents(res.data))
        .catch(err => console.error('Failed to fetch all students', err))
        .finally(() => setLoading(false)); // ✅ End loading
    }
  }, [searchQuery]);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Delete 
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000); // 2 seconds

        const result = await response.json();
        console.log(result.message);

        fetchStudents(); // refresh
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (id) => {
    setEditStudentId(id);
    setIsEdit(true);
  }



  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      <Navbar />


      {/* Delete Toast  */}
      {showToast && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-out flex items-center max-w-xs p-4 text-white bg-red-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        >
          <div className="inline-flex items-center justify-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
          </div>
          <div className="ms-3 text-sm font-normal">User has been deleted.</div>
        </div>
      )}


      {/* form  */}
      <form className="max-w-sm mx-auto my-10 w-1/2">
        <div>
          <input type="text" id="search" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Search Student" />
        </div>
      </form>

      {/* card  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-5 dark:bg-gray-900 bg-white">
        {loading
          ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
          : students.map((student) => (
            <div key={student.id} className="w-full text-lg">
              <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="flex flex-col items-center pb-10 px-3 ">
                  <img
                    className="w-28 h-28 mb-3 rounded-full shadow-lg "
                    src={`${import.meta.env.VITE_API_URL}/${(student.image || './asset/default.jpg').replace('./', '')}`}
                    alt="Student"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{student.name}</h5>
                  <ul className="w-full divide-y divide-gray-300 border border-gray-300 rounded-md overflow-hidden ">
                    <li className="px-4 py-2 bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white">ID: {student.id}</li>
                    <li className="px-4 py-2 bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white">Degree Name: {student.degree}</li>
                    <li className="px-4 py-2 bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white">Semester: {student.semester}</li>
                    <li className="px-4 py-2 bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white">CGPA: {student.cgpa}</li>
                    <li className="px-4 py-2 bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white">Gender: {student.gender}</li>
                    <li className="px-4 py-2 bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white">Email: {student.email}</li>
                    <li className="px-4 py-2 bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white">Contact: {student.contact}</li>
                  </ul>
                  <div className="flex mt-4 md:mt-6">
                    <a href="#" onClick={() => handleEdit(student._id)} className="inline-flex items-center px-8 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">Edit</a>
                    <a href="#" onClick={() => handleDelete(student._id, student.name)} className="py-2 px-8 ms-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800">Delete</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>


      {isEdit && editStudentId && (
        <Edit
          students={students.filter((s) => s._id === editStudentId)}
          onClose={() => setIsEdit(false)}
        />
      )}


    </div>
  )
}

export default Home
