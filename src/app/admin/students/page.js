"use client";

import { useEffect, useState } from "react";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load students");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    const res = await fetch(`http://localhost:4000/api/admin/students/${id}`, {
      method: "DELETE",
    });
    if (res.ok) setStudents(students.filter((s) => s.id !== id));
    else alert("Delete failed");
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditName(student.name);
    setEditEmail(student.email);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
  };

  const handleEditSave = async (id) => {
    const res = await fetch(`http://localhost:4000/api/admin/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, email: editEmail }),
    });
    if (res.ok) {
      setStudents(
        students.map((s) =>
          s.id === id ? { ...s, name: editName, email: editEmail } : s
        )
      );
      cancelEdit();
    } else {
      alert("Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <main style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Students</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: 16 }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                {editingId === student.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {editingId === student.id ? (
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  student.email
                )}
              </td>
              <td>
                {editingId === student.id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(student.id)}
                      style={{ color: "green" }}
                    >
                      Save
                    </button>
                    <button onClick={cancelEdit} style={{ color: "#555" }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleDelete(student.id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => startEdit(student)}
                      style={{ color: "#0070f3" }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
