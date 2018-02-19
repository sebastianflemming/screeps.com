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

module.exports = roleRepairer;
