import Head from "../components/blog/Head";

// Import icons
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaRegEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const About = () => {
  return (
    <>
      <Head title="Contact Me" />
      <div class="features text-center">
        <div class="container">
          <div class="row">
            <a
              target="_blank"
              rel="noreferrer"
              style={{ color: "#2867B2" }}
              class="col hover-opacity"
              href="https://www.linkedin.com/in/abdelrazek-ali/"
            >
              <FaLinkedin
                style={{
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                className="my-2"
              />
              <h4 className="mb-5">LinkedIn</h4>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              style={{ color: "#161b22" }}
              class="col hover-opacity"
              href="https://github.com/abdelrazekAli"
            >
              <FaGithub
                style={{
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                className="my-2"
              />
              <h4>Github</h4>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              style={{ color: "#ec4636" }}
              class="col hover-opacity"
              href="mailto:dev.abdelrazek@gmail.com?subject=contact"
            >
              <FaRegEnvelope
                style={{
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                className="my-2"
              />
              <h4>Gmail</h4>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              style={{ color: "#4267B2" }}
              class="col hover-opacity"
              href="https://www.facebook.com/dev.abdelrazek/"
            >
              <FaFacebook
                style={{
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                className="my-2"
              />
              <h4>Facebook</h4>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              style={{ color: "#25D366" }}
              class="col hover-opacity"
              href="https://api.whatsapp.com/send?phone=+201155596710"
            >
              <FaWhatsapp
                style={{
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
                className="my-2"
              />
              <h4>Whatsapp</h4>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
