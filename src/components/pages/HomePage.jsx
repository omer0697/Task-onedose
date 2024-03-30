import React , {useEffect, useState} from 'react'
import Navbar from '../ui/Navbar/Navbar'
import { jwtDecode } from 'jwt-decode';
import CustomTable from '../ui/Table/Table';
import axios from 'axios';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import useDebounce from '../../hooks/useDelayedInput ';

const HomePage = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const debouncedQuery  = useDebounce(search, 500)
    const [favorites, setFavorites] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []);
    
    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
        .then(response => {
            setData(response.data.results)
        })
      }, []);

      useEffect(() => {
        try {
          axios.get(`https://rickandmortyapi.com/api/character/?name=${debouncedQuery}`)
          .then(response => {
            setData(response.data.results)
          })
        } catch (error) {
          console.log(error)
        }
      }
      , [debouncedQuery]);

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text, record) => {
            return <Link className='text-blue-500' to={`/character/${record.id}`}>{record.name}</Link>
          }
        },
        {
          title: 'Gender',
          dataIndex:"gender",
        },
        {
          title: 'Status',
          dataIndex: 'status',
        },
        {
          title: 'Species',
          dataIndex: 'species',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          render: (text, record) => (
            <img src={record.image} alt={record.name} style={{width: '50px', height: '50px'}}/>
          )
        },
        {
          title: 'Location',
          dataIndex: 'location',
          render: (text, record) => (
            <span>{record.location.name}</span>
          )
        },
        {
          title : "Fovorilere Ekle",
          dataIndex: 'id',
          render: (text, record) => {
            let isFavorite = false;
            const favoritesString = localStorage.getItem('favorites');
            if (favoritesString) {
              const favorites = JSON.parse(favoritesString);
              isFavorite = favorites.findIndex(fav => fav.id === record.id) !== -1;
            }
            return (
              <button 
              key={record.id}
              onClick={() => handleAddToFavorites(record.id)}>
                {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              </button>
            );
          }
        }
      ]

      function handleAddToFavorites (id) {
        let newFavorites = [];
        const favoritesString = localStorage.getItem('favorites');
        if (favoritesString) {
          newFavorites = JSON.parse(favoritesString);
        }
        const index = newFavorites.findIndex(fav => fav.id === id);
        if (index === -1) {
          newFavorites.push({id});
        } else {
          newFavorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
      }
        
  return (
    <div>
      <div className=' flex flex-col gap-5'>
        <Input size='large' placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
        <CustomTable columns={columns} data={data}/>
      </div>
    </div>
  )
}

export default HomePage
