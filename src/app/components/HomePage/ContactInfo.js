// ContactInfo.js
export default function ContactInfo() {
  return (
    <div className="home-section-col contact">
      <h3 className="home-section-title">Contact</h3>
      <address className="home-contact-address">
        <i
          className="bi bi-geo-alt-fill"
          style={{ color: "#005fa3", marginRight: 6 }}
        ></i>
        First Floor, NSIC-MDBP Building,
        <br />
        Okhla Industrial Estate,
        <br />
        New Delhi, Delhi 110020
        <br />
        <span className="home-contact-row">
          <i
            className="bi bi-telephone-fill"
            style={{ color: "#005fa3", marginRight: 6 }}
          ></i>
          <b>Phone:</b> 011-69227700
        </span>
        <span className="home-contact-row">
          <i
            className="bi bi-envelope-fill"
            style={{ color: "#005fa3", marginRight: 6 }}
          ></i>
          <b>Email:</b>{" "}
          <a href="mailto:genadmin@nta.ac.in">genadmin@nta.ac.in</a>
        </span>
        <span className="home-contact-row">
          <i
            className="bi bi-geo-alt"
            style={{ color: "#005fa3", marginRight: 6 }}
          ></i>
          <b>Location:</b> <a href="#">View on Map</a>
        </span>
      </address>
    </div>
  );
}
