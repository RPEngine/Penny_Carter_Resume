import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const resumeData = `
Penny Carter is a Human Resources student and people-focused professional with experience in leadership, training, customer service, and operations.

She is currently pursuing a Bachelor's in Human Resource Management and is building toward roles that focus on employee support, onboarding, and people operations.

Her strengths include leadership, communication, conflict resolution, onboarding support, employee coaching, compliance awareness, scheduling, and workplace coordination.

Work history includes:
- Store Associate at Circle K
- Shift Manager at Burger King
- Customer Service Manager at McDonald's
- Special Operations Team Lead at Whataburger

Training includes:
- Microsoft Office 365
- QuickBooks Payroll
- HRIS Basics
- People Analytics (Intro)
- Python (Beginner)
- Outlook
- AI Productivity Tools
`;

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.featherless.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.FEATHERLESS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are Penny Carter's AI Resume Assistant. Answer only using the approved resume information below. If something is not in the data, say that the information is not currently included in Penny's profile.\n\n" +
              resumeData
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: data?.error?.message || "AI provider request failed."
      });
    }

    const reply = data?.choices?.[0]?.message?.content || "No reply returned.";
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Server error while contacting AI provider." });
  }
});

app.listen(3000, () => {
  console.log("AI server running on http://localhost:3000");
});
