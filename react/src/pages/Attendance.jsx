import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import '../App.css';

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [mode, setMode] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleview = () => {
    setMode('view');
    axios.get(`${import.meta.env.VITE_API_URL}/api/attendance`)
      .then((res) => {
        const normalized = res.data.map(item => ({
          ...item,
          isPresent: item.isPresent ?? item.present ?? false
        }));
        setAttendance(normalized);
      })
      .catch((err) => console.error(err));
  };

  const handleCreate = async () => {
    setMode('create');
    const date = document.getElementById('SelectedDate').value;
    const currentDate = new Date().toLocaleDateString('en-CA');

    if (!date) return alert('Please select a date');
    if (date > currentDate) return alert('Selected date cannot be in the future');

    try {
      // 1. Get all students
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/students`);
      const students = res.data;
      console.log('📦 Students:', students);
      // 2. Initialize empty attendance records for selected date
      const attendanceData = students.map((student) => ({
        studentId: student.id,
        name: student.name,
        date: date,
        isPresent: false,
      }));

      setAttendance(attendanceData);
      setSelectedDate(date);
    } catch (error) {
      console.error('Error:', error);
    }


  }

  const handleSave = async () => {
    try {
      for (const record of attendance) {
        const formattedRecord = {
          ...record,
          isPresent: record.isPresent, // ✅ Correct field name
        };
        await axios.post(`${import.meta.env.VITE_API_URL}/api/attendance`, formattedRecord);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000); // 2 seconds
      }
      setAttendance([]); // Clear attendance after saving
      setMode('view');
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  // get unique dates
  const dates = [...new Set(attendance.map(item => item.date))]

  // get unique students
  const students = [...new Map(attendance.map(item => [item.studentId, item])).values()]


  return (
    <div>
      <Navbar />

      {/* Save Toast  */}
      {showToast && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-out flex items-center max-w-xs py-4 px-8 text-white bg-green-500 rounded-lg shadow"
        >
          {/* This wrapper needs flex to align icon + text horizontally */}
          <div className="flex items-center">
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </div>
            <div className="ms-3 text-sm font-normal">Attendance Saved</div>
          </div>
        </div>
      )}

      {/* buttons  */}
      <div className='mt-10'>
        <div className='mx-auto flex justify-between w-64'>
          <button type="button" onClick={handleCreate} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Create</button>



          <button type="button" onClick={handleview} className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">View</button>

        </div>
      </div>

      {/* Date Time  */}

      <div className='mt-10 justify-center flex'>
        <div className="relative max-w-sm w-40">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input id="SelectedDate"
            type="date"
            // datepicker="true"
            datepicker-autohide="true" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
        </div>
      </div>

      {/* Table  */}
      <div className='flex justify-center mt-10 px-4 sm:px-16'>
        <div className="w-full relative overflow-x-auto border rounded-lg shadow-md sm:rounded">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-3">
                  Student ID
                </th>
                <th scope="col" className="p-3 ">
                  Name
                </th>
                {dates.map(date => (
                  <th key={date} className="px-4 py-2">{date}</th>
                ))}

              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={`${student.studentId}-${idx}`} className="bg-white border-b">
                  <td className="px-4 py-2">{student.studentId}</td>
                  <td className="px-4 py-2">{student.name}</td>
                  {dates.map(date => {
                    const record = attendance.find(a => a.studentId === student.studentId && a.date === date);

                    return (
                      <td key={`${student.studentId}-${date}`} className="px-8 py-2 ">
                        {mode === 'create' ? (
                          <input
                            type="checkbox"
                            checked={record?.isPresent || false}
                            onChange={() => {
                              setAttendance(prev =>
                                prev.map(item =>
                                  item.studentId === student.studentId && item.date === date
                                    ? { ...item, isPresent: !item.isPresent }
                                    : item
                                )
                              );
                            }}
                          />
                        ) : (
                          record ? (record.isPresent ? '✔️' : '❌') : '-'
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Save btn  */}
      <div className='my-10 px-1 sm:px-16'>
        <button type="button" onClick={handleSave} className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Save</button>
      </div>


    </div>
  )
}

export default Attendance
