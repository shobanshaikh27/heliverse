import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const Teams = () => {
    const [teamData, setTeamData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://heliverse-internship.onrender.com/api/team`);
            const result = response.data;
            setTeamData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = (team) => {
        setSelectedTeam(team);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTeam(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1 className='text-center text-4xl font-bold p-2'>Teams</h1>
            <div className='flex items-center justify-center'>
                {teamData.map((team, index) => (
                    <Link to="#" onClick={() => openModal(team)} className='text-center font-semibold'>
                        <div key={index} className='px-4 py-2 m-4 w-28 bg-slate-400 rounded-md'>
                            {team.name}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Modal for displaying team members */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Team Members Modal"
            >
                <h2>Team Members - {selectedTeam?.name}</h2>
                {console.log("selected temin teams",selectedTeam)}
                <ul>
                    {selectedTeam?.users.map((user) => (
                        <li key={user._id}>
                            {`${user.user.first_name} ${user.user.last_name}`}
                        </li>
                    ))}
                </ul>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default Teams;
