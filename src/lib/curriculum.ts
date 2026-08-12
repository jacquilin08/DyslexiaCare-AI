/**
 * Question banks + 15-level curriculum.
 * Every level serves EXACTLY 7 questions, drawn from its bank with light shuffling.
 */
import type { Fingerprint } from "./store";

export type QuestionType =
  | "multiple-choice"
  | "letter-confusion"
  | "phonics"
  | "spelling"
  | "grammar"
  | "reading"
  | "comprehension"
  | "voice-input"
  | "image-input";

export type Question = {
  id: string;
  type: QuestionType;
  category: string;
  question: string;
  content?: string;
  helper?: string;
  options?: string[];
  answer: string;
  accepts?: string[];
  story?: string;
  xp: number;
};

export type Level = {
  id: number;
  title: string;
  skill: string;
  difficulty: "Gentle" | "Steady" | "Challenging" | "Mastery";
  xpReward: number;
  skillKey: keyof Fingerprint;
  blurb: string;
};

export const LEVELS: Level[] = [
  { id: 1, title: "Letter Meadow", skill: "Letter recognition", difficulty: "Gentle", xpReward: 140, skillKey: "reading", blurb: "Meet the letters and learn their shapes." },
  { id: 2, title: "Letter Detective", skill: "b / d discrimination", difficulty: "Gentle", xpReward: 160, skillKey: "reading", blurb: "Can you tell b from d?" },
  { id: 3, title: "Quiet Quarry", skill: "p / q discrimination", difficulty: "Gentle", xpReward: 160, skillKey: "reading", blurb: "Spot the tails that face the other way." },
  { id: 4, title: "Sound Springs", skill: "Phonics", difficulty: "Steady", xpReward: 180, skillKey: "phonics", blurb: "Blend sounds into words." },
  { id: 5, title: "Ink Harbour", skill: "Simple spelling", difficulty: "Steady", xpReward: 190, skillKey: "spelling", blurb: "Hear the word, then write it." },
  { id: 6, title: "Word Explorer", skill: "Vocabulary", difficulty: "Steady", xpReward: 200, skillKey: "vocabulary", blurb: "Grow your word collection." },
  { id: 7, title: "Reading Ridge", skill: "Word reading", difficulty: "Steady", xpReward: 210, skillKey: "reading", blurb: "Read words aloud with confidence." },
  { id: 8, title: "Sentence Bridge", skill: "Sentence building", difficulty: "Challenging", xpReward: 220, skillKey: "comprehension", blurb: "Put words in the right order." },
  { id: 9, title: "Grammar Gardens", skill: "Grammar", difficulty: "Challenging", xpReward: 230, skillKey: "comprehension", blurb: "Choose sentences that sound right." },
  { id: 10, title: "Story Hollow", skill: "Reading comprehension", difficulty: "Challenging", xpReward: 240, skillKey: "comprehension", blurb: "Read a story and answer questions." },
  { id: 11, title: "Guided Grove", skill: "Guided reading", difficulty: "Challenging", xpReward: 250, skillKey: "reading", blurb: "Read along with your companion." },
  { id: 12, title: "Spellbound Peaks", skill: "Advanced spelling", difficulty: "Mastery", xpReward: 260, skillKey: "spelling", blurb: "Longer words, steady steps." },
  { id: 13, title: "Mixed Trials", skill: "Mixed challenge", difficulty: "Mastery", xpReward: 270, skillKey: "vocabulary", blurb: "Everything you have learned." },
  { id: 14, title: "Fluency Falls", skill: "Reading fluency", difficulty: "Mastery", xpReward: 280, skillKey: "reading", blurb: "Read smoothly and steadily." },
  { id: 15, title: "The Dragon's Library", skill: "Final dragon challenge", difficulty: "Mastery", xpReward: 320, skillKey: "comprehension", blurb: "Seven trials guard the last page." },
];

const q = (x: Question) => x;

const letterRecognition: Question[] = [
  q({ id: "lr1", type: "multiple-choice", category: "letter-recognition", question: "Which letter is this?", content: "b", options: ["b", "d", "p", "q"], answer: "b", xp: 20 }),
  q({ id: "lr2", type: "multiple-choice", category: "letter-recognition", question: "Which letter is this?", content: "d", options: ["p", "d", "b", "g"], answer: "d", xp: 20 }),
  q({ id: "lr3", type: "multiple-choice", category: "letter-recognition", question: "Which letter is this?", content: "m", options: ["n", "w", "m", "h"], answer: "m", xp: 20 }),
  q({ id: "lr4", type: "multiple-choice", category: "letter-recognition", question: "Which letter makes the /s/ sound?", content: "?", options: ["s", "z", "c", "f"], answer: "s", xp: 20 }),
  q({ id: "lr5", type: "multiple-choice", category: "letter-recognition", question: "Which letter is this?", content: "q", options: ["g", "p", "q", "j"], answer: "q", xp: 20 }),
  q({ id: "lr6", type: "letter-confusion", category: "letter-recognition", question: "Is the highlighted letter a B or a D?", content: "bed", helper: "Look at the first letter.", options: ["B", "D"], answer: "B", xp: 20 }),
  q({ id: "lr7", type: "multiple-choice", category: "letter-recognition", question: "Which letter comes after 'k'?", content: "k → ?", options: ["j", "l", "m", "i"], answer: "l", xp: 20 }),
  q({ id: "lr8", type: "voice-input", category: "pronunciation", question: "Say the letter shown out loud.", content: "f", answer: "f", accepts: ["ef", "eff"], xp: 25 }),
];

const bdBank: Question[] = [
  q({ id: "bd1", type: "multiple-choice", category: "b-d", question: "Which word starts with the letter b?", options: ["ball", "dog", "pig", "queen"], answer: "ball", xp: 20 }),
  q({ id: "bd2", type: "letter-confusion", category: "b-d", question: "Is the first letter of this word a B or a D?", content: "duck", options: ["B", "D"], answer: "D", xp: 20 }),
  q({ id: "bd3", type: "letter-confusion", category: "b-d", question: "Is the first letter of this word a B or a D?", content: "bat", options: ["B", "D"], answer: "B", xp: 20 }),
  q({ id: "bd4", type: "multiple-choice", category: "b-d", question: "Which word starts with the letter d?", options: ["door", "bed", "bus", "pan"], answer: "door", xp: 20 }),
  q({ id: "bd5", type: "letter-confusion", category: "b-d", question: "Is the first letter of this word a B or a D?", content: "desk", options: ["B", "D"], answer: "D", xp: 20 }),
  q({ id: "bd6", type: "spelling", category: "b-d", question: "Type the word you hear.", content: "bed", answer: "bed", xp: 25 }),
  q({ id: "bd7", type: "image-input", category: "image-recognition", question: "Upload a picture of something starting with the letter b.", content: "b", answer: "b", xp: 25 }),
  q({ id: "bd8", type: "letter-confusion", category: "b-d", question: "Is the first letter of this word a B or a D?", content: "ball", options: ["B", "D"], answer: "B", xp: 20 }),
];

const pqBank: Question[] = [
  q({ id: "pq1", type: "multiple-choice", category: "p-q", question: "Select the word beginning with q.", options: ["queen", "pen", "pig", "park"], answer: "queen", xp: 20 }),
  q({ id: "pq2", type: "letter-confusion", category: "p-q", question: "Is the first letter a P or a Q?", content: "quilt", options: ["P", "Q"], answer: "Q", xp: 20 }),
  q({ id: "pq3", type: "letter-confusion", category: "p-q", question: "Is the first letter a P or a Q?", content: "panda", options: ["P", "Q"], answer: "P", xp: 20 }),
  q({ id: "pq4", type: "multiple-choice", category: "p-q", question: "Which word begins with p?", options: ["quiz", "quick", "puzzle", "queue"], answer: "puzzle", xp: 20 }),
  q({ id: "pq5", type: "spelling", category: "p-q", question: "Type the word you hear.", content: "quiet", answer: "quiet", xp: 25 }),
  q({ id: "pq6", type: "letter-confusion", category: "p-q", question: "Is the first letter a P or a Q?", content: "quest", options: ["P", "Q"], answer: "Q", xp: 20 }),
  q({ id: "pq7", type: "voice-input", category: "pronunciation", question: "Say this word out loud.", content: "queen", answer: "queen", xp: 25 }),
  q({ id: "pq8", type: "multiple-choice", category: "p-q", question: "Which letter has a tail on the right side?", content: "p  q", options: ["q", "p"], answer: "q", xp: 20 }),
];

const phonicsBank: Question[] = [
  q({ id: "ph1", type: "phonics", category: "phonics", question: 'What sound does "sh" make?', content: "sh", helper: "Say it or type it — like the sound in ship.", answer: "sh", accepts: ["shh", "sh sound", "shhh"], xp: 25 }),
  q({ id: "ph2", type: "multiple-choice", category: "phonics", question: 'Which word contains the "ch" sound?', options: ["chair", "table", "spoon", "plate"], answer: "chair", xp: 20 }),
  q({ id: "ph3", type: "phonics", category: "phonics", question: 'What sound do the letters "th" make?', content: "th", answer: "th", accepts: ["thh", "th sound"], xp: 25 }),
  q({ id: "ph4", type: "multiple-choice", category: "phonics", question: 'Which word rhymes with "cake"?', options: ["lake", "cook", "kite", "cup"], answer: "lake", xp: 20 }),
  q({ id: "ph5", type: "voice-input", category: "phonics", question: "Blend the sounds and say the word: c - a - t", content: "c a t", answer: "cat", xp: 25 }),
  q({ id: "ph6", type: "multiple-choice", category: "phonics", question: 'How many syllables are in "butterfly"?', content: "but-ter-fly", options: ["1", "2", "3", "4"], answer: "3", xp: 20 }),
  q({ id: "ph7", type: "spelling", category: "phonics", question: "Type the word you hear.", content: "ship", answer: "ship", xp: 25 }),
  q({ id: "ph8", type: "multiple-choice", category: "phonics", question: 'Which word starts with the same sound as "sun"?', options: ["sock", "moon", "tree", "hand"], answer: "sock", xp: 20 }),
];

const spellingBank: Question[] = [
  q({ id: "sp1", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "garden", answer: "garden", xp: 25 }),
  q({ id: "sp2", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "butterfly", answer: "butterfly", xp: 25 }),
  q({ id: "sp3", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "dragon", answer: "dragon", xp: 25 }),
  q({ id: "sp4", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "river", answer: "river", xp: 25 }),
  q({ id: "sp5", type: "multiple-choice", category: "spelling", question: "Which spelling is correct?", options: ["freind", "friend", "frend", "frienn"], answer: "friend", xp: 20 }),
  q({ id: "sp6", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "window", answer: "window", xp: 25 }),
  q({ id: "sp7", type: "multiple-choice", category: "spelling", question: "Which spelling is correct?", options: ["becuase", "becouse", "because", "becaus"], answer: "because", xp: 20 }),
  q({ id: "sp8", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "mountain", answer: "mountain", xp: 25 }),
];

const vocabBank: Question[] = [
  q({ id: "vo1", type: "multiple-choice", category: "vocabulary", question: "Which animal has a long trunk?", content: "elephant", options: ["Elephant", "Horse", "Tiger", "Rabbit"], answer: "Elephant", xp: 20 }),
  q({ id: "vo2", type: "multiple-choice", category: "vocabulary", question: 'What does "enormous" mean?', options: ["Very big", "Very small", "Very fast", "Very quiet"], answer: "Very big", xp: 20 }),
  q({ id: "vo3", type: "multiple-choice", category: "vocabulary", question: "Which word means the opposite of bright?", options: ["dull", "shiny", "clear", "light"], answer: "dull", xp: 20 }),
  q({ id: "vo4", type: "multiple-choice", category: "vocabulary", question: "Where do fish live?", options: ["Water", "Desert", "Cloud", "Cave"], answer: "Water", xp: 20 }),
  q({ id: "vo5", type: "voice-input", category: "vocabulary", question: "Say this word out loud.", content: "telescope", answer: "telescope", xp: 25 }),
  q({ id: "vo6", type: "multiple-choice", category: "vocabulary", question: 'Which word means "to look closely"?', options: ["examine", "ignore", "shout", "sleep"], answer: "examine", xp: 20 }),
  q({ id: "vo7", type: "multiple-choice", category: "vocabulary", question: "A baby dragon is called a…", options: ["hatchling", "cub", "foal", "kitten"], answer: "hatchling", xp: 20 }),
  q({ id: "vo8", type: "spelling", category: "vocabulary", question: "Type the word you hear.", content: "forest", answer: "forest", xp: 25 }),
];

const readingBank: Question[] = [
  q({ id: "rd1", type: "voice-input", category: "reading", question: "Read this word aloud.", content: "adventure", answer: "adventure", xp: 25 }),
  q({ id: "rd2", type: "voice-input", category: "reading", question: "Read this word aloud.", content: "important", answer: "important", xp: 25 }),
  q({ id: "rd3", type: "multiple-choice", category: "reading", question: "Which word is read here?", content: "s t o r m", options: ["storm", "stone", "store", "sport"], answer: "storm", xp: 20 }),
  q({ id: "rd4", type: "reading", category: "reading", question: "Read the sentence, then continue.", story: "The little dragon walked to the bright river. It looked into the water and saw its own face.", answer: "read", xp: 25 }),
  q({ id: "rd5", type: "comprehension", category: "comprehension", question: "In the sentence above, where did the dragon walk?", options: ["To the river", "To the cave", "To the school", "To the moon"], answer: "To the river", xp: 20 }),
  q({ id: "rd6", type: "voice-input", category: "reading", question: "Read this word aloud.", content: "wonderful", answer: "wonderful", xp: 25 }),
  q({ id: "rd7", type: "multiple-choice", category: "reading", question: "Which word does not belong?", content: "book  page  read  jump", options: ["jump", "book", "page", "read"], answer: "jump", xp: 20 }),
  q({ id: "rd8", type: "spelling", category: "reading", question: "Type the word you hear.", content: "reading", answer: "reading", xp: 25 }),
];

const sentenceBank: Question[] = [
  q({ id: "se1", type: "multiple-choice", category: "sentence", question: "Which sentence is in the right order?", options: ["dog the barked loudly", "The dog barked loudly.", "Barked the loudly dog", "Loudly dog the barked"], answer: "The dog barked loudly.", xp: 20 }),
  q({ id: "se2", type: "multiple-choice", category: "sentence", question: "Choose the word that completes the sentence: Mia ___ a book.", options: ["reads", "reading", "readed", "to read"], answer: "reads", xp: 20 }),
  q({ id: "se3", type: "multiple-choice", category: "sentence", question: "Which sentence ends correctly?", options: ["We went home", "We went home.", "we went home,", "We went home?"], answer: "We went home.", xp: 20 }),
  q({ id: "se4", type: "spelling", category: "sentence", question: "Type the missing word you hear: The egg started to ___.", content: "glow", answer: "glow", xp: 25 }),
  q({ id: "se5", type: "multiple-choice", category: "sentence", question: "Which sentence starts correctly?", options: ["the sky is blue.", "The sky is blue.", "THE sky is blue.", "the Sky is blue."], answer: "The sky is blue.", xp: 20 }),
  q({ id: "se6", type: "comprehension", category: "sentence", question: "Which word is the naming word (noun) in: The dragon flew high?", options: ["dragon", "flew", "high", "the"], answer: "dragon", xp: 20 }),
  q({ id: "se7", type: "voice-input", category: "reading", question: "Read the sentence aloud.", content: "The map glows at night.", answer: "the map glows at night", xp: 25 }),
  q({ id: "se8", type: "multiple-choice", category: "sentence", question: "Pick the joining word: I like books ___ maps.", options: ["and", "but", "because", "so"], answer: "and", xp: 20 }),
];

const grammarBank: Question[] = [
  q({ id: "gr1", type: "grammar", category: "grammar", question: "Choose the correct sentence.", options: ["She go to school.", "She goes to school.", "She going school.", "She gone school."], answer: "She goes to school.", xp: 20 }),
  q({ id: "gr2", type: "grammar", category: "grammar", question: "Choose the correct sentence.", options: ["They was happy.", "They is happy.", "They were happy.", "They be happy."], answer: "They were happy.", xp: 20 }),
  q({ id: "gr3", type: "grammar", category: "grammar", question: "Choose the correct sentence.", options: ["I have two book.", "I have two books.", "I has two books.", "I having two books."], answer: "I have two books.", xp: 20 }),
  q({ id: "gr4", type: "grammar", category: "grammar", question: "Pick the past tense of 'run'.", options: ["runned", "ran", "runs", "running"], answer: "ran", xp: 20 }),
  q({ id: "gr5", type: "grammar", category: "grammar", question: "Choose the correct sentence.", options: ["The dragon fly high.", "The dragon flies high.", "The dragon flying high.", "The dragon flied high."], answer: "The dragon flies high.", xp: 20 }),
  q({ id: "gr6", type: "grammar", category: "grammar", question: "Which word is a describing word?", content: "The tiny egg glowed.", options: ["tiny", "egg", "glowed", "the"], answer: "tiny", xp: 20 }),
  q({ id: "gr7", type: "spelling", category: "grammar", question: "Type the word you hear.", content: "quickly", answer: "quickly", xp: 25 }),
  q({ id: "gr8", type: "grammar", category: "grammar", question: "Choose the correct question.", options: ["Where you are going?", "Where are you going?", "Where going you are?", "You are going where."], answer: "Where are you going?", xp: 20 }),
];

const STORY = "Mia found a tiny dragon egg near the forest. The egg began to glow when she touched it. A soft hum came from inside the shell. Mia carried it home and kept it warm all night.";

const comprehensionBank: Question[] = [
  q({ id: "cm0", type: "reading", category: "reading", question: "Read the story. Use Listen or Read With Me if you like.", story: STORY, answer: "read", xp: 25 }),
  q({ id: "cm1", type: "comprehension", category: "comprehension", question: "What did Mia find?", options: ["A dragon egg", "A lost puppy", "A gold coin", "A map"], answer: "A dragon egg", xp: 20 }),
  q({ id: "cm2", type: "comprehension", category: "comprehension", question: "Where did she find it?", options: ["Near the forest", "In the sea", "On a mountain", "At school"], answer: "Near the forest", xp: 20 }),
  q({ id: "cm3", type: "comprehension", category: "comprehension", question: "What happened when she touched the egg?", options: ["It began to glow", "It broke", "It rolled away", "It turned cold"], answer: "It began to glow", xp: 20 }),
  q({ id: "cm4", type: "comprehension", category: "comprehension", question: "What sound came from the shell?", options: ["A soft hum", "A loud bang", "A whistle", "A bark"], answer: "A soft hum", xp: 20 }),
  q({ id: "cm5", type: "comprehension", category: "comprehension", question: "How do you think Mia felt?", options: ["Curious and excited", "Bored", "Angry", "Sleepy"], answer: "Curious and excited", xp: 20 }),
  q({ id: "cm6", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "shell", answer: "shell", xp: 25 }),
  q({ id: "cm7", type: "voice-input", category: "reading", question: "Read this sentence aloud.", content: "The egg began to glow.", answer: "the egg began to glow", xp: 25 }),
];

const advancedSpelling: Question[] = [
  q({ id: "as1", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "adventure", answer: "adventure", xp: 30 }),
  q({ id: "as2", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "necessary", answer: "necessary", xp: 30 }),
  q({ id: "as3", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "beautiful", answer: "beautiful", xp: 30 }),
  q({ id: "as4", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "different", answer: "different", xp: 30 }),
  q({ id: "as5", type: "multiple-choice", category: "spelling", question: "Which spelling is correct?", options: ["definately", "definitely", "definitly", "definetly"], answer: "definitely", xp: 20 }),
  q({ id: "as6", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "library", answer: "library", xp: 30 }),
  q({ id: "as7", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "creature", answer: "creature", xp: 30 }),
  q({ id: "as8", type: "multiple-choice", category: "spelling", question: "Which spelling is correct?", options: ["recieve", "receive", "receeve", "recieve"], answer: "receive", xp: 20 }),
];

const fluencyBank: Question[] = [
  q({ id: "fl1", type: "reading", category: "reading", question: "Read this passage at a comfortable pace.", story: "The path to the library was lined with lanterns. Each lantern held a single word, and the words lit up as the dragon passed by.", answer: "read", xp: 30 }),
  q({ id: "fl2", type: "voice-input", category: "reading", question: "Read the sentence aloud.", content: "Each lantern held a single word.", answer: "each lantern held a single word", xp: 30 }),
  q({ id: "fl3", type: "comprehension", category: "comprehension", question: "What lined the path?", options: ["Lanterns", "Trees", "Rocks", "Books"], answer: "Lanterns", xp: 20 }),
  q({ id: "fl4", type: "multiple-choice", category: "reading", question: "Which word means the same as 'path'?", options: ["trail", "cloud", "chair", "storm"], answer: "trail", xp: 20 }),
  q({ id: "fl5", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "lantern", answer: "lantern", xp: 25 }),
  q({ id: "fl6", type: "voice-input", category: "reading", question: "Read this word aloud.", content: "extraordinary", answer: "extraordinary", xp: 30 }),
  q({ id: "fl7", type: "grammar", category: "grammar", question: "Choose the correct sentence.", options: ["The words lit up.", "The words lits up.", "The word lit ups.", "The words lighting up."], answer: "The words lit up.", xp: 20 }),
  q({ id: "fl8", type: "image-input", category: "image-recognition", question: "Upload a picture of something you can read from.", content: "book", answer: "book", xp: 25 }),
];

const finalBank: Question[] = [
  letterRecognition[0]!,
  bdBank[2]!,
  phonicsBank[0]!,
  q({ id: "fn4", type: "spelling", category: "spelling", question: "Type the word you hear.", content: "guardian", answer: "guardian", xp: 35 }),
  q({ id: "fn5", type: "voice-input", category: "reading", question: "Read the final line aloud.", content: "The library opens for those who keep trying.", answer: "the library opens for those who keep trying", xp: 35 }),
  q({ id: "fn6", type: "image-input", category: "image-recognition", question: "Upload a picture of a book or a page of text.", content: "book", answer: "book", xp: 30 }),
  q({ id: "fn7", type: "comprehension", category: "comprehension", question: "The library opens for those who…", options: ["keep trying", "run fastest", "shout loudest", "arrive first"], answer: "keep trying", xp: 30 }),
];

const BANKS: Record<number, Question[]> = {
  1: letterRecognition,
  2: bdBank,
  3: pqBank,
  4: phonicsBank,
  5: spellingBank,
  6: vocabBank,
  7: readingBank,
  8: sentenceBank,
  9: grammarBank,
  10: comprehensionBank,
  11: comprehensionBank,
  12: advancedSpelling,
  13: [...letterRecognition.slice(0, 2), ...phonicsBank.slice(0, 2), ...vocabBank.slice(0, 2), ...grammarBank.slice(0, 2)],
  14: fluencyBank,
  15: finalBank,
};

function shuffle<T>(arr: T[], seed: number) {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * Prototype adaptive selector: keeps ordered "story" levels intact and
 * shuffles free-form banks so repeat plays vary.
 * Replace with a trained model / API in production.
 */
export function getLevelQuestions(levelId: number, seed = Date.now() % 1000): Question[] {
  const bank = BANKS[levelId] ?? letterRecognition;
  const ordered = levelId === 10 || levelId === 11 || levelId === 14 || levelId === 15;
  const picked = ordered ? bank : shuffle(bank, seed);
  return picked.slice(0, 7);
}

export function getLevel(id: number) {
  return LEVELS.find((l) => l.id === id);
}
