# Fueur frei!

This retro shooter is a simple platform game, a battle of spaceships with one player and three kinds of enemies.

![Screenshot](./dist/assets/fueurFrei.png)

## How to play

- Move using arrow keys (Left, Right, Up, and Down).
- Shoot lasers using Space.
- The player has five lives.
- The aim is to destroy as many enemies as possible.
- There are three kinds of enemies, giving 20, 50, and 100 points on destroying.
- The player's name can be submitted when the game is over.
- The best ten results are displayed in a Hall of Fame.
- Music and sounds can be on or off and preference data is kept in local storage.

## Live Link

[Play the game!](https://1v4n4.github.io/fueur-frei/)

## Built With

- Javascript
- Phaser
- Webpack
- Babel
- Jest

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Node and NPM packages.

### Setup

Get the link to the repository.
Clone it as `git clone https://github.com/1v4n4/fueur-frei`.
Install  dependencies with npm install

### Usage

Run `npm run build` in  Terminal to build the assets using webpack.
Run `npm start` in Terminal to start the server and look at the result in localhost:8080.

### Writing Code

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

### Testing

The app uses Jest for testing. A command for running the tests that are located in the 'tests' folder is `npm test`.

## Design

This space battle is a platform app with simple graphics.

![Screenshot](./dist/assets/forReadme/myShip.png)
This player's ship has five lives and it is used to shoot at enemies.

![Screenshot](./dist/assets/forReadme/ship1.png)
This enemy ship has one life and it is easiest to be killed. It brings 20 points to a player.

![Screenshot](./dist/assets/forReadme/ship2.png)
This enemy ship has two lives and brings 50 points to a player.

![Screenshot](./dist/assets/forReadme/Ship3.png)
This enemy ship has three lives and brings 100 points to a player.

![Screenshot](./dist/assets/sprLaserPlayer.png)
This player's laser is a bit faster than the enemy’s, but there are a lot more enemy ships so that is not a big advantage.

![Screenshot](./dist/assets/sprLaserEnemy0.png)
This enemy's laser should be avoided.

## Acknowledgments

The game is named after the song 'Fueuer frei!'(Fire at will, translated) by German band [Rammstein](https://www.rammstein.de/en/). The same song is used for the soundtrack and the intro image is a picture from the band's concert. Buton, fire, and explosion sounds are from [Freesound](https://freesound.org/) website'.
Jared York's [tutorial](https://learn.yorkcs.com/category/tutorials/gamedev/phaser-3/build-a-space-shooter-with-phaser-3/) was very helpful while building the app.



## Author
**Ivana Novaković-Leković**

- GitHub: [@githubhandle](https://github.com/1v4n4)
- Twitter: [@twitterhandle](https://twitter.com/_1v4n4)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/1v4n4/)


## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/1v4n4/fueur-frei/issues).

## License
MIT

## Show your support

Give a ⭐️ if you like this project!
