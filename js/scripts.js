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
    const offset = -4;
    const startUTC = Date.UTC(year, month, day, startHour - offset, 0, 0);
    const endUTC = Date.UTC(year, month, day, endHour - offset, 0, 0);

    // Cache agentAvailability element selection
    var agentAvailability = document.getElementById("agentAvailability");

    // Create offline div
    var offlineDiv = document.createElement("div");
    offlineDiv.classList.add("availability", "offline");
    offlineDiv.innerHTML = `<img src="../icons/time.svg" />Available: ${startHour}:00—${endHour}:00 (New York)<div class="agent-status"></div>`;

    // Check if current time is within business hours
    if (nowUTC >= startUTC && nowUTC <= endUTC) {
      offlineDiv.classList.replace("offline", "online");
      offlineDiv.innerHTML =
        '<img src="../icons/time.svg" />Available Now<div class="agent-status"></div>';
    }

    // Append offlineDiv to agentAvailability
    agentAvailability.appendChild(offlineDiv);
  }

  // Format timestamp
  function formatTimestamp(timestamp) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );

    const date = new Date(timestamp);
    const messageDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    if (messageDate.getTime() === today.getTime()) {
      return time;
    } else if (messageDate.getTime() === yesterday.getTime()) {
      return `Yesterday · ${time}`;
    } else {
      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      const parts = formattedDate.split(", ");
      const dayOfWeek = parts[0];
      const monthAndDay = parts[1].split(" ");
      const formattedMonthAndDay = `${monthAndDay[0]} ${monthAndDay[1]}`;

      return `${dayOfWeek}, ${formattedMonthAndDay} · ${time}`;
    }
  }

  // Toggle message details when clicking on a message
  function toggleDetails(textDiv) {
    var details = textDiv.parentElement.nextElementSibling;
    if (details) {
      details.style.display =
        details.style.display === "none" ? "flex" : "none";
    }
  }

  // Copy message text to clipboard
  function copyText(text, element) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        element.innerHTML = `
          <img src="../icons/checkmark.svg" title="Copied to clipboard" />
          <div class="copy-label copied">Copied!</div>
        `;

        setTimeout(() => {
          element.innerHTML = `
            <img src="../icons/copy.svg" title="Copy message" />
            <div class="copy-label">Copy</div>
          `;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  // Track scroll position to toggle the scroll-to-bottom button
  const scrollButton = document.querySelector(".scroll-to-bottom");
  const conversation = document.getElementById("conversation");

  if (conversation) {
    const offset = 200;
    conversation.addEventListener("scroll", function () {
      if (
        conversation.scrollHeight - conversation.scrollTop - offset <=
        conversation.clientHeight
      ) {
        scrollButton.style.display = "none";
      } else {
        scrollButton.style.display = "flex";
      }
    });
  }

  // Handle click on the scroll-to-bottom button
  if (scrollButton) {
    scrollButton.addEventListener("click", scrollToLatestMessage);
  }

  // Split the name into initials
  function getInitials(name) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0)).join("");
    return firstLetters;
  }

  updateAgentStatus();
  checkTextareaEmpty(); // Initial check to see if the textarea is empty

  // Fetch message
  fetch("../data/messages.json")
    .then((response) => response.json())
    .then((data) => {
      displayMessages(data), scrollToLatestMessage();
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Render messages
  function displayMessages(data) {
    // Determine the right container for messages based on available IDs
    const messagesContainer =
      document.getElementById("messages-multi-agent") ||
      document.getElementById("messages-dedicated-agent");

    // Check if the container exists to avoid errors in case none of the specified IDs are found
    if (messagesContainer) {
      messagesContainer.innerHTML = data
        .map((message, index, array) => {
          const isLastMessage = index === array.length - 1;
          const showExtraDetails =
            messagesContainer.id === "messages-multi-agent";
          return `
        <div class="message${
          message.outgoing
            ? " outgoing"
            : showExtraDetails
            ? " multi-agent"
            : ""
        }">
          ${
            !message.outgoing && showExtraDetails
              ? `<div
                  class="photo"
                  style="background: linear-gradient(180deg, ${
                    message.color
                  });">${getInitials(message.sender)}</div>`
              : ""
          }
          <div class="message-container">
            <div class="message-inner">
              ${
                !message.outgoing && showExtraDetails
                  ? `<div class="sender">${message.sender}</div>`
                  : ""
              }
              <div class="text">${message.text}</div>
            </div>
            <div class="details" style="${
              isLastMessage ? "display: flex;" : "display: none;"
            }">
              ${formatTimestamp(message.timestamp)}
              <div class="copy-text" data-index="${index}">
                <div><img src="../icons/copy.svg" title="Copy message" /></div>
                <div class="copy-label">Copy</div>
              </div>
            </div>
          </div>
        </div>
      `;
        })
        .join("");
    }

    // Attach onClick event to each .text element to toggle timestamp visibility
    document
      .querySelectorAll(".message .message-container .message-inner .text")
      .forEach((textDiv) => {
        textDiv.addEventListener("click", () => toggleDetails(textDiv));
      });

    // Attach onClick event listeners for copying text
    document.querySelectorAll(".copy-text").forEach((copyDiv) => {
      copyDiv.addEventListener("click", () => {
        const index = copyDiv.getAttribute("data-index");
        copyText(data[index].text, copyDiv);
      });
    });
  }
});
