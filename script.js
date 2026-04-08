const chatlogEl = document.getElementById("chatlog");
const chatInput = document.getElementById("chat-input");
const chatForm = document.getElementById("chat-form");

function printMessage(message, sender) {
  const line = document.createElement("div");
  line.innerHTML = "<strong>" + sender + ":</strong> " + message;
  line.style.marginBottom = "8px";
  chatlogEl.appendChild(line);
  chatlogEl.scrollTop = chatlogEl.scrollHeight;
}

async function handleChat(event) {
  event.preventDefault();

  const question = chatInput.value.trim();
  if (!question) return false;

  printMessage(question, "You");
  chatInput.value = "";
  printMessage("Thinking...", "AI");

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await response.json();

    chatlogEl.lastChild.remove();

    if (data.reply) {
      printMessage(data.reply, "AI");
    } else if (data.error) {
      printMessage("Error: " + data.error, "AI");
    } else {
      printMessage("No response received.", "AI");
    }
  } catch (error) {
    chatlogEl.lastChild.remove();
    printMessage("Connection error. Make sure the AI server is running.", "AI");
  }

  return false;
}

chatForm.addEventListener("submit", handleChat);handleChat);
