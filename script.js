import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_9elr00o",
        "template_rsy91uh",
        formData,
        "92CWYz6xrtzZ5gMhE"
      );

      toast.success("Message sent!");
      setFormData({
        user_name: "",
        user_email: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to send");
    }

    setLoading(false);
  };

  return (
    <div>
      <Toaster />

      {/* MENU */}
      <div onClick={() => setOpen(!open)} style={{ fontSize: "30px", cursor: "pointer" }}>
        ☰
      </div>

      <nav className={open ? "active" : ""}>
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav>

      {/* FORM */}
      <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
        <h2>Contact Me</h2>

        <form onSubmit={sendEmail}>
          <input name="user_name" value={formData.user_name} onChange={handleChange} placeholder="Your Name" required />
          <br /><br />

          <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} placeholder="Your Email" required />
          <br /><br />

          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required />
          <br /><br />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
