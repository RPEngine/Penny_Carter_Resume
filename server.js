import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const resumeContext = `
You are Penny Carter's AI resume assistant.

Information about Penny:

Penny Carter is pursuing a Bachelor's in Human Resource Management at Southern New Hampshire University (expected graduation February 2027).

She has leadership experience including:
• Store Associate – Circle K
• Shift Manager – Burger King
• Customer Service Manager – McDonald's
• Special Operations Team Lead – Whataburger

Skills include:
• Training and onboarding employees
• Conflict resolution
• Team leadership
• Scheduling and workforce coordination
• Compliance and policy awareness
• Customer service leadership

Training:
• Microsoft Office 365
• QuickBooks Payroll
• HRIS Basics
• People Analytics Intro
• Python Beginner
• AI productivity tools

She is seeking entry-level HR roles such as:
HR Assistant
HR Coordinator
Onboarding Specialist
People Operations roles

If information is not in the resume, say:
"That information is not currently included in Penny's profile."
`;

app.post("/chat", async (req, res) => {
  const question = req.body.message;

  console.log("Received question:", question);

  try {
    const response = await fetch("https://api.featherless.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.FEATHERLESS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-7b-instruct-v0.3",
        temperature: 0.2,
        messages: [
          { role: "system", content: resumeContext },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    console.log("Featherless raw response:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "The assistant could not generate a response.";

    res.json({ reply });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      reply: "Server error",
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("AI server running at http://localhost:3000");
});

