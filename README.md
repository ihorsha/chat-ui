# Perfect Chat UI

Exploring concepts of ideal chat UIs for different purposes with zero dependency on any libs and a focus on incredible engagement and usability, regardless of the device used and screen size.

🔥 **This is the only repository that not only shows the perfect chat UI but also explains why each feature is needed and why it should work this way.**

- [Dedicated Agent Chat UI](https://ihorsha.github.io/chat-ui/dedicated-agent-chat-ui/index.html)
- [Multi-Agent Chat UI](https://ihorsha.github.io/chat-ui/multi-agent-chat-ui/index.html)

# Features

✅ **Agent Status Display** (available/unavailable) based on their work schedule and the user's local time

Why: Increases the number of user-initiated conversations. Allows the user to quickly determine when an agent is online in their local time, avoiding the need to manually convert the agent's schedule — especially useful when the user and agent are in different locations.

✅ **Focus on Important Details:** Shows the date and time only on the latest message and displays dates and times on older messages only when clicked

Why: Captures user attention on important information and fits more useful details on the screen. Users typically only need the date and time of the latest message, hiding older timestamps helps display more relevant information.

✅ **Relative Time** (e.g., today, yesterday) and hiding unnecessary details (e.g., showing only the time if the message was sent today)

Why: Helps users quickly focus on the message content without being distracted by its relevance, simplifying the process of matching the current day with the message date.

✅ **Quick Text Copying**

Why: Makes copying simple for all users. Clicking a button next to the message to copy it improves the user experience, especially on mobile devices. Traditional methods can be problematic, such as long-pressing on text, selecting the copy range, and pressing the system copy button. This is particularly challenging for people with health conditions or impairments.

✅ **Scroll Tracking and Scroll-to-Last-Message Button**

Why: Eliminates tedious scrolling in long, active conversations. Helps users quickly return to the latest message, significantly improving the user experience in chats with many or lengthy messages. Offsetting the button by 200px from the bottom helps to avoid it appearing too early, which does not affect user convenience and preserves useful space.

✅ **Auto-Growing of the Message Input** up to a certain limit as the user types

Why: Maximizes the use of available screen space, enhancing the ease of editing messages before sending.

✅ **Scroll to the Last Message When Opening Chat** and display it near the input field

Why: Focuses attention on the latest message and encourages the user to reply by placing it close to the input field.

✅ **Responsive Design and Cross-Browser Compatibility** regardless of screen size and chosen font size

Why: Ensures a convenient chat experience on any device and with any settings, including enabled accessibility features.

✅ **Dynamic 'Send Message' Button** as the message is typed

Why: Helps users quickly understand how the chat works by initially displaying the 'Send Message' button as disabled. This approach is particularly useful if the chat does not support sending audio/video messages.

✅ **Displaying Agent's Photo Based on Chat Type**

Why: Efficiently uses available screen space and focuses the user's attention on solving their issues.
In **Dedicated Agent Chat UI**, the photo is displayed in the chat header since the agent is the only participant and their messages are easily identifiable.
In **Multi-Agent Chat UI**, agents' photos are displayed next to their messages. For example, this works perfectly when a bot initially joins the chat to propose a solution, followed by 1st-line and 2nd-line support.

[  ] **Displaying Date as a Header for Message Groups** (soon)

[  ] **Automatic Scroll to First Unread Message** when opening chat (soon)

# Kudos

**Give this project a star** ⭐ if you like it!

Your support motivates its continued development and the sharing of more cool UX best practices.

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.
