var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var actionSpawn = require('action.spawn');

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
actionSpawn.run();

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
