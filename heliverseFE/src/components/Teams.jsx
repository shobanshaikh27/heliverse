import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


const Teams = () => {
    const [teamData, setTeamData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamMembersData, setTeamMembersData] = useState([]);
    const [selectTeamId, setSelectTeamId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://heliverse-internship.onrender.com/api/team`);
            const result = response.data;
            setTeamData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchTeamData = async () => {
        try {
            const response = await axios.get(`https://heliverse-internship.onrender.com/api/team/${selectTeamId}`);
            const result = response.data;
            setTeamMembersData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = async (team) => {
        setSelectedTeam(team);
        setIsModalOpen(true);
        setSelectTeamId(team._id);

        // Fetch team data
        try {
            setIsLoading(true);
            await fetchTeamData();
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedTeam(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchData();
        fetchTeamData();
    }, [selectTeamId, teamMembersData]); // Add selectTeamId as a dependency so that it fetches data when it changes

    return (
        <div>
            <h1 className='text-center text-4xl font-bold p-2'>Teams</h1>
            <div className='flex items-center justify-center flex-wrap'>
                {teamData.map((team, index) => (
                    <div key={index} onClick={() => openModal(team)}>
                        <Link to={`/teams/${team._id}`} className='text-center font-semibold'>
                            <div className='px-4 py-2 m-4 w-28 bg-slate-400 rounded-md'>
                                {team.name}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Modal for displaying team members */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Team Members Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <div className='flex justify-center items-center my-8'>
                    <div className="modal-content bg-slate-800 p-4 rounded-md text-white">
                        <h2 className="text-2xl mb-4">Team Name - {selectedTeam?.name}</h2>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {teamMembersData?.team?.users?.map(user => (
                                    <li key={user.user.id} className="mb-2">
                                        {`ID: ${user.user.id}, First Name: ${user.user.first_name}, Last Name: ${user.user.last_name}, Domain: ${user.user.domain}`}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button onClick={closeModal} className="bg-red-500 text-center hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded">
                            Close
                        </button>
                    </div>
                </div>
            </Modal>


        </div>
    );
};

export default Teams;
