import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return setError("All fields are required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Enter a valid email.");
    setError("");

    // simulate sending to backend / external API
    const res = await fetch("https://app.proforms.top/f/your_api_key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) setSuccess(true);
    else setError("Something went wrong, please try again.");
  };

  if (success) return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Message Sent ✅</h2>;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 500, margin: "auto", padding: "2rem" }}>
      <h2>Contact Us</h2>
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" value={form.name}
               onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email}
               onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <textarea name="message" placeholder="Your Message" rows="5" value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
