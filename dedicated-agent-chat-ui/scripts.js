document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const textarea = document.getElementById("autoGrowingTextarea");
  const submitButton = document.getElementById("submitMessage");

  // Autoresize textarea when typing a long message
  function autoGrowingTextarea() {
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = textarea.scrollHeight + "px"; // Set the height to scroll height
      updateConversationPadding(textarea.scrollHeight);
      scrollToLatestMessage(); // Scroll to the latest message whenever the height changes
      checkTextareaEmpty(); // Check if textarea is empty to enable/disable submit button
    }
  }

  // Update padding-bottom of the conversation div based on textarea height plus an additional 16px
  // Ensure the padding does not exceed 232px (equals the size of the maximum textarea height + 16px additional space)
  function updateConversationPadding(textAreaHeight) {
    const maxPadding = 236;
    const additionalPadding = 16;
    const calculatedPadding = textAreaHeight + additionalPadding;

    const conversationDiv = document.getElementById("conversation");
    if (conversationDiv) {
      conversationDiv.style.paddingBottom =
        Math.min(calculatedPadding, maxPadding) + "px";
    }
  }

  // Scroll to the latest message
  function scrollToLatestMessage() {
    var container = document.getElementById("conversation");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  // Check if the textarea is empty and disable or enable the submit button
  function checkTextareaEmpty() {
    if (textarea.value.trim() === "") {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }

  if (textarea) {
    textarea.addEventListener("input", autoGrowingTextarea);
    autoGrowingTextarea(); // Initial resize if there's any text already
  }

  // Update the agent's status according to business hours.
  // TODO: Re-check that it works with winter/summer time adjustments.
  function updateAgentStatus() {
    // Get current time in UTC
    const nowUTC = Date.now();
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth();
    const day = today.getUTCDate();

    // Convert business hours in UTC
    const startHour = 9;
    const endHour = 17;
    const offset = 3;
    const startUTC = Date.UTC(year, month, day, startHour - offset, 0, 0);
    const endUTC = Date.UTC(year, month, day, endHour - offset, 0, 0);

    // Cache agentAvailability element selection
    var agentAvailability = document.getElementById("agentAvailability");

    // Create offline div
    var offlineDiv = document.createElement("div");
    offlineDiv.classList.add("availability", "offline");
    offlineDiv.innerHTML = `<img src="icons/time.svg" />Available: ${startHour}:00—${endHour}:00 (Paris)<div class="agent-status"></div>`;

    // Check if current time is within business hours
    if (nowUTC >= startUTC && nowUTC <= endUTC) {
      offlineDiv.classList.replace("offline", "online");
      offlineDiv.innerHTML =
        '<img src="icons/time.svg" />Available Now<div class="agent-status"></div>';
    }

    // Append offlineDiv to agentAvailability
    agentAvailability.appendChild(offlineDiv);
  }

  updateAgentStatus();
  scrollToLatestMessage();
  checkTextareaEmpty(); // Initial check to see if the textarea is empty
});
