import React, { useState } from 'react';
import FlipCard from './FlipCard';
import axios from 'axios';

const FlipCardList = ({ userData }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamName, setTeamName] = useState('');

    const handleCheckboxChange = (userId) => {
        // Check if the user is already selected
        const isSelected = selectedUsers.includes(userId);

        // If selected, remove from the array; otherwise, add to the array
        setSelectedUsers((prevSelectedUsers) =>
            isSelected
                ? prevSelectedUsers.filter((id) => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    const handleAddToTeam = () => {
        // Open the modal when the "Add to Team" button is clicked
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        // Close the modal and reset the team name when closing
        setIsModalOpen(false);
        setTeamName('');
    };
    // console.log("Selected Users",selectedUsers)

    const handleAddTeam = async () => {
        try {
            // Make sure a team name is provided
            if (!teamName) {
                console.log('Team name is required');
                return;
            }

            // Make a POST request to your backend API to create a team
            const response = await axios.post('http://localhost:5000/api/team', {
                name: teamName,
                selectedUserIds: selectedUsers,
            });

            // Check the response status and handle accordingly
            if (response.status === 201) {
                console.log('Team created successfully:', response.data.team);
            } else {
                console.error('Failed to create team');
            }
        } catch (error) {
            console.error('Error creating team:', error);
        } finally {
            // Close the modal and reset the team name after processing
            setIsModalOpen(false);
            setTeamName('');
        }
    };

    const handleClearSelection = () => {
        // Clear the selected users
        setSelectedUsers([]);
    };

    return (
        <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[40px] place-items-center">
                {userData.map((user) => (
                    <div className="flex flex-col justify-center items-center gap-5" key={user.id}>
                        <FlipCard user={user} />
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(user._id)}
                                checked={selectedUsers.includes(user._id)}
                                disabled={!user.available}
                                className="form-checkbox text-blue-500"
                            />
                            <span className="ml-2">Add User</span>
                        </label>
                    </div>
                ))}
            </div>

            {/* Display selected users at the end of the page */}
            {selectedUsers.length > 0 && (
                <div className="mt-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-blue-500">Selected Users</h2>
                    <ul className="list-disc list-inside">
                        {selectedUsers.map((name, index) => (
                            <li key={index} className="text-lg">
                                User Name: {name}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleAddToTeam}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                    >
                        Add to Team
                    </button>
                    <button
                        onClick={handleClearSelection}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline-red"
                    >
                        Clear Selection
                    </button>
                </div>
            )}

            {/* Modal for adding to team */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white w-96 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-500">Add to Team</h2>
                        <label className="block mb-2">
                            Team Name:
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="form-input mt-1 block w-full border border-blue-300 rounded-lg"
                                placeholder='  Enter Team Name'
                                required
                            />
                        </label>
                        <button
                            onClick={handleAddTeam}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline-blue"
                        >
                            Create Team
                        </button>
                        <button
                            onClick={handleModalClose}
                            className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mt-2 ml-2 focus:outline-none focus:shadow-outline-gray"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlipCardList;
