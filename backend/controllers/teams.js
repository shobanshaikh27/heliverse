
const Team = require('../models/Teams.js');
const User = require('../models/Users.js'); // Adjust the path based on your file structure

const createTeam = async (req, res) => {
    try {
      // Assuming req.body.selectedUserIds is an array of selected user IDs
      const selectedUserIds = req.body.selectedUserIds;
  
      // Check if selectedUserIds is not empty
      if (selectedUserIds.length === 0) {
        return res.status(400).json({ error: 'No selected users provided' });
      }
  
      // Fetch the user documents based on the selected IDs
      const selectedUsers = await User.find({ _id: { $in: selectedUserIds } });
  
      // Assuming req.body.name is the team name
      const teamName = req.body.name;
  
      // Create an array of unique domains from selected users
      const uniqueDomains = [...new Set(selectedUsers.map(user => user.domain))];
  
      // Create the team with the selected users and unique domains
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
const getTeam = async(req,res)=>{
    
}
module.exports={createTeam,getTeam}