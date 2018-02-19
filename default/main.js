var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var actionSpawn = require('action.spawn');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

  // Cleanup memory objects of dead creeps

  for (creep in Memory.creeps) {
    if (Game.creeps[creep] === undefined ) {
      delete Memory.creeps[creep]
    }
  }

  //console.log('spawn?')
  actionSpawn.run();
  //roleBuilder.run();

  // Loop running the creeps
  for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      //console.log(name);
      if(creep.memory.role == 'harvester') {
          roleHarvester.run(creep);
      }
      else if(creep.memory.role == 'upgrader') {
          //console.log('creep mofo')
          roleUpgrader.run(creep);
      }
      else if(creep.memory.role == 'builder') {
          roleBuilder.run(creep);
      }
      else if(creep.memory.role == 'repairer') {
          roleRepairer.run(creep);
      }
      // If the creep does not have a role, flip a coin to decide
      // A++ AI in action right there...
      else if(!creep.memory.role) {
        if (Math.floor(Math.random() * 2)) {
          creep.memory.role = 'upgrader';
          roleUpgrader.run(creep);
          //console.log(creep);
        }
        else {
          creep.memory.role = 'harvester';
          roleHarvester.run(creep);
          //console.log(creep);
        }
      }
  }

}
