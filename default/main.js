var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

  // Cleanup memory objects of dead creeps
  /*
  Cleanup code disabled due to high probability of bugs
  Do not remove, understand why this breaks the game first!!
  
  for (creep in Memory.creeps) {
    if (Game.creeps[creep] === undefined ) {
      delete Memory.creeps[creep]
    }
  }

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
  else if(!spawn.spawning && spawn.energy == spawn.energyCapacity) {
    for (let name in Game.spawns) {
      var spawn = Game.spawns[name];
      if (spawn.energy == spawn.energyCapacity) {
        console.log(spawn.spawnCreep([WORK, CARRY, CARRY, MOVE]));
      }
    }
  }

}

  // Loop running the creeps
  for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      //console.log(name);
      if(creep.memory.role == 'harvester') {
          roleHarvester.run(creep);
      }
      else if(creep.memory.role == 'upgrader') {
          roleUpgrader.run(creep);
      }
      else if(!creep.memory.role) {
        Math.floor(Math.random * 2)
      }
  }

}
