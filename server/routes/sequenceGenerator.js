var Sequence = require('../models/sequence');

var maxEntryId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      sequenceId = sequence._id;
      maxEntryId = sequence.maxEntryId;  
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) { //Will leave switch statement in case I decide to add more components
    case 'entries':
      maxEntryId++;
      updateObject = {maxEntryId: maxEntryId};
      nextId = maxEntryId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
