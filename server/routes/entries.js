var express = require('express');
var router = express.Router();
const Entry = require('../models/entry');
const sequenceGenerator =  require('./sequenceGenerator')

router.get('/', (req, res, next) => {
    console.log("Get entries called")
    Entry.find()
      .then(entries => {
        res.status(200).json({
            message: 'Entries fetched successfully!',
            allEntries: entries
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

  router.get('/:id', (req, res, next) => {
    console.log("Get entry called")
    console.log(req.params.id);
    Entry.find({id: req.params.id})
      .then(entry => {
        console.log("Success")
        res.status(200).json({
            message: 'Entry fetched successfully!',
            entry: entry
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

  router.post('/', (req, res, next) => {
    const maxEntryId = sequenceGenerator.nextId("entries");
  
    const entry = new Entry({
      id: maxEntryId,
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      location: req.body.location,
      images: req.body.images
    });
  
    entry.save()
      .then(createdEntry => {
        res.status(201).json({
          message: 'entry added successfully',
          entry: createdEntry
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
          console.log(error);
      });
  });
  
router.put('/:id', (req, res, next) => {
    Entry.findOne({ id: req.params.id })
      .then(entry => {
        entry.id = req.body.id
        entry.title = req.body.title;
        entry.date = req.body.date;
        entry.description = req.body.description
        entry.location = req.body.location;
        entry.images = req.body.images;
  
        Entry.updateOne({ id: req.params.id }, entry)
          .then(result => {
            res.status(204).json({
              message: 'entry updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'entry not found.',
          error: { entry: 'entry not found'}
        });
      });
  });


  router.delete("/:id", (req, res, next) => {
    Entry.findOne({ id: req.params.id })
      .then(entry => {
        Entry.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "entry deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'entry not found.',
          error: { entry: 'entry not found'}
        });
      });
    });

module.exports = router; 