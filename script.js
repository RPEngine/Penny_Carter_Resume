const chatlog = document.getElementById("chatlog");
const input = document.getElementById("chat-input");
const form = document.getElementById("chat-form");

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

  addMessage("Thinking...", "AI");

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await response.json();

    chatlog.lastChild.remove();

    addMessage(data.reply, "AI");

  } catch (error) {
    chatlog.lastChild.remove();
    addMessage("Connection error. Is the AI server running?", "AI");
  }
}

form.addEventListener("submit", handleChat);ndleChat);handleChat);
