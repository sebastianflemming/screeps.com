/*

  Module for builder role

*/

var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('⚡ build');
    }

    if(creep.memory.building) {
      //console.log(creep);
      let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      //console.log(target);

      if(target) {
        //console.log('buildingBuilder');
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {visualizePathStyle: {stroke: '#bbaa00'}});
        }
        //else {
        //  console.log('Building target: ' + target);
        //  creep.build(target);
        //}
      }
    }
    else {
        //console.log('harvestingBuilder');
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
    }
}


module.exports = roleBuilder;
