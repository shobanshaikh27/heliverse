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
        // const uniqueDomains = [...new Set(selectedUsers.map(user => user.domain))];
        const team = await Team.create({
            name: teamName,
            // uniqueDomains: uniqueDomains,
            users: selectedUsers.map(user => ({ user: user._id, available: true })),
        });
        res.status(201).json({ team });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getTeam = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json(teams)
    } catch (error) {
        res.status(404).json({msg:"No teams found"})
    }
}
const getSingleTeam = async (req, res) => {
    try {
        const teamId = req.params.id;

        // Check if the team ID is valid
        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ error: 'Invalid Team ID' });
        }

        // Find the team by ID and populate the 'users' field with user details
        const team = await Team.findById(teamId).populate('users.user');

        // Check if the team exists
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        res.status(200).json({ team });
    } catch (error) {
        console.error('Error getting single team:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createTeam, getTeam,getSingleTeam }