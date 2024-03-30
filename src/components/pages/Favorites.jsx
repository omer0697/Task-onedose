import React , {useEffect, useState} from 'react'
import { Card } from 'antd';
import axios from 'axios';
const { Meta } = Card;

const Favorites = () => {
    const [favorites, setFavorites] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []);
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("https://rickandmortyapi.com/api/character")
        .then(response => {
            console.log(response.data.results)
            setData(response.data.results.filter(character => {
                return favorites.map(favorite => favorite.id).includes(character.id)
            }))
        })
    }
    , [favorites]);

  return (
    <div className='flex flex-row flex-wrap items-center justify-center'>
        {data.map(character => {
            console.log(character)
            return (
                <Card 
                    hoverable 
                    key={character.id} 
                    title={character.name} 
                    style={{ width: 300 , }}
                    className='m-3 from from-gray-200 to-gray-400 bg-gradient-to-r'
                    >
                    <img className='pb-4' src={character.image} alt={character.name} />
                    <Meta title={character.species} description = {character ? character.location.name : ''} />
                </Card>
            )
        }
        )}
    </div>
    )
}

export default Favorites