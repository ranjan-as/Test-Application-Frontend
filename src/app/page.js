import HomeIntro from "./components/HomePage/HomeIntro";
import QuickLinks from "./components/HomePage/QuickLinks";
import FollowUs from "./components/HomePage/FollowUs";
import ContactInfo from "./components/HomePage/ContactInfo";
import HomeFooter from "./components/HomePage/HomeFooter";
import "./components/css/homeSections.css";

export default function Home() {
  return (
    <main
      style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <HomeIntro />
      <section className="home-sections">
        <QuickLinks />
        <FollowUs />
        <ContactInfo />
      </section>
      <HomeFooter />
    </main>
  );
}
