# Minesweeper Game in JavaScript

This is the Minesweeper game implemented in Next.js.

The game provides a grid of different sizes based on difficulty. The goal is to find all of the mines and flag them without left-clicking on any of them. Right-clicking a space will flag it as a mine. Right-clicking a flagged space will unflag it. Left-clicking a mine is a game loss. Left-clicking any non-flagged, non-mine space will display a number that indicates how many adjacent spaces have mines in them. Use these numbers to find the mines.

![](GameScreenshot.png)

## Note About Splashing

Splashing now works on Easy mode. In Medium, sometimes it stops working and I don't know why. I can't reliably reproduce the issue.

I am doing this through `useEffect` and so it's a slow splash. I knew that going in and I named the function appropriately. I suspect the solution to any issues I'm encountering would be to cache the intermediate outcomes and only set state at the end. That is a possibility for the future.

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
