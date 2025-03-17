# Minesweeper Game in JavaScript

This is the Minesweeper game implemented in Next.js.

The game provides a grid of different sizes based on difficulty. The goal is to find all of the mines and flag them without left-clicking on any of them. Right-clicking a space will flag it as a mine. Right-clicking a flagged space will unflag it. Left-clicking a mine is a game loss. Left-clicking any non-flagged, non-mine space will display a number that indicates how many adjacent spaces have mines in them. Use these numbers to find the mines.

![](GameScreenshot.png)

## Note About Splashing

In the original JavaScript/HTML/CSS implementation, clicking on a space with no adjacent mines would properly splash "clicks" to all surrounding spaces until all edge values were non-zero. This is how the game is supposed to work.

When rewriting it in Next.js, I found this was not possible. For now, it will simply splash all adjacent spaces and then stop. If you know how to do this to match the original implementation, please let me know!

## Running the Game

```
npm run dev
```

## Running the Unit Tests

```
npm test
```

## Supported Browsers

- Chrome
- Firefox
