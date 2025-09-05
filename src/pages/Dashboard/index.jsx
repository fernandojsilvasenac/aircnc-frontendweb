import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import socketio from 'socket.io-client';

import './styles.css';

export function Dashboard(){
    const [spots, setSpots ] = useState([])
    const preview = 'http://localhost:3335/files';
    
    const user_id = localStorage.getItem('user');
    const socket = useMemo( ()=> socketio('http://localhost:3335',{
        query: { user_id }
    }),[user_id])
    
    useEffect( () => {
        console.log('socket: ', socket);
        console.log('socket conectado', socket.connected)
    },[socket])


    useEffect( () => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }

        loadSpots()
    }, [])


    return (
        <>
        <ul className='spot-list'>
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${preview}/${spot.thumbnail})`}} />
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}` : 'GRATUITO' }</span>
                </li>
            ))
            }

        </ul>
            <Link to='/new'>
                <button className='btn'>Cadastrar novo Spot</button>
            </Link>
        </>
    )
}