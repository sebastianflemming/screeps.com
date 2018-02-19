//Get every extension structure, and act upon it by querying the room, asking every spawn to query it's room
//Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}}).forEach(function(extension){console.log(extension.energy)})

for (var name in Game.spawns) {
  spawn = Game.spawns[name];
  if (spawn.energy < spawn.energyCapacity) {
    spawn.room.find(FIND_STRUCTURES,
      {filter: {structureType: STRUCTURE_EXTENSION}}.forEach(
        function(extension) {
          if (extension.energyCapacity < 0 && spawn.energy <spawn.energyCapacity) {
            extension.transfer
          }
        }
      )
    );
  }
}
