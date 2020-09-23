# Rocket Elevators Controllers

### Table Of Contents:
englishversions folder: my original attempts at translating the problem at hand into english-ish text

old folder: contains previous pseudocode attempts, will be removed later when I'm sure I wont need it

Residential_Controller.algo: Pseudocode for the residential problem
Commercial_Controller.algo: Pseudocode for the commercial problem

## Any Requirements?
The algorithm...

- must be finite and delimited: If it never ends in trying to solve the problem in question, the algorithm is useless.
- instructions must be clearly defined and each step must be precise. It must cover all cases and must be unambiguous.
- must be effective in solving the problem and it must be demonstrated in a simple way (on a board or on paper).

## What Problem?

### Residential:
The algorithm must control a column with two elevators servicing 10 floors.

### Commercial:
The algorithm must control a battery with 4 columns and 3 elevators.

## My Approach?
1) Try to translate the problem into something close to English
2) If #1 is done, try to make a pseudocode version of the English problem with SOME abstraction of certain details while still describing the entire process step by step.

After doing a decent version of the residential controller, I found that most of the concepts I had used for it could be recycled with some changes for the commercial version so the residential controller will serve as it's blueprint.