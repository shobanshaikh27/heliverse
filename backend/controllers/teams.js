
const Team = require('../models/Teams.js');
const User = require('../models/Users.js');

const createTeam = async (req, res) => {
    try {
        const selectedUserIds = req.body.selectedUserIds;
        if (selectedUserIds.length === 0) {
            return res.status(400).json({ error: 'No selected users provided' });
        }
        const selectedUsers = await User.find({ _id: { $in: selectedUserIds } });
        const teamName = req.body.name;
        const uniqueDomains = [...new Set(selectedUsers.map(user => user.domain))];
        const team = await Team.create({
            name: teamName,
            uniqueDomains: uniqueDomains,
            users: selectedUsers.map(user => ({ user: user._id, available: true })),
        });
        res.status(201).json({ team });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getTeam = async (req, res) => {
}
module.exports = { createTeam, getTeam }