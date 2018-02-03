/*
Module for controlling Spawn behavior
*/

var actionSpawn = {

  run: function() {

    /*
      Calculate population size
      parameter: population
    */
    // Count the amount of creeps
    var population = 0;

    for (let name in Game.creeps) {
      population += 1;
    }
    //console.log('Population is: ' + population);

    /*
      Spawning loop
    */
    // Spawning loop
    for(namespawn in Game.spawns) {
      var spawn = Game.spawns[namespawn];

      if(spawn.spawning) {
          var spawningCreep = Game.creeps[spawn.spawning.name];
          spawn.room.visual.text(
              '🛠️' + spawningCreep.memory.role,
              spawn.pos.x + 1,
              spawn.pos.y,
              {align: 'left', opacity: 0.8});
      }
      // If not spawning, and spawn at energyCapacity, spawn
      else {
        for (let name in Game.spawns) {
          var spawn = Game.spawns[name];

          if (spawn.energy == spawn.energyCapacity) {

            // Find unique numbered name for creep
            sequenceNumber = 1;
            let newName = 'creep'
            // While the name is not unique, generate new number
            while (Game.creeps[newName + sequenceNumber]) {
              sequenceNumber += 1;
              newName = 'creep' + sequenceNumber;
            }

            //console.log(newName);
            //console.log(Game.creeps);

            /*
            What to spawn decision making
            */
            if (population < 1) {
              //console.log('should spawn harvester');
              spawn.spawnCreep( [WORK, CARY, CARRY, MOVE], newName, {memory: {role: 'harvester'}} );
            }
            else if (population > 1 && population < 3) {
              //console.log('should upgrader');
              spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'upgrader'}});
            }
            else {
              //console.log('spawn random');
              //console.log('population: ' + population + '; newName: ' + newName + ';');
              console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'upgrader'}}));
            }

          }
        }
      }

    }
  }

};

module.exports = actionSpawn;
