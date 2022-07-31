const { User, Thought } = require('../models');

const thoughtController = {

    getEveryThoughts(req,res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbthoughtData => res.json(dbthoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err); 
            }); 
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions', 
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
}