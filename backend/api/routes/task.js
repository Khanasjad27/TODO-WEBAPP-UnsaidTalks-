const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth, (req, res, next) => {
    Task.find({ owner: req.userdata.userId })
        .then(tasks => {
            const responces = {
                message: "All Tasks fetched successfully",
                count: tasks.length,
                tasks: tasks.map(task => {
                    return {
                        _id: task._id,
                        title: task.title,
                        due_date: task.due_date,
                        status: task.status,
                        request: {
                            type: "GET",
                            url: 'http://localhost:3000/api/task/' + task._id
                        }
                    }
                })
            }
            res.status(200).json(responces);
        }).catch(err => {
            res.status(500).json({ message: 'Not able to fetch tasks', error: err });
        });
});

router.get("/:taskId", checkAuth, (req, res, next) => {
    const id = req.params.taskId;
    const owner = req.userdata.userId;
    Task.findOne({ _id: id, owner: owner })
        .then(task => {
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({
                message: "Task fetched successfully",
                task: {
                    _id: task._id,
                    title: task.title,
                    created_at: task.created_at,
                    due_date: task.due_date,
                    status: task.status,
                    owner: task.owner,
                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/api/task/'
                    }
                }
            })
        }).catch(err => {
            res.status(500).json({ message: 'Not able to fetch tasks', error: err });
        });
});

router.post("/", checkAuth, (req, res, next) => {
    const { title, due_date } = req.body;
    if (!title || !due_date) {
        return res.status(400).json({ message: "Please provide title and due_date for the task." });
    }
    const newtask = new Task({
        owner: req.userdata.userId,
        title: title,
        due_date: due_date,
        created_at: new Date(),
    });

    newtask.save()
        .then(task => {
            res.status(200).json({
                message: "Task created successfully",
                createdTask: {
                    _id: task._id,
                    title: task.title,
                    created_at: task.created_at,
                    due_date: task.due_date,
                    status: task.status,
                    owner: task.owner,
                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/api/task/' + task._id
                    }
                }
            })
        }).catch(err => {
            res.status(500).json({ message: 'Not able to create task', error: err });
        });
});
router.patch("/:taskId", checkAuth, async (req, res) => {

    try {

        const id = req.params.taskId;
        const owner = req.userdata.userId;
        const { status } = req.body;

        const task = await Task.findOne({ _id: id, owner });

        if (!task) {
            return res.status(404).json({
                message: "Task not found or not authorized"
            });
        }

        task.status = status;

        await task.save();

        res.status(200).json({
            message: "Task status updated successfully",
            task
        });

    } catch (err) {

        res.status(500).json({
            message: "Server error while updating task",
            error: err
        });

    }

});

router.delete('/:taskId', checkAuth, (req, res, next) => {
    const id = req.params.taskId;
    const owner = req.userdata.userId;

    Task.deleteOne({ _id: id, owner })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Task not found or not authorized'
                });
            }

            return res.status(200).json({
                message: 'Task deleted successfully'
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Server error while deleting task'
            });
        });
});


module.exports = router;