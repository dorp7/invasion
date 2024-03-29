let round; //to keep track of rounds
let houseCost; //to keep track of house cost (cost increases the more you buy)
let prex;  //prex=currency
let act; //this is how many actions you get
let totalAct; //how many your actions go up
let enemyNumber; //how many enemies there are (this number used for determening if the player has won)
let enemyAray; //an aray used to keep track of enemies in the move enemies stage of a new round 
let pictureId; //a string version of the Id of a certain space in the game used to change the image
let whatSoldierRow; //the row that the curent moving soldier (if any) is in.
let whatSoldierColumn; //the column that the curent moving soldier (if any) is in.
let whatBuildRow; //the row that the curent proposed building site (if any) is in.
let whatBuildColumn; //the column that the curent proposed building site (if any) is in.
let building; //to let the program know if the player wants to build or not
let soldierMoves = 0; //the amount of moves a soldier has left
let buttonPressed = false; //to let the program know if a button has been pressed but not resolved 
let totalPrexHarvested; //to keep track of the total prex harvested and show the player at the end of each game
let totalPrexSpent; //to keep track of the total prexs pent and show the player at the end of each game
let totalEnemiesKilled; //to keep track of the total enemies killed and show the player at the end of each game
let totalUnitsKilled; //to keep track of and the total units killed show the player at the end of each game
let totalUnitsBuilt; //to keep track of the total units built and show the player at the end of each game
let instructionsOut = 0; //to tell the program weather to show the instructions or hide them
let optionsOut = 0; //to tell the program weather to show the option or hide them
let playTillLose = 1; //tells what option the player chose
let cannonsReload = 1; //tells what option the player chose
let soldiersHeal = 1; //tells what option the player chose
//let 

/*
*/

//Below is the aray representing the screen. 0=blank space  1=canon  2=fired canon 3=soldier with 3 lives 4=soldier with 2 lives 5=soldier with 1 life 
//7=flagbearer 8=house 10-19=farm(coresponding to the amount of prex able to be harvested) -1 or less=enemies
let screen = [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0]];

//

function goThroughAray(myCallback) { //this function goes through every space on the screen and calls a function for each space
    let rowNumber = 0;
    let columNumber = 0;
    while (rowNumber < 9) {
        while (columNumber < 12) {
            myCallback(rowNumber, columNumber)

            columNumber = columNumber + 1;
        }

        rowNumber = rowNumber + 1;
        columNumber = 0
    }
}

//CALLBACK FUNCTIONS
function displayScreen(index1, index2) { //this function, when used as the callback for the goThroughAray function, updates the website to have the corect pictures
    firstNumber = index1.toString();
    secondNumber = index2.toString();
    pictureId = firstNumber+secondNumber;
    switch (screen[index1][index2]) {
        case 0: 
            document.getElementById(pictureId).src = "./InvasionImages/blank.jpeg";
            document.getElementById(pictureId).alt = "Blank space";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 1:
            document.getElementById(pictureId).src = "./InvasionImages/cannon.jpeg";
            document.getElementById(pictureId).alt = "Cannon";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 2:
            document.getElementById(pictureId).src = "./InvasionImages/shotCannon.jpeg";
            document.getElementById(pictureId).alt = "Used Cannon";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 3:
            document.getElementById(pictureId).src = "./InvasionImages/soldier3.jpeg";
            document.getElementById(pictureId).alt = "Soldier With 3 Health";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 4:
            document.getElementById(pictureId).src = "./InvasionImages/soldier2.jpeg";
            document.getElementById(pictureId).alt = "Soldier With 2 Health";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 5:
            document.getElementById(pictureId).src = "./InvasionImages/soldier1.jpeg";
            document.getElementById(pictureId).alt = "Soldier With 1 Health";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 7:
            document.getElementById(pictureId).src = "./InvasionImages/flag.jpeg";
            document.getElementById(pictureId).alt = "Flag Bearer";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 8:
            document.getElementById(pictureId).src = "./InvasionImages/house.jpeg";
            document.getElementById(pictureId).alt = "House";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 10:
            document.getElementById(pictureId).src = "./InvasionImages/farm0.jpeg";
            document.getElementById(pictureId).alt = "Farm with 0 prex";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 11:
            document.getElementById(pictureId).src = "./InvasionImages/farm2.jpeg";
            document.getElementById(pictureId).alt = "Farm with 2 prex";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 12:
            document.getElementById(pictureId).src = "./InvasionImages/farm4.jpeg";
            document.getElementById(pictureId).alt = "Farm with 4 prex";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 13:
            document.getElementById(pictureId).src = "./InvasionImages/farm6.jpeg";
            document.getElementById(pictureId).alt = "Farm with 6 prex";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        case 14:
            document.getElementById(pictureId).src = "./InvasionImages/farm8.jpeg";
            document.getElementById(pictureId).alt = "Farm with 8 prex";
            document.getElementById(pictureId+"t").innerHTML = "";
            break;
        default:
            document.getElementById(pictureId).src = "";
            document.getElementById(pictureId).alt = "Error";
    }
    if (screen[index1][index2] < 0){
        document.getElementById(pictureId).src = "./InvasionImages/enemy.jpeg";
        document.getElementById(pictureId+"t").innerHTML = screen[index1][index2]*-1;
        document.getElementById(pictureId).alt = screen[index1][index2]*-1 + "Enemies";
    }

}

function growFarm(index1, index2) { //this function, when used as the callback for the goThroughAray function, makes all farm spaces grow
    if (screen[index1][index2] > 9) {
        if (screen[index1][index2] < 14) {
            screen[index1][index2] = screen[index1][index2] + 1
        }
    }
}

function loadCannons(index1, index2) { //this function, when used as the callback for the goThroughAray function, reloads all canons
    if (screen[index1][index2] == 2) {
        screen[index1][index2] = 1;
    }
}

function healSoldiers(index1, index2) { //this function, when used as the callback for the goThroughAray function, heals all soldiers one heart
    if (screen[index1][index2] == 4 || screen[index1][index2] == 5 ) {
        screen[index1][index2] = screen[index1][index2] -1;
    }
}

function bold(index1, index2, isBolded) { //this function unbolds the given space
    firstNumber = index1.toString();
    secondNumber = index2.toString();
    pictureId = firstNumber + secondNumber;
    if (isBolded) {
        document.getElementById(pictureId).style.borderStyle = "solid";
    } else {
        document.getElementById(pictureId).style.borderStyle = "none";
    }
    
}

//UTILITY FUNCTIONS
function updateAPI() { //this function updates the Actions and Prex Information
    document.getElementById('API').innerHTML = "Round: " + round + "     Actions: " + act + "    Prex: " + prex;
}

function buttonPress(row, column) { //this function is called when the player pushes a buton. It calls the function coresponding to the button pushed
    spaceNumber = screen[row][column];
    if (building == true){
        doneBuilding()
    }
    if (soldierMoves > 0) {
        actMoveSoldierPart2(row, column, spaceNumber)
    } else {
    whatAction(row, column, spaceNumber)
    }
}

function makeArray(first, second) { //this function adds one coordinate to the enemy aray
    let screenNumber = screen[first][second];
    if (screen[first][second] < 0) {
        screenNumber = screen[first][second];
        enemyAray[enemyAray.length] = [first, second, screenNumber];
        screen[first][second] = 0;
    }
}

function moveEnemies() { //this function moves the enemies
    goThroughAray(makeArray)
    let i;
    let wheremove;
    let index1;
    let index2;
    let columnAmount
    let rowAmount
    for (i = 0, wheremove = 0; i < enemyAray.length; i++) {
        wheremove = getRndInteger(1,13)
        index1 = enemyAray[i][0];
        index2 = enemyAray[i][1];
        switch (wheremove) {
            case 1:
                rowAmount = 0;
                columnAmount = 0;
                break;
            case 2:
                if (index1 != 8) {
                    rowAmount = 1;
                    columnAmount = 0;
                } else {
                    rowAmount = 0;
                    columnAmount = 0;
                }
                break;
            case 3:
                if (index1 != 0) {
                    rowAmount = -1;
                    columnAmount = 0;
                } else {
                    rowAmount = 0;
                    columnAmount = 0;
                }
                break;
            case 4:
                if (index2 != 11) {
                    rowAmount = 0;
                    columnAmount = 1;
                } else {
                    rowAmount = 0;
                    columnAmount = 0;
                }
                break;
            case 5:
                if (index2 != 1 && index2 != 0) {
                    rowAmount = 0;
                    columnAmount = -2;
                } else {
                    rowAmount = 0;
                    columnAmount = 0;
                }
                break;
            case 6:
                if (index2 != 2 && index2 != 1 && index2 != 0) {
                    rowAmount = 0;
                    columnAmount = -3;
                } else {
                    rowAmount = 0;
                    columnAmount = 0;
                }
                break;
            default:
                if (index2 != 0) {
                    rowAmount = 0;
                    columnAmount = -1;
                } else {
                    rowAmount = 0;
                    columnAmount = 0;
                }
        }
        if (screen[index1 + rowAmount][index2 + columnAmount] < 1) {
            screen[index1 + rowAmount][index2 + columnAmount] = screen[index1 + rowAmount][index2 + columnAmount] + enemyAray[i][2];
        } else if (screen[index1 + rowAmount][index2 + columnAmount] == 8){
            screen[index1 + rowAmount][index2 + columnAmount] = 0;
            screen[index1][index2] = screen[index1][index2] + enemyAray[i][2];
            totalAct = totalAct - 1;
        } else if (screen[index1 + rowAmount][index2 + columnAmount] == 7){
            totalUnitsKilled = totalUnitsKilled + 1;
            goThroughAray( )
            document.getElementById('tableScreen').style.visibility = "hidden";
            document.getElementById('API').style.display = "none";
            window.alert("you lost. Do better")
            
            document.getElementById('test1').innerHTML = "total prex harvested: " + totalPrexHarvested
            document.getElementById('test2').innerHTML = "total prex spent: " + totalPrexSpent
            document.getElementById('test3').innerHTML = "total units built: " + totalUnitsBuilt
            document.getElementById('test4').innerHTML = "total units kiled: " + totalUnitsKilled
            document.getElementById('test5').innerHTML = "total enemies kiled: " + totalEnemiesKilled

            document.getElementById('test1').style.display = "block";
            document.getElementById('test2').style.display = "block";
            document.getElementById('test3').style.display = "block";
            document.getElementById('test4').style.display = "block";
            document.getElementById('test5').style.display = "block";
        } else if (screen[index1 + rowAmount][index2 + columnAmount] == 3 || screen[index1 + rowAmount][index2 + columnAmount] == 4){
            screen[index1 + rowAmount][index2 + columnAmount] = screen[index1 + rowAmount][index2 + columnAmount] +1;
            screen[index1][index2] = screen[index1][index2] + enemyAray[i][2];
            totalUnitsKilled = totalUnitsKilled + 1;
        } else {
            screen[index1 + rowAmount][index2 + columnAmount] = 0;
            screen[index1][index2] = screen[index1][index2] + enemyAray[i][2];
            totalUnitsKilled = totalUnitsKilled + 1;
        }   
    }
    enemyAray = [];
    let x;
    let whereAppear;
    let howmanny
    if (round>30 && playTillLose == 1) {
        howmanny = 30;
    } else {
        howmanny = round + 1;
    }
    for (x = 0; x < howmanny; x++) {
        whereAppear = getRndInteger(0, 8);
        if (screen[whereAppear][11] < 1) {
            screen[whereAppear][11] = screen[whereAppear][11] - 1;
            enemyNumber = enemyNumber + 1;
        } else {
            screen[whereAppear][11] = -5;
            enemyNumber = enemyNumber + 5;
        }
    }
}

function runGame() { //this function starts a new game
    document.getElementById('test1').style.display = "none";
    document.getElementById('test2').style.display = "none";
    document.getElementById('test3').style.display = "none";
    document.getElementById('test4').style.display = "none";
    document.getElementById('test5').style.display = "none";
    goThroughAray(bold)
    round = 0; 
    houseCost = 10; 
    prex = 20;  
    act = 0; 
    totalAct = 3; 
    enemyNumber = 13; 
    enemyAray = [];
    whatSoldierRow = undefined;
    whatSoldierColumn = undefined;
    whatBuildRow = undefined;
    whatBuildColumn = undefined;
    building = false;
    soldierMoves = 0;
    buttonPressed = false;
    totalPrexHarvested = 0;
    totalPrexSpent = 0;
    totalEnemiesKilled = 0;
    totalUnitsKilled = 0;
    totalUnitsBuilt = 0;
    screen = [
    [0,0,0,0,0,0,0,0,0,0,-1,-2],
    [0,0,0,0,0,0,0,0,0,0,0,-1],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [8,0,0,0,0,0,0,0,0,0,0,-1],
    [7,10,0,0,0,0,0,0,0,0,-1,-2],
    [8,0,0,0,0,0,0,0,0,0,0,-1],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,-1],
    [0,0,0,0,0,0,0,0,0,0,-1,-2]];
    document.getElementById('tableScreen').style.visibility = "visible";
    document.getElementById('API').style.display = "block";
    nextRound()
}

function nextRound() { //this function starts a new round
    moveEnemies()
    goThroughAray(growFarm)
    goThroughAray(healSoldiers)
    goThroughAray(displayScreen)
    act = totalAct;
    round = round+1;
    updateAPI()
}

function winCheck(){ //this function checks if you have won and displays your statistics if you have
    if (enemyNumber <= 0) {
        goThroughAray(displayScreen)
        window.alert("YOU WON!!!!! good job doing better")
        document.getElementById('tableScreen').style.visibility = "hidden";
        document.getElementById('API').style.display = "none";

        document.getElementById('test1').innerHTML = "total prex harvested: " + totalPrexHarvested
        document.getElementById('test2').innerHTML = "total prex spent: " + totalPrexSpent
        document.getElementById('test3').innerHTML = "total units built: " + totalUnitsBuilt
        document.getElementById('test4').innerHTML = "total units kiled: " + totalUnitsKilled
        document.getElementById('test5').innerHTML = "total enemies kiled: " + totalEnemiesKilled

        document.getElementById('test1').style.display = "block";
        document.getElementById('test2').style.display = "block";
        document.getElementById('test3').style.display = "block";
        document.getElementById('test4').style.display = "block";
        document.getElementById('test5').style.display = "block";
    }
}

function instructions(){ //this function shows or hides the instuctions
    instructionsOut = 1-instructionsOut;
    if (instructionsOut ==1){
        document.getElementById('demo').innerHTML = `this is invasion
The goal of the game is to defeat all the approaching enemy invaders in the least number of rounds possible.
You win if you defeat all the approaching enemy invaders.
You lose if flagbearer dies.
You get 3 actions per round.
To use an action click on a space then the corresponding action is taken.
Cannon: shoots, empty cannon: loads, soldier: moves and attacks, farm:harvests, empty space: builds.
The four units you can build are:

 (1) Farms 
    Farms cost 3 prex (the currency).
    After each round every farm grows 2 prex.
    A farm will only grow up to 8 prex.
    If you click on a farm you will harvest all prex growing there.

 (2) Soldiers 
    Soldiers cost 2 prex.
    Each soldier has 3 lives which it uses to attack enemies.
    If you click a soldier you get to move it 4 spaces.
    The soldier you click on will become bolded untill you move it four spaces.
    If you click on a soldier while it is bolded you will stop moving it.
    If you click on a bolded soldier before you have moved it at all you won't lose an<button id="cheatButton" type="button" onclick="cheatButton()">action.</button>
    If you click on a bolded soldier after you have moved it at all you will lose an action 
    A soldier can move and atack any adjacent space.
    Soldiers can't move or atack diagonaly.
    If a soldier moves on to an enemy it will destroy up to 3 enemies and lose a life.
    Soldiers will heal one heart every round.
    You can't move a soldier on to another unit.
   
 (3) Cannons
    Cannons cost 6 prex.
    If you click on a cannon it will fire and kill up to 4 enemies directly in front of it.
    After shooting, the cannon needs to be reloaded.
    You can reload cannons for 1 prex and an action.

 (4) Houses
    Houses cost 10 prex + 5 for every one you build.
    Houses have no action.
    Houses give you one extra action.`;
    } else if (instructionsOut == 0 ){
        document.getElementById('demo').innerHTML = ""
    }
}
 
function options(){ //this function shows or hides the options
    optionsOut = 1-optionsOut;
    if (optionsOut ==1){
        document.getElementById('option1').style.display = "block";
        document.getElementById('option2').style.display = "block";
        document.getElementById('option3').style.display = "block";
        //document.getElementById('option4').style.display = "block";
    } else if (instructionsOut == 0 ){
        document.getElementById('option1').style.display = "none";
        document.getElementById('option2').style.display = "none";
        document.getElementById('option3').style.display = "none";
        //document.getElementById('option4').style.display = "none";
    }
}

function changeOption(optionNumber){ //this function isnt finished yet
    window.alert("sory we cant do that yet" + optionNumber)
    switch(optionNumber){
        case 1:
            soldiersHeal = 1 - soldiersHeal;
            if (soldiersHeal == 0) {
                document.getElementById("option1im").alt = "no"
            } else {
                document.getElementById("option1im").alt = "yes"
            }
            
            break;
        case 2:
            cannonsReload = 1 - cannonsReload;
    }
}

function whatAction(row, column, spaceNumber) { //this function determines what action you will take and calls the coresponding function
    let doneOrNot
    switch (spaceNumber) {
        case 0:
            actBuild(row, column, spaceNumber)
            break;
        case 1:
            doneOrNot = actShootCannon(row, column, spaceNumber)
            break;
        case 2:
            doneOrNot = actLoadCannon(row, column, spaceNumber)
            break;
        case 3:
        case 4:
        case 5:
            actMoveSoldier(row, column, spaceNumber)
            break;
        case 11:
        case 12:
        case 13:
        case 14:
            doneOrNot = actFarm(row, column, spaceNumber)
            break;
        default:
            buttonPressed = false;
            window.alert("That isnt the right button. do better.");
    }
    if (doneOrNot == "Action Done") {
        actionResolve()
    }
}

function actionResolve() { //this function is called once the player uses an action
    act = act - 1;
        if (act < 1) {
            nextRound()
        }
        goThroughAray(displayScreen)
        updateAPI()
}

// ACTION FUNCTIONS
function actBuild (row, column, spaceNumber) { //this function tells the program that the player wants to build
    building = true;
    whatBuildRow = row;
    whatBuildColumn = column;
    bold(whatBuildRow, whatBuildColumn, true)
    document.getElementById('buildScreen').style.visibility = "visible";
}

function actBuildPart2(buildNumber, cost){ //this function builds
    if (buildNumber == 8) {
        cost = houseCost;
    }
    if (prex >= cost) {
        screen[whatBuildRow][whatBuildColumn] = buildNumber;
        prex = prex - cost;
        totalPrexSpent = totalPrexSpent + cost;
        totalUnitsBuilt = totalUnitsBuilt + 1;
        if (buildNumber == 8) {
            houseCost = houseCost + 5;
            document.getElementById("houseCostDisplay").innerHTML = houseCost + " prex";
            totalAct = totalAct + 1;
        }
        
        doneBuilding()
        actionResolve()
        goThroughAray(displayScreen)
    } else {
        window.alert("you too broke. do better")
        return  "you too broke. do better"
    }
    
}

function doneBuilding(){ //this function hides the build screen and tells the game that the player is done building
    bold(whatBuildRow, whatBuildColumn, false)
    document.getElementById('buildScreen').style.visibility = "hidden";
    whatBuildRow = undefined;
    whatBuildColumn = undefined;
    building = false;
}

function actShootCannon (row, column, spaceNumber) { //look at name
    let shootcolumn = column;
    while (true){
        shootcolumn = shootcolumn + 1;
        if (shootcolumn > 11) {
            window.alert("ow, you tried to shoot a cannon that wouldnt even hit anyone. that is not very smart. do better")
            return "wow, you tried to shoot a cannon that wouldnt even hit anyone. that is not very smart. do better";

        } else if (screen[row][shootcolumn] < 0) {
            break;
        }
    }
    if (screen[row][shootcolumn] < -10) {
        screen[row][shootcolumn] = screen[row][shootcolumn] + 10;
        enemyNumber = enemyNumber - 10;
        totalEnemiesKilled = totalEnemiesKilled + 10;
    } else {
        enemyNumber = enemyNumber + screen[row][shootcolumn];
        totalEnemiesKilled = totalEnemiesKilled - + screen[row][shootcolumn];
        screen[row][shootcolumn] = 0; // to do: make it able to shoot people in different rows
    }
    winCheck()
    screen[row][column] = 2;
    return "Action Done";
}

function actLoadCannon (row, column, spaceNumber) {//look at name
    if (prex >= 1) {
        screen[row][column] = 1;
        prex = prex - 1;
        return "Action Done";
    } else {
        window.alert("you too broke. do better")
    }
}

function actMoveSoldier (row, column, spaceNumber) { //this function tells the program that the player wants to move a soldier
    soldierMoves = 4;
    whatSoldierRow = row;
    whatSoldierColumn = column;
    bold(whatSoldierRow, whatSoldierColumn, true)
}

function actMoveSoldierPart2(row, column, spaceNumber) {//this function actualy moves the soldier
    if ((row == whatSoldierRow + 1 && column==whatSoldierColumn)||(row == whatSoldierRow - 1 && column==whatSoldierColumn)||(row == whatSoldierRow && column == whatSoldierColumn + 1)||(row == whatSoldierRow && column == whatSoldierColumn - 1)) {
        if (screen[row][column] == 0) {
            screen[row][column] = screen[whatSoldierRow][whatSoldierColumn];
            screen[whatSoldierRow][whatSoldierColumn] = 0;
            
            bold(whatSoldierRow, whatSoldierColumn, false)

            whatSoldierRow = row;
            whatSoldierColumn = column;
            soldierMoves = soldierMoves - 1;

            bold(whatSoldierRow, whatSoldierColumn, true)
        }
        if (screen[row][column] < 0) {
            if (screen[whatSoldierRow][whatSoldierColumn] == 5) {
                screen[whatSoldierRow][whatSoldierColumn] = 0;
                totalUnitsKilled = totalUnitsKilled + 1;
                soldierMoves = 0;
            } else {
                screen[whatSoldierRow][whatSoldierColumn] = screen[whatSoldierRow][whatSoldierColumn] +1;
                soldierMoves = soldierMoves - 1;
            }
            if (screen[row][column] < -3){
                screen[row][column] = screen[row][column] + 3;
                enemyNumber = enemyNumber - 3;
                totalEnemiesKilled = totalEnemiesKilled + 3;
            } else {
                enemyNumber = enemyNumber + screen[row][column];
                totalEnemiesKilled = totalEnemiesKilled - screen[row][column];
                screen[row][column] = 0;
            }
            winCheck()
        } 
        
        if (soldierMoves < 1) {
            bold(whatSoldierRow, whatSoldierColumn, false)
            whatSoldierRow = undefined;
            whatSoldierColumn = undefined;
            actionResolve()
        } else {

            goThroughAray(displayScreen)
        }
        //hi ellie
    } else if (row == whatSoldierRow && column == whatSoldierColumn){
        bold(whatSoldierRow, whatSoldierColumn, false)
        whatSoldierRow = undefined;
        whatSoldierColumn = undefined;
        if (soldierMoves != 4){
            actionResolve()
        }
        soldierMoves = 0;
    } else {
        window.alert("Did you seriously think he could teleport? Do beter")
    }
}

function actFarm (row, column, spaceNumber) { //see name
    screen[row][column] = 10;
    let prexOnFarm = spaceNumber - 10;
    prexOnFarm = prexOnFarm*2;
    prex = prex + prexOnFarm;
    totalPrexHarvested = totalPrexHarvested + prexOnFarm;
    return "Action Done";
}
// OTHER FUNCTIONS
function getRndInteger(min, max) { //gets a random integer
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function cheatButton(){ //muahaha
    prex = prex + 100;
}

//feedback: 
