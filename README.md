# pxt-game-rabbit-chicken-maze
Simple Microsoft MakeCode (PXT) game where you help the rabbit to find his friend baby chicken.

![Demo Game Recording](https://raw.githubusercontent.com/iaroslavn/pxt-game-rabbit-chicken-maze/master/screenshots/game-recording.gif)

## Live Version

https://makecode.com/_MsU6zhgkUEsw


## Features
This game demonstrates the following game development concepts:
* Basic sprite animation
* Controls
* Random level generation (the algorithm in this game that generates a solvable maze is inspired by the [Percolation](https://introcs.cs.princeton.edu/java/24percolation/) problem)
* Sprite overlapping / collisions
* Tilemaps

## Dev setup
You can clone this repository locally and run `npm install` followed by `npm run build`, however the actual game needs to run in the MakeCode Arcade Simulator available at https://arcade.makecode.com/. All the game development can be done from within that simulator in a browser (you can push the code changes back to GitHub too).  
Here is how:
1. Fork this repository.
2. Navigate to https://arcade.makecode.com/, click 'Import', choose 'Your GitHub Repo...', and select the respository you created on step 1.
3. When you done with your changes click the 'Sync' button to push them to the GitHub repository.

**P.S.** If you want to decouple from arcade.makecode.com you can spin up your own version of the website using this Docker image: https://github.com/iaroslavn/docker-pxt-arcade.

## License
[BSD 0-Clause License (0BSD)](https://tldrlegal.com/license/bsd-0-clause-license#fulltext)
Copyright (C) 2019 Iaroslav Naidon

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
