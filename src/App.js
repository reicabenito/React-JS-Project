import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Reica', place: 'Manila', phone: '0912345678912' },
    { id: 2, name: 'Hikaru', place: 'Tokyo', phone: '0801234567891' },
    { id: 3, name: 'Trisha', place: 'Los Angeles', phone: '213123456789' },
    { id: 4, name: 'Izzy', place: 'Singapore', phone: '6312345678912' },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    place: '',
    phone: ''
  });

  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.place && newStudent.phone) {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      setStudents([...students, { ...newStudent, id: newId }]);
      setNewStudent({ name: '', place: '', phone: '' });
    }
  };

  const handleEdit = (student) => {
    setNewStudent(student);
    setEditingId(student.id);
  };

  const handleUpdate = () => {
    setStudents(students.map(s => s.id === editingId ? newStudent : s));
    setNewStudent({ name: '', place: '', phone: '' });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="app">
      <h1 className="title">Student Records</h1>
      <button onClick={handleAddStudent}>Add New Student</button>


      
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStudent.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={newStudent.place}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newStudent.phone}
          onChange={handleInputChange}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>NO.</th>
            <th>NAME</th>
            <th>PLACE</th>
            <th>PHONE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className={index % 2 === 1 ? 'odd-row' : ''}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.place}</td>
              <td>{student.phone}</td>
              <td className="actions">
                <button className="view-btn">View</button>
                <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
