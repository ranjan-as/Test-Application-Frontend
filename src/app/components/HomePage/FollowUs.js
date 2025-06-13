// FollowUs.js
export default function FollowUs() {
  return (
    <div className="home-section-col">
      <h3 className="home-section-title">Follow Us</h3>
      <ul className="home-section-list">
        <li>
          <a href="#" className="home-section-link facebook">
            <i
              className="bi bi-facebook"
              style={{ marginRight: 8, fontSize: 18 }}
            ></i>{" "}
            Facebook
          </a>
        </li>
        <li>
          <a href="#" className="home-section-link twitter">
            <i
              className="bi bi-twitter-x"
              style={{ marginRight: 8, fontSize: 18 }}
            ></i>{" "}
            Twitter
          </a>
        </li>
      </ul>
    </div>
  );
}
