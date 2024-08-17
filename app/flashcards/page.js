'use client'

import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch, setDoc } from "@firebase/firestore";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";


export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if(!user) return;
            const docRef = doc(db, "users", user.id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            }
            else {
                await setDoc(docRef, {flashcards: []});
            }
        }
        getFlashcards();
    }, [user]);

    if(!isLoaded || !isSignedIn) return <></>

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);

    }

    return (
        <Container>
            <Grid container spacing={2}>
                {flashcards.map((flashcard, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

