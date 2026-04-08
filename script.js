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

function getResumeResponse(question) {

    const q = question.toLowerCase();

    if (q.includes("degree") || q.includes("education")) {
        return "Penny is currently pursuing a Bachelor’s in Human Resource Management at Southern New Hampshire University with an expected graduation in February 2027.";
    }

    if (q.includes("experience") || q.includes("work")) {
        return "Penny has leadership experience in several roles including Shift Manager at Burger King, Customer Service Manager at McDonald's, and Special Operations Team Lead at Whataburger. She currently works as a Store Associate at Circle K.";
    }

    if (q.includes("skills") || q.includes("strength")) {
        return "Her strengths include leadership, employee coaching, conflict resolution, training and onboarding, scheduling, compliance, and workforce coordination.";
    }

    if (q.includes("hr") || q.includes("human resources")) {
        return "Penny is transitioning into Human Resources and is particularly interested in roles related to onboarding, employee experience, people operations, and HR support.";
    }

    if (q.includes("training") || q.includes("certification")) {
        return "Her training includes Microsoft Office 365, QuickBooks Payroll, HRIS Basics, introductory People Analytics, Python fundamentals, and AI productivity tools.";
    }

    if (q.includes("contact")) {
        return "You can contact Penny at pjcarter2420@gmail.com or by phone at 904-408-6175.";
    }

    return "I can answer questions about Penny's experience, education, HR interests, and skills. Try asking about her HR goals, work history, or training.";
}

function handleChat(event) {

    event.preventDefault();

    const question = chatInput.value.trim();
    if (!question) return false;

    printMessage(question, "You");

    const response = getResumeResponse(question);

    setTimeout(function () {
        printMessage(response, "AI");
    }, 300);

    chatInput.value = "";

    return false;
}

chatForm.addEventListener("submit", handleChat);
