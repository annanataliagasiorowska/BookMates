import React, {useEffect, useState} from 'react';
import axios from "axios";
import CardsPanel from "../components/CardsPanel";
import {ContainerSize} from "../components/Container.styles";
import {TablePagination} from "@mui/material";
import SearchBar from "../components/SearchBar";

const Events = () =>{
    const eventsHeader = "Wszystkie wydarzenia";
    const [events, setEvents] = useState([]);
    const [eventsCount, setEventsCount] = useState(0);
    const [page, setPage] = useState(
        {
            page: 0,
            rowsPerPage: 12
        }
    );

    const handlePageChange = (event, newPage) => {
        setPage({
            ...page,
            page: newPage
        });
    };
    const handleChangeRowsPerPage = (event) => {
        setPage({
            ...page,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        });
    };

    useEffect(() => {
            axios.get(`http://localhost:8080/api/events?page=${page.page}&size=${page.rowsPerPage}` )
                .then(response => {
                    setEvents(response.data.content);
                    setEventsCount(response.data.totalElements);
                    }
                )
                .catch(error => console.log(error));
    }, [page]);


    const [searchedEvents, setSearchedEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!searchedEvents.length) {
            axios.get('http://localhost:8080/api/events/all')
                .then(response => {
                    setSearchedEvents(response.data)
                })
                .catch(error => console.log(error))
        }
    })

    const handleSearch = (value) => {
        setSearchQuery(value);
        const searchedEvent = searchedEvents.filter(function (element)
            {
                return element.book.author.toLowerCase().includes(searchQuery) || element.book.title.toLowerCase().includes(searchQuery);
            }
        );
        setEvents(searchedEvent);
    };


    return (
        <ContainerSize>
            <SearchBar
                placeholder="Szukaj wydarzeń według autora lub tytułu książki.."
                onChange={(event) => handleSearch(event.target.value)}
            />
            <CardsPanel elements={events} header={eventsHeader} />
            {searchQuery.length >0 ?null : <TablePagination
                component="div"
                rowsPerPageOptions={[12,24, 48, 96]}
                onPageChange={handlePageChange}
                page={page.page}
                count={eventsCount}
                rowsPerPage={page.rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='Ilość wydarzeń na stronie'
            />}


        </ContainerSize>
    );
};

export default Events;