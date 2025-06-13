"use client";
import Link from "next/link";
import "../components/css/login.css";

export default function AdminDashboard() {
  return (
    <main style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h1>Admin Panel</h1>
      <nav style={{ marginBottom: 24 }}>
        <Link href="/admin/organizations" style={{ marginRight: 24 }}>
          Manage Organizations
        </Link>
        <Link href="/admin/students">Manage Students</Link>
      </nav>
      <p>
        Welcome to the admin panel. Use the links above to manage organizations
        and students.
      </p>
    </main>
  );
}
