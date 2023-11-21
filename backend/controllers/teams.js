const { default: mongoose } = require('mongoose');
const Team = require('../models/Teams.js');
const User = require('../models/Users.js');

const createTeam = async (req, res,next) => {
    try {
        const { name, users } = req.body;

        // Ensure team_members contain unique user IDs
        const uniqueMembers = new Set(users);
    
        if (uniqueMembers.size !== users.length) {
          return next(
            createError(400, "Duplicate user IDs found in team members.")
          );
        }
    
        const newTeam = new Team({
          name,
          users,
        });
    
        const savedTeam = await newTeam.save();
    
        return res.status(201).json({ team: savedTeam });
      } catch (err) {
          return next(createError(err.statusCode, err.message));
        }
    };
    //     const selectedUserIds = req.body.selectedUserIds;
    //     if (selectedUserIds.length === 0) {
    //         return res.status(400).json({ error: 'No selected users provided' });
    //     }
    //     const selectedUsers = await User.find({ _id: { $in: selectedUserIds } });
    //     const teamName = req.body.name;
    //     // const uniqueDomains = [...new Set(selectedUsers.map(user => user.domain))];
    //     const team = await Team.create({
    //         name: teamName,
    //         // uniqueDomains: uniqueDomains,
    //         users: selectedUsers.map(user => ({ user: user._id, available: true })),
    //     });
    //     res.status(201).json({ team });
    // } catch (error) {
    //     console.error('Error creating team:', error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
const getTeam = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json(teams)
    } catch (error) {
        res.status(404).json({msg:"No teams found"})
    }
}
// const getSingleTeam = async (req, res) => {
//     try {
//         const teamId = req.params.id;

//         // Check if the team ID is valid
//         if (!mongoose.Types.ObjectId.isValid(teamId)) {
//             return res.status(400).json({ error: 'Invalid Team ID' });
//         }

//         const team = await Team.findById(teamId).populate('users.user');
//         if (!team) {
//             return res.status(404).json({ msg: 'Team not found' });
//         }

//         res.status(200).json({ team });
//     } catch (error) {
//         console.error('Error getting single team:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const getSingleTeam = async (req, res) => {
    try {
        const teamId = req.params.id;

        // Check if the team ID is valid
        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ error: 'Invalid Team ID' });
        }

        const team = await Team.findById(teamId).populate('users.user');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Map user details to a more readable format
        const formattedUsers = team.users.map((user) => ({
            id: user.user.id,
            firstName: user.user.first_name,
            lastName: user.user.last_name,
            email: user.user.email,
            gender: user.user.gender,
            avatar: user.user.avatar,
            domain: user.user.domain,
            available: user.available,
        }));

        const formattedTeam = {
            _id: team._id,
            name: team.name,
            users: formattedUsers,
        };

        res.status(200).json({ team: formattedTeam });
    } catch (error) {
        console.error('Error getting single team:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { createTeam, getTeam,getSingleTeam }
// import Team from "../models/Teams.js";
// import { createError } from "../error.js";

// export const createTeam = async (req, res, next) => {
//   try {
//     const { team_name, team_members } = req.body;

//     // Ensure team_members contain unique user IDs
//     const uniqueMembers = new Set(team_members);

//     if (uniqueMembers.size !== team_members.length) {
//       return next(
//         createError(400, "Duplicate user IDs found in team members.")
//       );
//     }

//     const newTeam = new Team({
//       team_name,
      
//       team_members,
//     });

//     const savedTeam = await newTeam.save();

//     return res.status(201).json({ team: savedTeam });
//   } catch (err) {
//     return next(createError(err.statusCode, err.message));
//   }
// };

// export const getTeams = async (req, res, next) => {
//   try {
//     const team = await Team.find().populate(
//       "team_members",
//       "first_name last_name avatar email domain available"
//     );

//     return res.status(200).json({ team });
//   } catch (err) {
//     return next(createError(err.statusCode, err.message));
//   }
// };

// export const getTeamById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const team = await Team.findById(id).populate(
//       "team_members",
//       "full_name domain available"
//     );

//     if (!team) {
//       return next(createError(404, "Team not found"));
//     }

//     return res.status(200).json({ team });
//   } catch (err) {
//     return next(createError(err.statusCode, err.message));
//   }
// };