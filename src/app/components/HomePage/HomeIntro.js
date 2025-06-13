// HomeIntro.js
export default function HomeIntro() {
  return (
    <section
      style={{
        padding: "2rem 1rem",
        background: "#f8f9fa",
        borderRadius: 8,
        marginBottom: 32,
      }}
    >
      <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 12 }}>
        Welcome to the Secure Online Test Platform
      </h1>
      <p style={{ fontSize: 18, marginBottom: 16 }}>
        This platform provides a secure environment for online tests and mock
        exams. Organizations can create and manage tests, students can take
        tests with USB-based authentication, and admins can oversee the entire
        process.
      </p>
      <ul style={{ fontSize: 16, marginBottom: 16 }}>
        <li>
          Organizations: Register, login, and create tests for your students.
        </li>
        <li>Students: Register, login, and take assigned tests securely.</li>
        <li>
          Admins: Manage organizations and students, and monitor test activity.
        </li>
      </ul>
      <p style={{ fontSize: 16, color: "#007bff" }}>
        USB authentication ensures only authorized users can access and take
        tests.
      </p>
    </section>
  );
}
