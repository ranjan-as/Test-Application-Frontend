"use client";

import { useEffect, useState } from "react";

export default function AdminOrganizations() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editUsb, setEditUsb] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/organizations")
      .then((res) => res.json())
      .then((data) => {
        setOrgs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load organizations");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organization?"))
      return;
    const res = await fetch(
      `http://localhost:4000/api/admin/organizations/${id}`,
      { method: "DELETE" }
    );
    if (res.ok) setOrgs(orgs.filter((o) => o.id !== id));
    else alert("Delete failed");
  };

  const startEdit = (org) => {
    setEditingId(org.id);
    setEditName(org.name);
    setEditEmail(org.email);
    setEditUsb(org.usbSerial || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
    setEditUsb("");
  };

  const handleEditSave = async (id) => {
    const res = await fetch(
      `http://localhost:4000/api/admin/organizations/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          usbSerial: editUsb,
        }),
      }
    );
    if (res.ok) {
      setOrgs(
        orgs.map((o) =>
          o.id === id
            ? { ...o, name: editName, email: editEmail, usbSerial: editUsb }
            : o
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
      <h2>Organizations</h2>
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
            <th>USB Serial</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orgs.map((org) => (
            <tr key={org.id}>
              <td>{org.id}</td>
              <td>
                {editingId === org.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  org.name
                )}
              </td>
              <td>
                {editingId === org.id ? (
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  org.email
                )}
              </td>
              <td>
                {editingId === org.id ? (
                  <input
                    value={editUsb}
                    onChange={(e) => setEditUsb(e.target.value)}
                  />
                ) : (
                  org.usbSerial
                )}
              </td>
              <td>
                {editingId === org.id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(org.id)}
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
                      onClick={() => handleDelete(org.id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => startEdit(org)}
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
