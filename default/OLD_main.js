//var roleHarvester = require('role.harvester');
//var roleUpgrader = require('role.upgrader');

/*
module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Harvesters: ' + harvesters.length);
    //console.log('Upgraders: ' + upgraders.length);

    for (creep in Memory.creeps) {
      if (Game.creeps[creep] === undefined ) {
        delete Memory.creeps[creep]
      }
    }

    if(harvesters.length < 3) {
        var iteration = 1;
        var newName = 'Harvester' + harvesters.length + iteration;
        //console.log(newName);
        while (Game.creeps['newName']) {
          iteration += 1;
          newName = 'Harvester' + harvesters.length + iteration;
        }
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    else if(upgraders.length < 6) {
      var iteration = 1;
      var newName = 'Upgrader' + upgraders.length + iteration;
      while (Game.creeps['newName']) {
        iteration += 1;
        newName = 'Upgrader' + upgraders.length + iteration;
      }
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
*/
