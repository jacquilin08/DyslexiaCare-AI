# Dragon Learn Path

# Build a Professional Frontend-Only Dyslexia Learning Game — “DyslexiaCare AI”

Create a complete, polished, responsive **frontend-only web application** called **DyslexiaCare AI** using strictly:

* HTML5
* CSS3
* Vanilla JavaScript
* LocalStorage for mock authentication and progress persistence
* Browser Web Speech API for voice input where supported
* Browser SpeechSynthesis API for text-to-speech where useful
* File/image input APIs for image-based questions
* Canvas/SVG/CSS/JavaScript animations where appropriate

**Do NOT create a backend.**

The application should feel like a **premium educational game inspired by the progression and engagement of Candy Crush**, but it must have its own original visual identity and must NOT copy Candy Crush assets, characters, branding, or exact UI.

The product should feel like a combination of:

> **Premium educational platform + fantasy adventure game + AI-powered dyslexia learning assistant**

The interface must be professional enough for a college hackathon/project demonstration.

---

# 1. CORE CONCEPT

The application is an interactive learning journey.

The student enters a fantasy learning world where each level contains **exactly 7 questions/challenges**.

The student must complete the 7 challenges successfully to unlock the next level.

The system adapts the questions according to the learner's performance using frontend JavaScript logic.

The core learning areas are:

* Letter recognition
* Letter confusion
* b/d discrimination
* p/q discrimination
* Phonics
* Pronunciation
* Spelling
* Vocabulary
* Reading
* Reading comprehension
* Writing
* Grammar
* Memory
* Cognitive skills
* Image recognition
* Voice-based answers

The application should visually communicate:

> **Learn → Practice → Complete Level → Hatch Dragon → Unlock Next Level → Grow Stronger**

---

# 2. APPLICATION STRUCTURE

Create these pages/views:

```text
Landing Page
      ↓
Login / Sign In
      ↓
Student Profile Setup
      ↓
Main Learning Map
      ↓
Level Selection
      ↓
Level Challenge
      ↓
7 Questions
      ↓
Level Result
      ↓
Dragon Egg Hatching Animation
      ↓
Dragon Growth Animation
      ↓
Next Level Unlocked
      ↓
Progress Dashboard
```

Also include:

```text
Student Profile
Progress Dashboard
Achievements
Daily Quests
AI Tutor
Accessibility Settings
Parent/Teacher Preview Dashboard
```

These can be implemented as frontend views using JavaScript rather than separate backend routes.

---

# 3. LANDING PAGE

Create a highly polished landing page.

Hero heading:

**Every learner has a different way of learning.**

Supporting text:

**DyslexiaCare AI turns reading practice into a personalized adventure where every challenge helps you grow.**

Primary CTA:

**Start Your Journey**

Secondary CTA:

**Explore Learning**

Hero visual:

Create an original fantasy educational scene:

* floating learning islands
* glowing path
* magical books
* friendly dragon
* dragon egg
* subtle particles
* stars
* level markers

Do not make it childish.

The visual style should be:

**premium + modern + friendly + magical**

---

# 4. LOGIN / SIGN UP

Create a beautiful authentication interface.

Tabs:

**Sign In**
**Create Account**

Sign In fields:

* Email
* Password
* Remember me
* Forgot password

Buttons:

**Sign In**

Create Account fields:

* Name
* Age
* Email
* Password
* Confirm Password

After registration, ask the learner to select:

### Learning Level

* Beginner
* Developing
* Confident

### Interests

* Animals
* Space
* Adventure
* Sports
* Fantasy
* Science
* Nature

Store these preferences in LocalStorage.

Use frontend mock authentication.

Example:

```javascript
localStorage.setItem("dyslexiaCareUser", JSON.stringify(user));
```

The authentication does not need to be secure because this is a frontend prototype.

---

# 5. STUDENT PROFILE SETUP

After first login, show:

## Build Your Learning Profile

Ask:

**What's your name?**

**How old are you?**

**What do you enjoy learning about?**

Allow multiple interests.

Then show:

### Choose Your Companion

Options:

* Dragon
* Fox
* Owl
* Rabbit

The selected companion should appear throughout the application.

---

# 6. MAIN DASHBOARD

The dashboard should immediately show the student's journey.

Header:

**Good morning, Alex 👋**

Subtitle:

**Your learning adventure continues.**

Top statistics:

```text
🔥 7 Day Streak

⭐ 1,240 XP

🏆 Level 6

💎 84 Coins
```

Main card:

## Continue Your Journey

Show:

**Level 6 — Word Explorer**

Progress:

```text
██████░░░░ 60%
```

Button:

**Continue Level**

Other cards:

### Today's Quest

Complete 3 spelling challenges.

### Learning Progress

Reading Accuracy: 87%

Spelling: 74%

Phonics: 82%

Vocabulary: 91%

### Recent Achievement

🏅 Perfect Reader

---

# 7. MAIN LEARNING MAP

This is one of the most important screens.

Create a large interactive fantasy map.

Do NOT create a normal dashboard grid.

The map should feel like a **level-based adventure game**.

Example progression:

```text
START
  │
  🥚 Level 1
      │
      🔤 Level 2
          │
          📖 Level 3
              │
              🎤 Level 4
                  │
                  ✍ Level 5
                      │
                      🐉 Level 6
                          │
                          ⭐ Level 7
```

Create around **15 levels**.

Each level should have:

* Level number
* Skill name
* difficulty
* XP reward
* locked/unlocked/completed state

States:

### Locked

Darkened level icon + lock.

### Available

Glowing animated border.

### Completed

Checkmark + stars.

### Current

Large glowing level marker.

The path should visually connect levels.

Use SVG or CSS for the path.

---

# 8. LEVEL SYSTEM

Each level contains:

## EXACTLY 7 QUESTIONS

Display a top progress indicator:

```text
Question 3 / 7

● ● ● ○ ○ ○ ○
```

Also show:

```text
❤️❤️❤️
⭐ 120 XP
```

The player gets 3 lives.

Incorrect answers reduce one life.

Correct answers provide XP.

Do NOT make the game overly punishing.

---

# 9. QUESTION TYPES

Create multiple reusable question components.

The JavaScript should randomly select questions from predefined question banks.

Include:

### TYPE 1 — Letter Recognition

Show:

**Which letter is this?**

Large:

**b**

Options:

```text
b
d
p
q
```

---

### TYPE 2 — B/D CONFUSION

Show:

**Which word starts with “b”?**

Images or words:

```text
ball
dog
pig
queen
```

---

### TYPE 3 — P/Q CONFUSION

Question:

**Select the word beginning with “q”.**

Options:

```text
queen
pen
pig
park
```

---

### TYPE 4 — PHONICS

Show:

**What sound does “sh” make?**

Allow:

* text answer
* voice answer

---

### TYPE 5 — SPELLING

Play audio:

🔊

**“Butterfly”**

Student types the word.

Provide encouraging feedback.

Correct:

> Excellent! You got it! ⭐

Incorrect:

> Almost there! Let's try this word again. 💪

Never use harsh language such as:

> Wrong!

---

# 10. VOICE INPUT

Implement voice input using the browser Web Speech API.

Add a microphone button:

🎤 **Speak Answer**

When clicked:

```text
Listening...
```

Animate the microphone.

Convert speech to text.

Display:

```text
You said:

butterfly
```

Compare the result against the expected answer.

Handle cases where browser speech recognition is unavailable gracefully.

Show:

> Voice input is not supported in this browser. You can type your answer instead.

Do not require any API key.

---

# 11. IMAGE INPUT QUESTIONS

Create questions where the student can upload an image.

Example:

## Upload the picture containing the letter “b”

Show:

**Choose an image**

Allow:

```html
<input type="file" accept="image/*">
```

Show image preview.

For this frontend prototype, use simulated/mock image analysis using JavaScript.

Do NOT claim actual AI computer vision is being performed.

Create a realistic UI that displays:

> Image analyzed

> Possible match detected

For demonstration, the result can be generated from mock data.

---

# 12. B/D TEST

Create a dedicated **B/D Confusion Challenge**.

Title:

# Letter Detective

Subtitle:

**Can you tell b from d?**

Display multiple challenges.

Examples:

```text
bat
dog
bed
duck
ball
door
```

Ask the student to identify whether the highlighted letter is:

```text
B
D
```

Use large typography.

Make this visually engaging.

Add subtle animation when the correct answer is selected.

---

# 13. WRITING COACH

Create writing challenges.

Example:

### Type the word you hear

🔊

**“Garden”**

Student enters:

```text
garden
```

Analyze:

* spelling
* missing letters
* extra letters
* repeated letters

Also include simulated:

### Letter reversal detection

Example:

Student enters:

```text
god
```

Expected:

```text
dog
```

Show:

> Letter order looks different. Let's practice this word again.

Do not diagnose dyslexia from this.

---

# 14. GRAMMAR CHALLENGES

Example:

### Choose the correct sentence

```text
A. She go to school.
B. She goes to school.
C. She going school.
```

Correct answer:

B

Give XP.

---

# 15. VOCABULARY MODULE

Show an image/word.

Example:

🐘

Question:

**What is this?**

Options:

```text
Elephant
Horse
Tiger
Rabbit
```

Include pronunciation button:

🔊 Listen

---

# 16. GUIDED STORY READING

Create a story-reading level.

Show a short story.

Example:

> Mia found a tiny dragon egg near the forest. The egg began to glow when she touched it.

Allow:

### Read Myself

### Listen

### Read With Me

When the student presses play:

* Highlight each sentence
* Use text-to-speech
* Animate the current line

Then ask comprehension questions.

---

# 17. TEXT-TO-SPEECH

Use browser SpeechSynthesis.

Provide:

* Play
* Pause
* Replay
* Speed selector

Speed options:

```text
0.75x
1x
1.25x
1.5x
```

Highlight the current sentence while reading.

---

# 18. AI TEXT SIMPLIFIER UI

Create a frontend-only text simplification tool.

Title:

## Make It Easier to Understand

Allow:

* Paste text
* Upload text/PDF mock interface

Slider:

```text
Simple ───────●────── Advanced
```

Levels:

```text
Level 1 — Very Simple
Level 2 — Simple
Level 3 — Standard
Level 4 — Detailed
Level 5 — Advanced
```

Since this is frontend-only, use predefined/mock transformation examples.

Do not call an external AI API.

---

# 19. AI-GENERATED STORY UI

Create:

## Create Your Story

Inputs:

### Age

### Reading Level

### Interest

### Story Length

Button:

**Create My Story ✨**

Generate stories from predefined JavaScript templates.

Example:

```javascript
const stories = {
  space: [...],
  animals: [...],
  fantasy: [...],
  adventure: [...]
};
```

The interface should make it feel like an AI feature even though the prototype uses local mock data.

---

# 20. AI READING COACH

After a reading challenge, show:

# Your Reading Coach

Cards:

```text
Reading Accuracy
87%

Reading Speed
61 WPM

Words Practiced
24

Comprehension
92%
```

Then:

### Coach Feedback

> Great progress! You recognized most words accurately. Let's practice a few longer words next.

Then:

### Recommended Practice

```text
🔤 Multi-syllable words
🎤 Pronunciation practice
📖 Guided reading
```

---

# 21. PERSONALIZED LEARNING PATH

Use frontend JavaScript to calculate a simple Learning Fingerprint.

Example:

```text
Reading Fluency       68%
Spelling              54%
Phonics               76%
Vocabulary            88%
Comprehension         82%
```

Determine the weakest area.

Then recommend the next level.

Example:

```javascript
if (spelling < 60) {
   recommendation = "Spelling Practice";
}
```

Show:

# Your Learning Fingerprint

Use a radar chart or visually attractive skill chart.

Then:

> Your next recommended lesson is **Spelling Challenge**.

---

# 22. DRAGON LEVEL COMPLETION ANIMATION

THIS IS A MAJOR FEATURE.

When the student successfully completes all 7 questions:

Trigger a full-screen celebration.

Sequence:

### Stage 1

Dark magical background.

A glowing dragon egg appears in the center.

Text:

> **Level Complete!**

Then:

> **Something is awakening...**

---

### Stage 2

The egg starts shaking.

Use:

* CSS animation
* particle effects
* glowing cracks
* screen shake
* magical particles

---

### Stage 3

Cracks appear on the egg.

Text:

> **A new companion is hatching...**

---

### Stage 4

Egg breaks open.

Show a small baby dragon.

---

### Stage 5

The dragon grows.

Animate:

```text
Tiny Dragon
      ↓
Young Dragon
      ↓
Large Dragon
```

Use CSS transform/scale or SVG animation.

---

### Stage 6

Dragon flies upward.

Show:

# LEVEL COMPLETE

### +250 XP

### +30 Coins

### ⭐⭐⭐

Then:

> **Level 7 Unlocked**

Button:

**Continue Adventure**

The animation should feel magical and cinematic.

---

# 23. DRAGON GROWTH SYSTEM

Each completed milestone grows the dragon.

Example:

```text
Level 1
🥚 Egg

Level 3
🐣 Baby Dragon

Level 5
🐲 Young Dragon

Level 8
🐉 Adult Dragon

Level 12
🔥 Powerful Dragon
```

Store the dragon stage in LocalStorage.

---

# 24. GAMIFICATION

Implement:

### XP

Correct answer:

```text
+20 XP
```

Perfect level:

```text
+150 bonus XP
```

Daily quest:

```text
+50 XP
```

---

### Coins

Use coins to unlock:

* Dragon accessories
* Themes
* Avatar items

---

### Streak

Display:

```text
🔥 7 Day Streak
```

Use LocalStorage.

---

### Badges

Create:

```text
🏅 First Step
🔤 Letter Master
🎤 Brave Reader
📖 Story Explorer
✍ Spelling Star
🔥 7 Day Streak
🐉 Dragon Keeper
⭐ Perfect Level
```

---

# 25. DAILY QUESTS

Create 3 daily quests.

Example:

```text
☐ Complete 1 reading lesson
☐ Practice 10 words
☐ Finish 1 spelling challenge
```

Progress:

```text
2 / 3 completed
```

Reward:

```text
+100 XP
```

---

# 26. PROGRESS DASHBOARD

Create a professional analytics dashboard.

Show:

### Overall Progress

Circular progress:

**72%**

### Skill Progress

```text
Reading        ████████░░ 82%
Spelling       ██████░░░░ 64%
Phonics        ████████░░ 78%
Vocabulary     █████████░ 91%
Grammar        ███████░░░ 71%
```

### Weekly Activity

Create a clean chart using CSS/SVG/Canvas or vanilla JS.

### Improvement

Show:

```text
Reading Accuracy
74% → 87%

+13%
```

---

# 27. PARENT DASHBOARD

Create a frontend-only parent dashboard.

Show:

```text
Student Progress

Reading Accuracy      87%
Spelling              74%
Phonics               82%

Weekly Practice       4h 20m

Current Level         6

Current Streak        7 days
```

Show encouraging insights:

> Reading accuracy has improved this week.

> Spelling practice is the current recommended focus.

Do not display medical diagnoses.

---

# 28. TEACHER DASHBOARD

Create:

## Classroom Overview

Cards:

```text
Students       28
Active         24
Improving      21
Needs Support   7
```

Student table:

```text
Student
Level
Reading
Spelling
Progress
Status
```

Clicking a student opens a detailed learning profile.

Teacher can view:

* skill progress
* completed levels
* recommended activities
* reading accuracy
* spelling performance
* practice frequency

No backend is required.

Use mock student data.

---

# 29. ACCESSIBILITY SETTINGS

Create a settings panel.

Controls:

### Font Size

Small / Medium / Large / Extra Large

### Letter Spacing

Adjustable slider.

### Line Height

Adjustable slider.

### Reading Speed

0.75x / 1x / 1.25x / 1.5x

### Theme

* Light
* Warm
* High Contrast
* Dark

### Focus Mode

Remove unnecessary UI elements.

Save settings to LocalStorage.

---

# 30. FRIENDLY ERROR FEEDBACK

Never show:

❌ Wrong answer.

Instead:

### Incorrect

> Almost there! Let's look at this one again.

For spelling:

> You're close! Check the middle letters.

For reading:

> Nice attempt! Let's practice this word once more.

For success:

> Amazing work! ⭐

> You got it!

> Your dragon is getting stronger! 🐉

---

# 31. RESPONSIVE DESIGN

The application MUST work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

Use:

```css
@media
```

Breakpoints.

The learning game should remain usable on smaller screens.

---

# 32. VISUAL DESIGN SYSTEM

DO NOT use:

* Glassmorphism
* Excessive gradients
* Neon cyberpunk styling
* Generic Bootstrap appearance
* Excessive shadows
* Huge rounded cards everywhere
* Cheap-looking cartoon graphics

Use:

### Visual direction

**Premium fantasy education**

Use:

* warm off-white backgrounds
* deep readable text
* one primary accent
* subtle secondary colors
* elegant cards
* clean typography
* soft shadows
* tasteful rounded corners
* magical effects only where appropriate

Typography should prioritize readability.

Use a professional font such as:

**Inter**

or

**Nunito Sans**

for UI.

For learning content, use highly readable typography.

---

# 33. ANIMATIONS

Use animations carefully.

Include:

* page transitions
* level marker glow
* XP counter animation
* progress bar animation
* correct answer celebration
* incorrect answer shake
* microphone pulse
* story word highlighting
* dragon egg shaking
* egg cracking
* dragon growth
* dragon flying
* level unlock celebration

Animations should feel smooth and premium.

Avoid excessive animation during questions because students need concentration.

---

# 34. SOUND EFFECTS

Use optional browser audio.

Include subtle sounds for:

* correct answer
* level completion
* XP gained
* badge unlocked
* egg cracking
* dragon transformation

Provide:

**🔊 Sound On/Off**

Do not autoplay sound without user interaction.

---

# 35. DATA STORAGE

Use LocalStorage for:

```text
user
currentLevel
completedLevels
xp
coins
streak
badges
dragonStage
learningFingerprint
settings
dailyQuests
questionProgress
```

The application should remember the user's progress after page refresh.

---

# 36. QUESTION ENGINE

Create a reusable JavaScript question system.

Each question should have a structure similar to:

```javascript
{
    id: 1,
    type: "multiple-choice",
    category: "letter-recognition",
    question: "Which letter is shown?",
    content: "b",
    options: ["b", "d", "p", "q"],
    answer: "b",
    xp: 20
}
```

Support:

```text
multiple-choice
text-input
voice-input
image-input
phonics
spelling
reading
comprehension
grammar
letter-confusion
```

Each level should contain exactly 7 questions.

---

# 37. LEVEL DIFFICULTY

Create gradual difficulty.

### Level 1

Letter recognition

### Level 2

b/d confusion

### Level 3

p/q confusion

### Level 4

Phonics

### Level 5

Simple spelling

### Level 6

Vocabulary

### Level 7

Word reading

### Level 8

Sentence building

### Level 9

Grammar

### Level 10

Reading comprehension

### Level 11

Guided reading

### Level 12

Advanced spelling

### Level 13

Mixed challenge

### Level 14

Reading fluency

### Level 15

Final Dragon Challenge

Every level must contain 7 questions.

---

# 38. FINAL DRAGON CHALLENGE

Create a special final level.

Title:

# The Dragon's Library

The student completes 7 mixed challenges:

1. Letter recognition
2. b/d test
3. Phonics
4. Spelling
5. Voice reading
6. Image question
7. Comprehension

After completion:

Trigger the largest dragon evolution animation.

The dragon transforms into its final form.

Display:

# YOU DID IT!

Then show:

```text
Learning Journey Complete

Levels Completed: 15/15
Questions Completed: 105
XP Earned: 3,450
Badges: 8
Reading Accuracy: 92%
```

---

# 39. CODE ORGANIZATION

Create a clean project structure:

```text
dyslexiacare-ai/
│
├── index.html
├── login.html
├── dashboard.html
├── learning-map.html
├── level.html
├── progress.html
├── profile.html
├── settings.html
├── parent.html
├── teacher.html
│
├── css/
│   ├── global.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── map.css
│   ├── level.css
│   ├── animation.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── levels.js
│   ├── questions.js
│   ├── game.js
│   ├── progress.js
│   ├── speech.js
│   ├── accessibility.js
│   ├── dragon.js
│   ├── gamification.js
│   └── storage.js
│
└── assets/
    ├── icons/
    ├── illustrations/
    ├── sounds/
    └── dragons/
```

If external images are unavailable, create the important visuals with CSS/SVG instead of leaving broken image placeholders.

---

# 40. IMPORTANT FRONTEND DEMO REQUIREMENT

The entire project must work by simply opening the frontend or running it with a basic local server.

There should be NO:

```text
API key
backend server
database
environment variables
authentication service
external AI dependency
```

Everything should be simulated locally.

Where real browser capabilities are available, use:

* Web Speech API
* SpeechSynthesis
* FileReader
* LocalStorage
* Canvas
* SVG

---

# 41. DO NOT CREATE FAKE AI CLAIMS

The interface may contain labels such as:

**AI Reading Coach**

**AI Learning Recommendation**

**AI Text Simplifier**

but make it clear in the project code that these are frontend prototype/mock implementations.

Do not falsely claim that a real machine-learning model is running in the browser.

For example:

```javascript
// Prototype recommendation engine.
// Replace with trained ML/API model in production.
```

---

# 42. MOST IMPORTANT UX FLOW

Make this flow exceptionally polished:

```text
Login
 ↓
Dashboard
 ↓
Learning Map
 ↓
Select Level
 ↓
Level Intro
 ↓
Question 1
 ↓
Question 2
 ↓
Question 3
 ↓
Question 4
 ↓
Question 5
 ↓
Question 6
 ↓
Question 7
 ↓
LEVEL COMPLETE
 ↓
XP REWARD
 ↓
DRAGON EGG
 ↓
EGG SHAKES
 ↓
CRACKS APPEAR
 ↓
EGG BREAKS
 ↓
BABY DRAGON
 ↓
DRAGON GROWS
 ↓
LEVEL UNLOCKED
 ↓
Continue Journey
```

This should be the **hero demonstration flow** of the entire application.

---

# 43. FINAL QUALITY REQUIREMENT

Do not produce a basic student project UI.

It must look like a **real startup product prototype**.

The final result should feel:

**Professional**
**Accessible**
**Interactive**
**Educational**
**Gamified**
**Modern**
**Original**
**Demo-ready**

Every button should have a meaningful interaction.

Every page should feel connected.

Do not leave empty placeholder sections.

Do not create fake buttons that do nothing.

Use mock data wherever backend functionality would normally be required.

Make the UI visually consistent across the entire application.

The primary focus should be the **level-by-level learning map and 7-question challenge system**, with the **dragon egg → baby dragon → growing dragon animation** as the signature reward experience.

Build the complete frontend now....https://ignite-learning-adventures.lovable.app i want something like this but i should look professional and very interestng modern ui

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dyslexi-magic.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c9e7b776-2db6-45d7-84c4-4f0d45d73852).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
