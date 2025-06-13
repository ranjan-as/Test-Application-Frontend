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
        <li>
          <a href="#" className="home-section-link youtube">
            <i
              className="bi bi-youtube"
              style={{ marginRight: 8, fontSize: 18 }}
            ></i>{" "}
            YouTube
          </a>
        </li>
        <li>
          <a href="#" className="home-section-link playstore">
            <i
              className="bi bi-google-play"
              style={{ marginRight: 8, fontSize: 18 }}
            ></i>{" "}
            Play Store
          </a>
        </li>
        <li>
          <a href="#" className="home-section-link appstore">
            <i
              className="bi bi-apple"
              style={{ marginRight: 8, fontSize: 18 }}
            ></i>{" "}
            App Store
          </a>
        </li>
      </ul>
    </div>
  );
}
