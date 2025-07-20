import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const Edit = ({ students, onClose }) => {

    useEffect(() => {
        if (!students || students.length === 0) {
            onClose(); // ✅ only called inside useEffect
        }
    }, [students, onClose]);

    if (!students || students.length === 0) return null;

    const student = students[0];

    const [formData, setFormData] = useState({
        name: student.name,
        degree: student.degree,
        semester: student.semester,
        cgpa: student.cgpa,
        gender: student.gender,
        email: student.email,
        contact: student.contact,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/students/${student._id}`,
                formData
            );
            console.log("✅ Student Updated");
            onClose(); // ✅ called after async event
            location.reload(); // Reload the page to see changes
        } catch (error) {
            console.error("❌ Update failed:", error);
        }
    };


    return (
        <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-md flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
                >
                    ✖
                </button>

                <img
                    className="w-28 h-28 mb-3 rounded-full shadow-lg mx-auto"
                    src={`${import.meta.env.VITE_API_URL}/${student.image.replace('./', '')}`}
                    alt="student"
                />

                <h5 className="text-xl font-bold text-center mb-2">Edit Info</h5>

                <form className="space-y-3">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name"
                        className="w-full border rounded px-3 py-2 text-sm" />
                    <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree"
                        className="w-full border rounded px-3 py-2 text-sm" />
                    <input type="text" name="semester" value={formData.semester} onChange={handleChange} placeholder="Semester"
                        className="w-full border rounded px-3 py-2 text-sm" />
                    <input type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA"
                        className="w-full border rounded px-3 py-2 text-sm" />
                    <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender"
                        className="w-full border rounded px-3 py-2 text-sm" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"
                        className="w-full border rounded px-3 py-2 text-sm" />
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact"
                        className="w-full border rounded px-3 py-2 text-sm" />

                    <button type="button"
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white rounded py-2"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
