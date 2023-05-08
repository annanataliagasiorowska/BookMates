import React, { useState, useEffect } from 'react';
import BookDetails from '../components/organisms/BookDetails';
import Description from '../components/atoms/Description';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Box} from "@mui/material";
import CardsPanel from "../components/templates/CardsPanel";
import SectionHeader from "../components/atoms/SectionHeader";
import {MainContainer} from "../components/Container.styles";


const Book = () => {
    const bookHeader = "O tytule"
    const [book, setBook] = useState({});
    const [events, setEvents] = useState([]);
    const [eventsNumber, setEventsNumber] = useState(0);
    const { id } = useParams();
    const eventsHeader = "Wydarzenia";

    useEffect(() => {
        axios.get('http://localhost:8080/api/books/search/' + id)
            .then(response => {
                    setBook(response.data);
                }
            )
            .catch(error => console.log(error));
    }, [id]);

    useEffect(() => {
            axios.get('http://localhost:8080/api/books/'+ id +'/events')
                .then(response => {
                    setEvents(response.data);
                    setEventsNumber(events.length)
                    }
                )
                .catch(error => console.log(error));
    }, [eventsNumber]);

    return (
        <MainContainer>
            <SectionHeader header={bookHeader} />
            <Box sx={{mt: 5}}>
                <BookDetails book={book} />
                <Description description={book.description} />
                <CardsPanel elements={events} header={eventsHeader}/>
            </Box>
        </ MainContainer>
    );
};

export default Book;