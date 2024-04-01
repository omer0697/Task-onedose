import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import {Descriptions } from 'antd';

const CharacterDetail = () => {
    let { id } = useParams();
    const [character, setCharacter] = useState({})

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => {
            setCharacter(response.data)
        })
    }, [id]);
    
    const items = [
        { label: 'ID', children: character.id},
        { label: 'Created', children: new Date(character.created).toLocaleString() },
        { label: 'CharacterName', children: character.name },
        { label: 'Image', children: <img src={character.image} alt={character.name} className='w-20 h-1/4 rounded-full'/> },
        { label: 'Status', children: character.status },
        { label: 'Species', children: character.species },
        { label: "Gender", children: character.gender },
        { label: "Origin", children: character.origin?.name },
        { label: "Location", children: character.location?.name },
        { label: "Episode", children: character.episode?.length },
        { label: "Type", children: character.type}
    ]

  return (
    <div>
        <Descriptions title="Character Info" bordered items={items} />
    </div>
    )
}

export default CharacterDetail