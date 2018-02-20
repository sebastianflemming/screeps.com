/*
Module for controlling Spawn behavior
*/

var actionSpawn = {

  run: function() {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    //if(!upgraders[0]){console.log('nope')}else{console.log('yep')};
    //if(!harvesters[0]){console.log('nope')}else{console.log('yep')};
    //console.log(upgraders.length);

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
      //console.log(namespawn);
      var spawn = Game.spawns[namespawn];

      if(spawn.spawning) {
          //console.log('Currently spawning');
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
          var extensionEnergy = 0;
          var extensionEnergyCapacity = 0;
          Game.spawns.Spawn1.room.find(
            FIND_STRUCTURES,
            {filter: {structureType: STRUCTURE_EXTENSION}}).forEach(
              function(extension){
                extensionEnergy += extension.energy
                extensionEnergyCapacity += extension.energyCapacity
              }
            );
          //console.log(extensionEnergyCapacity);
          //console.log(extensionEnergy + spawn.energy);
          if ( (spawn.energy + extensionEnergy) >= (300)  ) {

            //console.log('spawn at energy capacity')
            // Find unique numbered name for creep
            sequenceNumber = 1;
            let newName = 'creep' + sequenceNumber;
            // While the name is not unique, generate new number
            while (Game.creeps[newName]) {
              sequenceNumber += 1;
              newName = 'creep' + sequenceNumber;
            }

            //console.log(newName);
            //console.log(Game.creeps);


            /*
            What to spawn decision making
            Currently breaking my game

            Mildely Working now
            */
            //console.log(population);
            if (population < 1) {
              //console.log('no?');
              console.log('Population is smaller than 1: SPAWNING UPGRADER');
              console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'upgrader'}} ));
            }
            else if (population == 1){
              console.log('Population is 1: SPAWNING HARVESTER');
              console.log(spawn.spawnCreep( [WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}}));
            }
            else if (population > 1){

              console.log('Population is bigger than 1');

              if (upgraders[0] && harvesters[0]) {

                console.log('We have harvesters and upgraders');

                if (population == 2) {
                  console.log('Population: ' + population);
                  console.log('Population is 2: SPAWNING REPAIRER');
                  console.log(spawn.spawnCreep( [WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}}));
                }
                else if (harvesters.length < 2) {
                  console.log('Population: ' + population);
                  console.log('Less or equal harvesters than 2: SPAWNING HARVESTER');
                  console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'harvester'}} ));
                }
                else if (upgraders.length <= harvesters.length) {
                  console.log('Population: ' + population);
                  console.log('Less or equal number of upgraders than harvesters: SPAWNING UPGRADER');
                  console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'upgrader'}} ));
                }
                else if (builders.length < 2) {
                  console.log('Population: ' + population);
                  console.log('Less than 2 builders: SPAWNING BUILDER');
                  console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'builder'}} ));
                }
                else if (repairers.length < 2) {
                  console.log('Population: ' + population);
                  console.log('Less than two repairer: SPAWNING REPAIRER');
                  console.log(spawn.spawnCreep( [WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}}));
                }
                else if (wallRepairers.length < 3) {
                  console.log('Population: ' + population);
                  console.log('Less than two repairer: SPAWNING REPAIRER');
                  console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'wallRepairer'}}));
                }
                else {
                  console.log('Population: ' + population);
                  console.log('OTHER CASE: SPAWNING UPGRADER');
                  console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'upgrader'}} ));
                }
              }
              else if (!upgraders[0]) {
                console.log('Population: ' + population);
                console.log('No upgraders: SPAWNING UPGRADER');
                console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'upgrader'}} ));
              }
              else {
                console.log('Population: ' + population);
                console.log('No harvesters: SPAWNING HARVESTER');
                console.log(spawn.spawnCreep( [WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'harvester'}} ));
              }
            }
          }
        }
      }
    }
  }
};

module.exports = actionSpawn;
