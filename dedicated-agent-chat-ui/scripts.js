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

  // For demo purposes only, switch the offline agent status to online after 3 seconds.
  // TODO: In production, update according to the relevant server timezone and working hours.
  function replaceStatus() {
    setTimeout(function () {
      var availabilityDiv = document.querySelector(".availability");
      availabilityDiv.classList.replace("offline", "online");
      availabilityDiv.innerHTML =
        '<img src="icons/time.svg" />Currently Available<div class="agent-status"></div>';
    }, 3000);
  }

  function createOfflineStatus() {
    var agentAvailability = document.getElementById("agentAvailability");
    var offlineDiv = document.createElement("div");
    offlineDiv.classList.add("availability", "offline");
    offlineDiv.innerHTML =
      '<img src="icons/time.svg" />Available: 9:00—17:00 (Paris)<div class="agent-status"></div>';
    agentAvailability.appendChild(offlineDiv);
  }

  createOfflineStatus();
  replaceStatus(); // TODO: In production, check against the relevant server timezone and working hours
  scrollToLatestMessage();
  checkTextareaEmpty(); // Initial check to see if the textarea is empty
});
