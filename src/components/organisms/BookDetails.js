import '../styles.css';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React from "react";
import BookData from "../molecules/BookData";
import BookImage from "../atoms/BookImage";
import {DetailsWindow} from "./EventDetials.styles";
import NewEventModal from "../templates/NewEventModal";
import AddBookToShelfModal from "../templates/AddBookToShelfModal";


const BookDetails = ({ book,updateEvents }) => {
    return (
        <DetailsWindow>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <BookImage book={book} />
                </Grid>
                <Grid item xs={12} sm={6} md={8} container direction="column">
                    <BookData book={book} />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "right" }}>
                    <NewEventModal book={book} updateEvents={updateEvents} />
                    <AddBookToShelfModal book={book} />
                </Grid>
            </Grid>
        </DetailsWindow>
    );
}

export default BookDetails;