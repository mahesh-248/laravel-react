import React, { useState } from 'react';

const SubmitForm = () => {
  const [form, setForm] = useState({
    studentName: '',
    studentId: '',
    studentEmail: '',
    studentPhone: '',
    major: '',
    graduationDate: '',
    professorName: 'Elizabeth D. Diaz',
    professorDepartment: 'Computer Science',
    professorEmail: 'elizabeth.diaz@uta.edu',
    professorPhone: '432-230-6721',
    projectTitle: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    weeklyHours: 21,
    location: 'Remote',
    activityLog: [],
    studentSignature: '',
    signatureDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleActivityChange = (index, field, value) => {
    const updatedActivityLog = form.activityLog.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setForm({ ...form, activityLog: updatedActivityLog });
  };

  const addActivityLogEntry = () => {
    setForm({
      ...form,
      activityLog: [...form.activityLog, { date: '', description: '', hoursSpent: '' }]
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log(form);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 shadow rounded">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Volunteer Student Weekly Activity Report Form</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Student Information</h2>
        <input type="text" name="studentName" value={form.studentName} onChange={handleChange} placeholder="Full Name" required />
        <input type="text" name="studentId" value={form.studentId} onChange={handleChange} placeholder="Student Id" required />
        <input type="email" name="studentEmail" value={form.studentEmail} onChange={handleChange} placeholder="Contact Email" required />
        <input type="tel" name="studentPhone" value={form.studentPhone} onChange={handleChange} placeholder="Contact Phone" required />
        <input type="text" name="major" value={form.major} onChange={handleChange} placeholder="Major" required />
        <input type="date" name="graduationDate" value={form.graduationDate} onChange={handleChange} placeholder="Graduation Date" required />
        </section>
        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Professor/Supervisor Information</h2>
        <input type="text" value={form.professorName} readOnly />
        <input type="text" value={form.professorDepartment} readOnly />
        <input type="email" value={form.professorEmail} readOnly />
        <input type="tel" value={form.professorPhone} readOnly />
        </section>
        
        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Volunteer Assignment Details</h2>
        <input type="text" name="projectTitle" value={form.projectTitle} onChange={handleChange} placeholder="Project/Activity Title" required />
        <textarea name="projectDescription" value={form.projectDescription} onChange={handleChange} placeholder="Brief Description" required />
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} placeholder="Start Date" required />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} placeholder="End Date" required />
        <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <input type="number" name="weeklyHours" value={form.weeklyHours} onChange={handleChange} placeholder="Weekly Hours Commitment" min="20" required />
        </section>
        
        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Activity Log</h2>
        {form.activityLog.map((activity, index) => (
          <div key={index}>
            <input type="date" value={activity.date} onChange={(e) => handleActivityChange(index, 'date', e.target.value)} required />
            <textarea value={activity.description} onChange={(e) => handleActivityChange(index, 'description', e.target.value)} placeholder="Activity Description" required />
            <input type="number" value={activity.hoursSpent} onChange={(e) => handleActivityChange(index, 'hoursSpent', e.target.value)} placeholder="Hours Spent" min="1" required />
          </div>
        ))}
        <button type="button" onClick={addActivityLogEntry}>Add Entry</button>
        </section>
        
        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Student Acknowledgement</h2>
        <p>I hereby confirm that I will commit to volunteering for a minimum of 20 hours per week as specified in the above schedule...</p>
        <input type="text" name="studentSignature" value={form.studentSignature} onChange={handleChange} placeholder="Student's Signature" required />
        <input type="date" name="signatureDate" value={form.signatureDate} onChange={handleChange} placeholder="Date" required />
        </section>
        <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
          Submit Report
        </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
