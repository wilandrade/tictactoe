Tic Tac Toe
=========

Features:
Native DOM API app
* Game was made without use of external tools or libraries.

Event driven architecture

* To minimize the interactions between the View and the Model they both listen to and trigger events that make each module responsible for updating itself. A minimal amount of maintenance is required in the case of updating art assets or other view related resources.

Modular architecture with separate View and Model. 

* TicTacToe logic is completely abstracted away from how the view renders the game, allowing us to change view without affecting the game logic. This type of architecture lends itself to scalable apps that are easier to maintain.
