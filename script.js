const chatlog = document.getElementById("chatlog");
const input = document.getElementById("chat-input");
const form = document.getElementById("chat-form");

// Your actual backend URL
const API_URL = "https://penny-carter-resume.onrender.com/chat";

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  msg.style.marginBottom = "8px";
  chatlog.appendChild(msg);
  chatlog.scrollTop = chatlog.scrollHeight;
}

async function handleChat(e) {
  e.preventDefault();

  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "You");
  input.value = "";

  // Temporary placeholder while waiting
  const thinkingMsg = document.createElement("div");
  thinkingMsg.innerHTML = `<strong>AI:</strong> Thinking...`;
  thinkingMsg.style.marginBottom = "8px";
  chatlog.appendChild(thinkingMsg);
  chatlog.scrollTop = chatlog.scrollHeight;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await response.json();

    thinkingMsg.remove();
    addMessage(data.reply, "AI");

  } catch (error) {
    thinkingMsg.remove();
    addMessage("Connection error — your AI server may be offline.", "AI");
  }
}

form.addEventListener("submit", handleChat);

