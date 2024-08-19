"use client";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { styled } from "@mui/material/styles";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TextIcon from "@mui/icons-material/TextFields";
import DocumentIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  AppBar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Link as MuiLink,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";

const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(15deg, #26c6da, #ffffff )",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "3rem",
  fontWeight: "bold",
}));

// const content = {
//     Text: {
//         heading: "Text-Based Flashcards",
//         description: "Prepare for your exams by converting your textual notes into interactive flashcards. Just input your text and our AI will handle the rest.",
//         steps: [
//             {
//                 title: "Step 1: Upload Your Text",
//                 description: "Paste or type your text here, and our AI will create flashcards based on your input.",
//                 image: "/images/text-step1.png",
//             },
//             {
//                 title: "Step 2: Review Your Flashcards",
//                 description: "Review and edit your flashcards if necessary before you start studying.",
//                 image: "/images/text-step2.png",
//             },
//             {
//                 title: "Step 3: Study and Test",
//                 description: "Test your knowledge with your newly created flashcards and get personalized feedback.",
//                 image: "/images/text-step3.png",
//             },
//         ],
//     },
//     Document: {
//         heading: "Document-Based Flashcards",
//         description: "Convert your documents like PDFs or PowerPoints into flashcards for a more comprehensive study session.",
//         steps: [
//             {
//                 title: "Step 1: Upload Your Document",
//                 description: "Upload your document and let our AI extract the key information for your flashcards.",
//                 image: "/images/document-step1.png",
//             },
//             {
//                 title: "Step 2: Review and Edit",
//                 description: "Check and adjust your flashcards to ensure accuracy and completeness.",
//                 image: "/images/document-step2.png",
//             },
//             {
//                 title: "Step 3: Study and Test",
//                 description: "Use your flashcards to test your knowledge and track your progress.",
//                 image: "/images/document-step3.png",
//             },
//         ],
//     },
//     Image: {
//         heading: "Image-Based Flashcards",
//         description: "Turn images into flashcards. Upload a picture, and our AI will generate flashcards based on the content of the image.",
//         steps: [
//             {
//                 title: "Step 1: Upload Your Image",
//                 description: "Upload an image and let our AI process it to create relevant flashcards.",
//                 image: "/images/image-step1.png",
//             },
//             {
//                 title: "Step 2: Refine Your Flashcards",
//                 description: "Edit the flashcards if necessary to ensure they meet your study needs.",
//                 image: "/images/image-step2.png",
//             },
//             {
//                 title: "Step 3: Study and Test",
//                 description: "Review and test your knowledge with the flashcards generated from your images.",
//                 image: "/images/image-step3.png",
//             },
//         ],
//     },
//     Video: {
//         heading: "Video-Based Flashcards",
//         description: "Extract key points from videos and create flashcards for an engaging study experience.",
//         steps: [
//             {
//                 title: "Step 1: Upload Your Video",
//                 description: "Upload your video, and our AI will extract relevant information to create flashcards.",
//                 image: "/images/video-step1.png",
//             },
//             {
//                 title: "Step 2: Customize Flashcards",
//                 description: "Edit and refine your flashcards based on the content extracted from your video.",
//                 image: "/images/video-step2.png",
//             },
//             {
//                 title: "Step 3: Study and Test",
//                 description: "Use your flashcards to study and test your knowledge effectively.",
//                 image: "/images/video-step3.png",
//             },
//         ],
//     },
// };

const faqs = [
  {
    question: "What is this app about?",
    answer:
      "This app is designed to help you create and manage flashcards effortlessly. Using AI technology, it transforms your text, images, and other documents into well-organized flashcards, making studying and test preparation more efficient.",
  },
  {
    question: "How can I get started?",
    answer:
      "You can get started by signing up for a free account. Once registered, you can upload your materials, and our AI will automatically generate flashcards for you. No complex setup is required—just upload and start studying!",
  },
  {
    question: "What features are available?",
    answer:
      "Our app offers a range of features including:\n\n- **Easy Text Input**: Upload your notes or type directly to generate flashcards.\n- **Smart Flashcards**: AI-powered creation of concise and effective flashcards from your materials. Accessible Anywhere: Study from any device with cloud sync. Customizable: Edit and organize your flashcards to suit your study needs. Practice Tests: Test your knowledge with built-in practice quizzes and receive feedback.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a free plan that allows you to use basic features without any cost. For additional features and enhanced functionality, you can explore our Basic or Pro plans.",
  },
  {
    question: "How do I contact support?",
    answer:
      "If you need assistance, you can reach out to our support team via the Contact Us page on our website or email us directly at support@example.com. We are here to help with any questions or issues you might have.",
  },
  {
    question: "Are my data and privacy protected?",
    answer:
      "Absolutely. We prioritize your privacy and data security. All your information is encrypted and stored securely, and we do not share your data with third parties without your consent.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time through your account settings. If you cancel, you will retain access to the paid features until the end of your billing cycle.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept various payment methods including major credit cards, PayPal, and other secure payment options. You can choose your preferred method during checkout.",
  },
];

export default function Home() {
  const [dynamicText, setDynamicText] = useState("");

  useEffect(() => {
    const text = "to Flashcard SaaS";
    let i = 0;
    const intervalId = setInterval(() => {
      setDynamicText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(intervalId);
      }
    }, 100);
  }, []);

  const handleSubmit = async (amount) => {
    try {
      const checkoutSession = await fetch(`/api/checkout_session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSession.status === 500) {
        console.error(
          "Error creating checkout session:",
          checkoutSessionJson.error
        );
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [selectedOption, setSelectedOption] = useState("Text");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Container maxWidth="100vw" disableGutters>
      <Head>
        <title>Flashcard SaaS</title>
        <meta
          name={"description"}
          content={"Create flashcard from your text"}
        />
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(145deg, #021526, #000, #0f4575)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#000" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Image src="/images/logo.png" alt="logo" width={60} height={50} />
            </Box>
            <SignedOut>
              <Button color="inherit" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            py: 8,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            <div>
              <GradientText variant="h2"> Welcome {dynamicText} </GradientText>
            </div>
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            The easiest way to make flashcards from your text
          </Typography>
          <IconButton
            sx={{
              mt: 2,
              width: 130,
              height: 130,
              borderRadius: "50%",
              border: "3px solid",
              borderColor: "#26c6da",
              "&:hover": {
                border: "4px solid",
                borderColor: "#3adbf0",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
            href="/generate"
          >
            <Typography
              variant="body2"
              sx={{ color: "white", mb: 1, fontSize: "1.2rem" }}
            >
              Get <ArrowOutwardIcon sx={{ color: "white" }} />
              Started
            </Typography>
          </IconButton>
        </Box>

        <Box sx={{ my: 6, textAlign: "center", px: 2 }}>
          <Typography variant="h4" gutterBottom>
            Key Features
          </Typography>
          <Typography variant="body1" paragraph>
            Discover how our AI-powered flashcard maker transforms your study
            experience with these standout features:
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid #26c6da",
                  borderRadius: 2,
                  backgroundColor: "rgba(2, 21, 38, 0.8)", // Dark background
                  color: "#fff", // Light text color
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Effortless Text Input
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    color: "#e0e0e0",
                    justifyContent: "left",

                  }}
                >
                  <CheckCircleIcon
                    sx={{ mr: 1, color: "#26c6da", fontSize: "1.2rem" }}
                  />
                  Just paste your text or upload documents and our system
                  instantly converts them into flashcards.
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                    color: "#e0e0e0",
                  }}
                  variant="body2"
                >
                  <CheckCircleIcon
                    sx={{ mr: 1, color: "#26c6da", fontSize: "1.2rem" }}
                  />
                  No complicated setup required. Get started in seconds.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid #26c6da",
                  borderRadius: 2,
                  backgroundColor: "rgba(2, 21, 38, 0.8)", 
                  color: "#fff", 
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Intelligent Flashcards
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    alignContent: "left",
                    color: "#e0e0e0",
                  }}
                >
                  <CheckCircleIcon
                    sx={{ mr: 1, color: "#26c6da", fontSize: "1.2rem" }}
                  />
                  Our AI analyzes your content and generates well-structured
                  flashcards that are easy to study.
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                    color: "#e0e0e0",
                  }}
                  variant="body2"
                >
                  <CheckCircleIcon
                    sx={{ mr: 1, color: "#26c6da", fontSize: "1.2rem" }}
                  />
                  Perfectly tailored for efficient learning and retention.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid #26c6da",
                  borderRadius: 2,
                  backgroundColor: "rgba(2, 21, 38, 0.8)", 
                  color: "#fff", 
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Study Anytime, Anywhere
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                    color: "#e0e0e0",
                  }}
                >
                  <CheckCircleIcon
                    sx={{ mr: 1, color: "#26c6da", fontSize: "1.2rem" }}
                  />
                  Your flashcards are accessible on any device, whether you're
                  on a laptop, tablet, or smartphone.
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                    color: "#e0e0e0",
                  }}
                  variant="body2"
                >
                  <CheckCircleIcon
                    sx={{ mr: 1, color: "#26c6da", fontSize: "1.2rem" }}
                  />
                  Enjoy seamless learning and review on the go.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h4" align="center" my="10" p="4" gutterBottom>
          AI Flashcard Generator
        </Typography>
        <Box sx={{ py: 4, px: 2, mx: 2, borderRadius: 3, border: 1 }}>
          <Typography align="center" variant="body1" pb={3} gutterBottom>
            Getting ready for a test, exam, or quiz? With Headstarter flashcard
            maker, you can instantly turn your pictures, notes, PDFs,
            PowerPoints, and other documents into flashcards using advanced AI
            technology. Just upload your study materials, and our AI will
            generate your flashcards in seconds, making your preparation easier
            than ever.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "transparent",
                  border: "2px solid #26c6da",
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{ mb: 2, border: 4, borderRadius: 4, overflow: "hidden" }}
                >
                  <Box
                    component="img"
                    src="/images/step1.webp"
                    alt="step1"
                    sx={{
                      width: { xs: "100%", sm: "100%" },
                      height: { xs: "auto", sm: "auto" },
                      maxWidth: "150px",
                      maxHeight: "400px",
                    }}
                  />
                </Box>
                <Typography variant="h5" gutterBottom>
                  Step 1
                </Typography>
                <Typography variant="body1">
                  Upload an image, snap a photo, or share a PDF, and our AI will
                  create flashcards for you—no account needed, and it’s
                  completely free.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "transparent",
                  border: "2px solid #26c6da",
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{ mb: 2, border: 4, borderRadius: 4, overflow: "hidden" }}
                >
                  <Box
                    component="img"
                    src="/images/step2.png"
                    alt="step2"
                    sx={{
                      width: { xs: "100%", sm: "100%" },
                      height: { xs: "auto", sm: "auto" },
                      maxWidth: "150px",
                      maxHeight: "400px",
                    }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Step 2
                </Typography>
                <Typography variant="body1">
                  Review your flashcards, share them, print them, or export them
                  to various platforms like Anki and more.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "transparent",
                  border: "2px solid #26c6da",
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{ mb: 2, border: 4, borderRadius: 4, overflow: "hidden" }}
                >
                  <Box
                    component="img"
                    src="/images/step3.png"
                    alt="step3"
                    sx={{
                      width: { xs: "100%", sm: "100%" },
                      height: { xs: "auto", sm: "auto" },
                      maxWidth: "150px",
                      maxHeight: "400px",
                    }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Step 3
                </Typography>
                <Typography variant="body1">
                  (Upcoming feature) After mastering your flashcards, switch to
                  exam mode. Test your knowledge and get personalized feedback
                  powered by AI.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* <Box sx={{ my: 6, textAlign: "center", px: 2 }}>
            <Typography variant="h4" gutterBottom>
                {content[selectedOption].heading}
            </Typography>
            <Typography variant="body1" paragraph>
                {content[selectedOption].description}
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {content[selectedOption].steps.map((step, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                border: "1px solid #26c6da",
                                borderRadius: 2,
                                backgroundColor: "rgba(2, 21, 38, 0.8)",
                                color: "#fff",
                                transition: "transform 0.3s, box-shadow 0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                                },
                            }}
                        >
                            <img
                                src={step.image}
                                alt={step.title}
                                width="100%"
                                style={{ borderRadius: '8px' }}
                            />
                            <Typography variant="h6" gutterBottom>
                                {step.title}
                            </Typography>
                            <Typography>{step.description}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Select Flashcard Type
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {Object.keys(content).map((option) => (
                        <Grid item key={option}>
                            <Button
                                variant={selectedOption === option ? "contained" : "outlined"}
                                color={selectedOption === option ? "primary" : "default"}
                                onClick={() => handleOptionChange(option)}
                                startIcon={
                                    {
                                        Text: <TextIcon />,
                                        Document: <DocumentIcon />,
                                        Image: <ImageIcon />,
                                        Video: <VideoIcon />
                                    }[option]
                                }
                            >
                                {option}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box> */}

        <Box sx={{ my: 10, textAlign: "center", px: 2 }}>
          <Typography variant="h4" gutterBottom>
            Pricing Plans
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Get Started Plan */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  border: "1px solid #26c6da",
                  borderRadius: 2,
                  backgroundColor: "rgba(2, 21, 38, 0.8)",
                  color: "#fff",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Get Started
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $0 / month
                </Typography>
                <Typography gutterBottom>No subscription required</Typography>
                <Typography variant="body1" textAlign="left">
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Unlimited
                  non-AI Flashcards
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> 20 exam
                  mode answers
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> 20,000
                  characters per text upload
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> No
                  document uploading
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> No
                  exporting
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Limited
                  new features
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 3, color: "#26c6da", borderColor: "#26c6da" }}
                  href="/generate"
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            {/* Basic Plan */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  border: "1px solid #26c6da",
                  borderRadius: 2,
                  backgroundColor: "rgba(2, 21, 38, 0.8)",
                  color: "#fff",
                }}
              >
                <Typography variant="h5" color="yellow" gutterBottom>
                  Basic
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $5 / month
                </Typography>
                <Typography gutterBottom textDecoration="underline">
                  Billed monthly
                </Typography>
                <Typography variant="body1" textAlign="left">
                  <CheckCircleIcon sx={{ mr: 1, color: "#c9a71e" }} /> Unlimited
                  non-AI Flashcards
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#c9a71e" }} /> 50 exam
                  mode answers
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> 40,000
                  characters per text upload
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Document
                  uploading
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Export to
                  Anki, PDF, and more
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Access to
                  new features
                </Typography>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ mt: 3 }}
                  onClick={() => handleSubmit(5)}
                >
                  Choose Basic
                </Button>
              </Box>
            </Grid>
            {/* Pro Plan */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  border: "1px solid #26c6da",
                  borderRadius: 2,
                  backgroundColor: "rgba(2, 21, 38, 0.8)",
                  color: "#fff",
                }}
              >
                <Typography variant="h5" color="gold" gutterBottom>
                  Pro
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $10 / month
                </Typography>
                <Typography gutterBottom>Billed monthly</Typography>
                <Typography variant="body1" textAlign="left">
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Unlimited
                  AI Flashcards
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Unlimited
                  exam mode answers
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> 60,000
                  characters per text upload
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Document
                  uploading
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Export to
                  Anki, PDF, and more
                  <br />
                  <CheckCircleIcon sx={{ mr: 1, color: "#26c6da" }} /> Priority
                  support and access to new features
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={() => handleSubmit(10)}
                >
                  Choose Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 5, px: 2 }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:before": {
                  display: "none",
                },
                "& .MuiAccordionSummary-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "& .MuiAccordionDetails-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography color="white">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="white">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box
          component="footer"
          sx={{
            mt: 14,
            p: 4,
            px: 4,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
                Useful Links
              </Typography>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Content
              </MuiLink>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                How it Works
              </MuiLink>
              <MuiLink
                href="/generate"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Create
              </MuiLink>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Explore
              </MuiLink>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
                Community
              </Typography>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Help Center
              </MuiLink>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Partners
              </MuiLink>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Suggestions
              </MuiLink>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Blog
              </MuiLink>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "500", mb: 2, textDecoration: "none" }}
              >
                Partner
              </Typography>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Our Partner
              </MuiLink>
              <MuiLink
                href="#"
                color="inherit"
                sx={{ display: "block", mb: 1, textDecoration: "none" }}
              >
                Become a Partner
              </MuiLink>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2">
              © 2024 Flashcard SaaS. All Rights Reserved.
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <MuiLink href="#" color="inherit" sx={{ mx: 1 }}>
                <FaFacebookF />
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={{ mx: 1 }}>
                <FaTwitter />
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={{ mx: 1 }}>
                <FaInstagram />
              </MuiLink>
              <MuiLink
                href="https://www.linkedin.com/in/mrgulrez/"
                target="_blank"
                color="inherit"
                sx={{ mx: 1 }}
              >
                <FaLinkedinIn />
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
