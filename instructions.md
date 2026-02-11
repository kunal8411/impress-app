Build a production-ready, single-page Valentine’s web application using Next.js 14 (App Router), TypeScript, and Tailwind CSS.

The application must be emotionally engaging, playful, smooth, and fully responsive (desktop + mobile). Use only necessary libraries: canvas-confetti and optionally framer-motion for animations.

🎨 Initial Layout

Full-screen centered layout.

Animated soft pink-to-red gradient background with subtle floating hearts.

A centered rounded card with soft shadow and glassmorphism effect.

Above the heading, include a cute animated GIF placeholder (Peach & Goma or cute cat).

Heading (hardcoded personalization):
Shreyu, will you be my Valentine this year and all the years to come?

🟢 Buttons Behavior

Two buttons side-by-side:

1. Yes Button (Green)

Stays fixed.

Smooth scaling animation.

Grows slightly larger each time the user tries to hover or click the "No" button.

Text evolves progressively:

"Yes"

"Yes ❤️"

"Obviously Yes"

"YES!!!"

Add glow + subtle heartbeat animation.

2. No Button (Red)

On hover OR click:

Teleports to a random position inside viewport.

Must never leave visible bounds.

Must not create scrollbars.

Use smooth spring animation for movement.

🧠 Progressive Interaction Logic

Track number of “No” attempts.

After each attempt:

Show floating playful messages above the card:

"Are you sure?"

"Think carefully..."

"System error: Wrong choice detected"

"This button seems broken 🤔"

"Deploying love.exe..."

Slight card shake animation.

Slight increase in Yes button size.

🎉 Success State (When Yes is clicked)

Replace entire card content with:

Congratulations! You accepted the correct guy in your life.
Best decision ever! 💍✨


Then:

Trigger multi-burst confetti using canvas-confetti (3 seconds).

Change background to soft heart-pattern gradient.

Add subtle heartbeat animation.

Optional: mobile vibration support.

💖 After Celebration — Emotional Message Section(let her know that wait you have soimeting to read, till the time confetti ends )

After confetti ends, fade in a beautifully animated love message (line-by-line reveal):

Ever since you came into my life, everything feels brighter and more beautiful.
I’m incredibly grateful that you chose me as your life partner.
I promise you this — I’ll always be there for you, today, tomorrow, and forever.

My love for you grows stronger every single day. ❤️

Thank you for being by my side.
You are my dream girl, my happiness, and my favorite person.
Somehow, every day I fall for you all over again.

We’ve completed 2 years and 3 months since our wedding -
and these truly are the golden days of my life. ✨

I love you more than words, more than code, and more than coffee (and that says a lot 😄).
Thank you for everything. Always you. I love you moreeeeeeeeeeeee Shreyu ❤️.


Use elegant typography and smooth fade/slide animations.

😄 Add a Fun Interactive Ending

Below the message, add a playful button:

Button text:

Rate this proposal 😏


On click:

Show 5 star rating UI.

If less than 5 stars selected:

Show message: "System override: Only 5 stars accepted for lifetime partners 😌"

If 5 stars:

Trigger small heart confetti burst.

🎵 Optional Enhancements

Add music toggle button in top corner to play soft romantic instrumental.

Add subtle heart cursor trail on Yes button hover.

Add suspense loading animation before success:

"Processing your answer..."

"Calculating future together..."

🧩 Technical Requirements

Functional components only.

Clean state management with hooks.

No layout shift.

No scrollbars created by teleport logic.

Fully responsive.

Provide clean file structure.

Provide installation steps.

Deployment-ready for Vercel.

The final output must look polished, emotionally engaging, technically clean, and smooth — not childish or cluttered.