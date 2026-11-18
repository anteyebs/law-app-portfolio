import { Router } from "express";
import { wordDataset } from "../data/words";

const wordsRouter = Router();

wordsRouter.get("/word/:letter", (req, res) => {
  const letter = req.params.letter.toUpperCase();

  if (!/^[A-Z]$/.test(letter)) {
    res.status(404).json({ error: "Invalid letter. Must be a single letter A-Z." });
    return;
  }

  const entries = wordDataset[letter];
  if (!entries || entries.length === 0) {
    res.status(404).json({ error: `No word entry found for letter: ${letter}` });
    return;
  }

  const randomIndex = Math.floor(Math.random() * entries.length);
  res.json(entries[randomIndex]);
});

wordsRouter.get("/word/:letter/all", (req, res) => {
  const letter = req.params.letter.toUpperCase();

  if (!/^[A-Z]$/.test(letter)) {
    res.status(404).json({ error: "Invalid letter. Must be a single letter A-Z." });
    return;
  }

  const entries = wordDataset[letter];
  if (!entries || entries.length === 0) {
    res.status(404).json({ error: `No word entries found for letter: ${letter}` });
    return;
  }

  res.json(entries);
});

wordsRouter.get("/words/all", (_req, res) => {
  const all = Object.values(wordDataset)
    .flat()
    .sort((a, b) => a.letter.localeCompare(b.letter));
  res.json(all);
});

export default wordsRouter;
