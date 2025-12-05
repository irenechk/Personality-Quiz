import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "You're at a crowded party. Where are you likely to be found?",
    imageKeyword: "crowded party dark cinematic",
    options: [
      { value: "center", label: "In the center of the room, telling stories.", reaction: "Commanding the room." },
      { value: "corner", label: "In a quiet corner, observing or talking to one person.", reaction: "Low-key and observant." },
      { value: "kitchen", label: "Helping the host or organizing the drinks.", reaction: "Keeping things running." },
      { value: "exit", label: "Planning my escape to go home and read.", reaction: "Recharging solo." }
    ]
  },
  {
    id: 2,
    text: "A sudden crisis occurs at work. What is your immediate reaction?",
    imageKeyword: "office crisis dramatic lighting",
    options: [
      { value: "panic", label: "Feel overwhelmed but try to hide it.", reaction: "Keeping composure." },
      { value: "action", label: "Immediately take charge and delegate tasks.", reaction: "Taking charge." },
      { value: "analyze", label: "Step back to analyze the root cause before acting.", reaction: "Analyzing the situation." },
      { value: "support", label: "Check on others to ensure everyone is okay.", reaction: "Looking out for the team." }
    ]
  },
  {
    id: 3,
    text: "When making a major life decision, you rely mostly on:",
    imageKeyword: "crossroads mystery fog",
    options: [
      { value: "logic", label: "Cold, hard facts and pros/cons lists.", reaction: "Pure logic." },
      { value: "gut", label: "My intuition and how it feels right now.", reaction: "Trusting intuition." },
      { value: "advice", label: "The opinions of people I trust.", reaction: "Seeking perspective." },
      { value: "values", label: "Whether it aligns with my moral compass.", reaction: "Sticking to values." }
    ]
  },
  {
    id: 4,
    text: "Which flaw do you tolerate least in others?",
    imageKeyword: "angry face shadow",
    options: [
      { value: "incompetence", label: "Incompetence and laziness.", reaction: "Demanding excellence." },
      { value: "cruelty", label: "Cruelty or lack of empathy.", reaction: "Valuing kindness." },
      { value: "dishonesty", label: "Dishonesty and manipulation.", reaction: "Valuing authenticity." },
      { value: "chaos", label: "Unpredictability and flakiness.", reaction: "Maintaining peace." }
    ]
  },
  {
    id: 5,
    text: "Your ideal weekend looks like:",
    imageKeyword: "relaxing dark cabin",
    options: [
      { value: "adventure", label: "Skydiving, hiking, or exploring a new city.", reaction: "Seeking adventure." },
      { value: "relax", label: "Netflix, snacks, and absolutely zero alarm clocks.", reaction: "Total relaxation." },
      { value: "social", label: "Dinner parties, clubbing, or meeting friends.", reaction: "Living it up." },
      { value: "creative", label: "Working on a passion project or hobby.", reaction: "In the creative zone." }
    ]
  },
  {
    id: 6,
    text: "How do you handle conflict?",
    imageKeyword: "argument tension cinematic",
    options: [
      { value: "win", label: "I argue to win. I know I'm usually right.", reaction: "Confident stance." },
      { value: "avoid", label: "I withdraw to avoid the drama.", reaction: "Avoiding conflict." },
      { value: "mediate", label: "I try to find a compromise that makes everyone happy.", reaction: "Finding compromise." },
      { value: "discuss", label: "I want to talk it out until we reach a deep understanding.", reaction: "Seeking understanding." }
    ]
  },
  {
    id: 7,
    text: "What drives you the most?",
    imageKeyword: "ambition mountain peak dark",
    options: [
      { value: "power", label: "Success, status, and influence.", reaction: "Driven by success." },
      { value: "connection", label: "Deep relationships and love.", reaction: "Driven by connection." },
      { value: "knowledge", label: "Understanding how the world works.", reaction: "Driven by curiosity." },
      { value: "peace", label: "Stability and a stress-free life.", reaction: "Driven by peace." }
    ]
  },
  {
    id: 8,
    text: "You see someone dropping a wallet. You:",
    imageKeyword: "lost wallet street night",
    options: [
      { value: "return", label: "Run after them immediately to return it.", reaction: "Immediate action." },
      { value: "check", label: "Check the ID to find them on social media later.", reaction: "Investigating first." },
      { value: "ignore", label: "Assume someone else will handle it.", reaction: "Not my problem." },
      { value: "police", label: "Turn it into the nearest authority.", reaction: "Following protocol." }
    ]
  },
  {
    id: 9,
    text: "Your workspace is usually:",
    imageKeyword: "office desk noir style",
    options: [
      { value: "messy", label: "Chaotic. I know where everything is, though.", reaction: "Organized chaos." },
      { value: "minimal", label: "Spotless. A clear desk is a clear mind.", reaction: "Clean and minimal." },
      { value: "decorated", label: "Full of personal items and photos.", reaction: "Personal and cozy." },
      { value: "functional", label: "Organized strictly by utility.", reaction: "Purely functional." }
    ]
  },
  {
    id: 10,
    text: "In a movie, which role would you play?",
    imageKeyword: "movie set spotlight dark",
    options: [
      { value: "hero", label: "The Hero who saves the day.", reaction: "The Hero." },
      { value: "villain", label: "The Misunderstood Villain with a point.", reaction: "The Complex Villain." },
      { value: "sidekick", label: "The Loyal Friend who provides comic relief.", reaction: "The Loyal Friend." },
      { value: "mastermind", label: "The Mastermind pulling the strings behind the scenes.", reaction: "The Mastermind." }
    ]
  },
  {
    id: 11,
    text: "If you could have one superpower, what would it be?",
    imageKeyword: "magic power glowing hand dark",
    options: [
      { value: "invisibility", label: "Invisibility, to observe without being seen.", reaction: "Unseen observer." },
      { value: "flight", label: "Flight, to feel ultimate freedom.", reaction: "Limitless freedom." },
      { value: "mindreading", label: "Mind reading, to know the truth.", reaction: "Knowing the truth." },
      { value: "time", label: "Time travel, to fix past mistakes.", reaction: "Changing the past." }
    ]
  },
  {
    id: 12,
    text: "What is your biggest fear?",
    imageKeyword: "fear nightmare dark shadow",
    options: [
      { value: "failure", label: "Failing to achieve my potential.", reaction: "Fear of falling short." },
      { value: "alone", label: "Being completely alone and forgotten.", reaction: "Fear of isolation." },
      { value: "helpless", label: "Losing control of my circumstances.", reaction: "Fear of helplessness." },
      { value: "boredom", label: "Living a mundane, repetitive life.", reaction: "Fear of boredom." }
    ]
  },
  {
    id: 13,
    text: "How do you recharge after a long day?",
    imageKeyword: "solitude rain window night",
    options: [
      { value: "sleep", label: "Going straight to bed.", reaction: "Resting up." },
      { value: "exercise", label: "A high-intensity workout.", reaction: "Working it out." },
      { value: "create", label: "Writing, drawing, or building something.", reaction: "Creating art." },
      { value: "consume", label: "Binge-watching shows or gaming.", reaction: "Digital downtime." }
    ]
  },
  {
    id: 14,
    text: "You find a mysterious door in your house. What do you do?",
    imageKeyword: "mysterious door dark corridor",
    options: [
      { value: "open", label: "Open it immediately. Curiosity wins.", reaction: "Embracing curiosity." },
      { value: "lock", label: "Lock it and pretend it doesn't exist.", reaction: "Better safe than sorry." },
      { value: "investigate", label: "Research the house history first.", reaction: "Knowledge is power." },
      { value: "weapon", label: "Grab a weapon, then open it cautiously.", reaction: "Prepared for danger." }
    ]
  },
  {
    id: 15,
    text: "Which genre of movie fits your life best?",
    imageKeyword: "cinema screen projector beam",
    options: [
      { value: "drama", label: "A serious Drama about human connection.", reaction: "Human connection." },
      { value: "thriller", label: "A psychological Thriller full of twists.", reaction: "Thrills and twists." },
      { value: "comedy", label: "A Comedy, because you have to laugh at life.", reaction: "Laughter is key." },
      { value: "scifi", label: "Sci-Fi, looking towards the future.", reaction: "Looking ahead." }
    ]
  },
  {
    id: 16,
    text: "Someone insults you publicly. You:",
    imageKeyword: "spotlight shame dark crowd",
    options: [
      { value: "roast", label: "Roast them back instantly and wittily.", reaction: "Quick comeback." },
      { value: "ignore", label: "Ignore them completely; they are beneath me.", reaction: "Rising above." },
      { value: "cry", label: "Feel hurt and dwell on it later.", reaction: "Feeling the hurt." },
      { value: "calm", label: "Calmly ask them to explain themselves.", reaction: "Keeping calm." }
    ]
  },
  {
    id: 17,
    text: "What is your relationship with rules?",
    imageKeyword: "prison bars or open field contrast",
    options: [
      { value: "follow", label: "They exist for a reason and keep order.", reaction: "Respecting rules." },
      { value: "bend", label: "They are guidelines, meant to be bent.", reaction: "Bending the lines." },
      { value: "break", label: "I break them if they get in my way.", reaction: "Breaking barriers." },
      { value: "make", label: "I prefer to make the rules.", reaction: "Making the rules." }
    ]
  },
  {
    id: 18,
    text: "You win the lottery. First purchase?",
    imageKeyword: "gold coins dark treasure",
    options: [
      { value: "investment", label: "Invest it all for generational wealth.", reaction: "Thinking ahead." },
      { value: "island", label: "A private island to get away from everyone.", reaction: "Ultimate escape." },
      { value: "charity", label: "Donate a huge chunk to a cause I love.", reaction: "Giving back." },
      { value: "party", label: "Throw the biggest party the world has ever seen.", reaction: "Epic celebration." }
    ]
  },
  {
    id: 19,
    text: "What quality do you value most in a leader?",
    imageKeyword: "chess king piece dark",
    options: [
      { value: "vision", label: "Vision and inspiration.", reaction: "Vision." },
      { value: "empathy", label: "Empathy and care for their people.", reaction: "Empathy." },
      { value: "strength", label: "Strength and decisiveness.", reaction: "Strength." },
      { value: "intelligence", label: "Pure tactical intelligence.", reaction: "Intellect." }
    ]
  },
  {
    id: 20,
    text: "The apocalypse starts. Your role is:",
    imageKeyword: "apocalypse ruins fire dark",
    options: [
      { value: "leader", label: "Leader of the survivors.", reaction: "Leading the way." },
      { value: "scavenger", label: "The lone wolf scavenger.", reaction: "Going it alone." },
      { value: "medic", label: "The healer/medic.", reaction: "Helping others." },
      { value: "first", label: "Honestly, the first to go.", reaction: "Unlikely to last." }
    ]
  }
];