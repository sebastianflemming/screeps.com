/*

  Module for repairer role

*/

var roleRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.repairing && creep.carry.energy == 0) {
          creep.memory.repairing = false;
          creep.say('🔄 harvest');
    }

    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
        creep.memory.repairing = true;
        creep.say('⚡ repairing');
    }

    // Try to repair :)
    if(creep.memory.repairing) {
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
      });

      if (structure != undefined) {
        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
    }

    else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
}


var roleWallRepairer = {

  run: function(creep) {
    if(creep.memory.repairingWall && creep.carry.energy == 0) {
          creep.memory.repairingWall = false;
          creep.say('🔄 harvest');
    }

    if(!creep.memory.repairingWall && creep.carry.energy == creep.carryCapacity) {
        creep.memory.repairingWall = true;
        creep.say('⚡ repairing wall');
    }

    // Try to repair a wall
/*
        // Find wall with lowest hitpoints
        // Keeps switching wall after every tick

        var wallRepairs = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL});
        var wallHits = {};

        for (name in wallRepairs) {
          hitpoints = wallRepairs[name].hits;
          wallHits[name] = hitpoints;
        };

        structure = wallRepairs[(Object.keys(wallHits).reduce(function(a, b){ return wallHits[a] < wallHits[b] ? a : b }))];

        if (structure != undefined) {
          if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure.pos);
        }
      }
*/
    if(creep.memory.repairingWall) {
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL && s.hits < 100000
      });

      if (structure != undefined) {
        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
      else {
        var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL
        });
        if (structure != undefined) {
          if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
          }
        }        
      }
    }
    else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
}


module.exports = roleRepairer;
module.exports = roleWallRepairer;
