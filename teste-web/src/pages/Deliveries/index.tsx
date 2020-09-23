import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import apiClient from '../../services/apiClient';

import { format } from 'date-fns';

import Header from '../../components/Header/index';
import { 
    Title, 
    DeliveriesTable, 
    PackageIcon,
    MainContainer } from './styles'

import { Button } from '../Registry/styles'

import { FiFileText, FiChevronLeft } from 'react-icons/fi';
import boxIcon from './assets/package.png';


interface Delivery {
    id: string,
    companyName: string,
    date: Date,
    origin: {
        name: string,
        lat: number,
        lng: number
    },
    destination: {
        name: string,
        lat: number,
        lng: number
    }
};

const Deliveries: React.FunctionComponent = () => {
     
    const [allDeliveries, setDeliveries] = useState<Delivery[]>([])

    useEffect(() => {
        apiClient.get('/deliveries/').then(response => {
            setDeliveries(response.data)
        })
    }, [])


    if (allDeliveries.length === 0) {
        return (
            <>
                <Header />
                <MainContainer>
                    <Link to='/'>
                        <FiChevronLeft size={44.5} />
                    </Link>
                    <PackageIcon src={boxIcon} alt="Caixa vazia"/>
                    <p>Não foram encontrados registros pendentes.</p>
                </MainContainer>
            </>
        )
    }

    return (
        <>
            <Header />
            <MainContainer>
                <Link to='/'>
                    <FiChevronLeft size={44.5} />
                </Link>
                <Title>Entregas registradas</Title>
                <DeliveriesTable>
                    <thead>
                        <tr>
                            <th>Detalhes</th>
                            <th>Empresa</th>
                            <th>Data</th>
                            <th>Ponto de coleta</th>
                            <th>Ponto de entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allDeliveries.map(delivery => (
                        <tr key={delivery.id}>
                            <td style={{ width: '2px' }}>
                                <Link to={`overview/${delivery.id}`}>
                                    <button>
                                        <FiFileText size={20} />
                                    </button>
                                </Link>
                            </td>
                            <td>{delivery.companyName}</td>
                            <td>{format(new Date(delivery.date), 'dd/MM/yyyy')}</td>
                            <td>{delivery.origin.name}</td>
                            <td>{delivery.destination.name}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>
                                <span>
                                    Entregas pendentes: {allDeliveries.length !== 0 ? allDeliveries.length : "Não identificamos nenhuma entrega pendente."}
                                </span>
                            </td>
                        </tr>
                    </tfoot>
                </DeliveriesTable>
            </MainContainer>
        </>
    );

}

export default Deliveries;