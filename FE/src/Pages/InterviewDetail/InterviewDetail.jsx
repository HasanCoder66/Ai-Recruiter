import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Avatar,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import {
  AccessTime,
  CalendarToday,
  Label,
  FilterList,
  FileDownload,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BASE_URL, BASE_URL_PROD } from "../../constants/baseUrl";

const InterviewDetails = () => {
  const { id } = useParams();
  const [interviewDetail, setInterviewDetail] = useState(null);
  // console.log(interviewDetail);
  const [candidates, setCandidates] = useState([]);
  console.log(candidates);
  const [candidatesLength, setCandidatesLength] = useState();
  // console.log(candidates, "Candidate UseState")
  const fetchInterviewDetails = async () => {
    try {
      const apiRes = await axios.get(`${BASE_URL_PROD}/interview/single/${id}`);
      // console.log(apiRes.data);
      setInterviewDetail(apiRes?.data);
    } catch (error) {
      console.error("Error Fetching interview Details:", error);
    }
  };

  const fetchCandidatesByInterviewID = async (req, res) => {
    try {
      const apiRes = await axios.get(
        `${BASE_URL_PROD}/candidate/interview/${id}`
      );
      // console.log("REs",apiRes)
      // console.log("api response line 41",apiRes?.data)
      setCandidates(apiRes?.data?.candidates);
      setCandidatesLength(apiRes?.data?.totalCandidates);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchInterviewDetails();
    fetchCandidatesByInterviewID();
  }, [id]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: 5,
          padding: 2,
          backgroundColor: "white",
          // position:"sticky"
        }}
      >
        <Link to="/dashboard">
          <ArrowBackIcon className="mr-2 text-gray-600" />
        </Link>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Interveiw Details
        </Typography>

        {/* Actions */}
        <Box className="flex justify-end gap-2">
          <IconButton size="small" color="default">
            <FilterList />
          </IconButton>
          <IconButton size="small" color="default">
            <FileDownload />
          </IconButton>
        </Box>
      </Box>
      <Container maxWidth={"lg"}>
        <Box className="  space-y-8 ">
          {/* Header */}

          <Box
            sx={{
              paddingX: 5,
                marginTop:"50px"
            }}
          >
            <Box className="flex justify-between items-start mb-3 mx-auto p-6 bg-white shadow-lg rounded-xl">
              <Box sx={{
              
              }}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {interviewDetail?.data?.jobTitle}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  Google Inc.
                </Typography>
              </Box>
              <Chip label="Active" color="success" size="small" />
            </Box>

            {/* Meta Info */}
            <Box className="flex flex-wrap gap-6 text-sm mb-3 mx-auto p-6 bg-white shadow-lg rounded-xl">
              <Box className="flex items-center gap-2">
                <AccessTime fontSize="small" />
                <span className="font-medium">
                  {interviewDetail?.data?.interviewDuration}
                </span>
              </Box>
              <Box className="flex items-center gap-2">
                <CalendarToday fontSize="small" />
                <span className="font-medium">
                  {interviewDetail?.data?.createdAt}
                </span>
              </Box>
              <Box className="flex items-center gap-2">
                <Label fontSize="small" />
                <span className="font-medium">
                  {interviewDetail?.data?.interviewType}
                </span>
              </Box>
            </Box>

            {/* Description */}
            <Box className="mx-auto p-6 bg-white shadow-lg rounded-xl mb-3 ">
              <Typography
                variant="subtitle1"
                fontWeight={"bold"}
                marginBottom={0.5}
                sx={{
                  fontSize: { xs: 20, sm: 20, md: 22, lg: 24, xl: 24 },
                }}
              >
                Job Description
              </Typography>
              <Typography
                marginBottom={1}
                className="text-sm text-gray-700 leading-relaxed "
              >
                {interviewDetail?.data?.jobDescription}
              </Typography>
            </Box>

            {/* Interview Questions */}
            <Box className="mx-auto p-6 bg-white shadow-lg rounded-xl m">
              <Typography
                sx={{
                  fontSize: { xs: 20, sm: 20, md: 22, lg: 24, xl: 24 },
                }}
                fontWeight={"bold"}
                variant="subtitle1"
                margin={1}
              >
                Interview Questions
              </Typography>
              <ul className="">
                {interviewDetail?.data?.questions.map((q, i) => (
                  <li
                    className="mx-auto p-6 bg-white shadow-lg rounded-xl list-none mb-3 text-lmd"
                    key={i}
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </Box>

            <Divider />

            {/* Candidates */}
            <Box sx={
              {
                marginBottom:"20px",
              }
            }>
              <Typography marginTop={2} variant="subtitle1">
                Candidates ({candidates.length})
              </Typography>
              <Box className="space-y-4 ">
                {candidates.map((cand, i) => (
                  <Box
                    key={i}
                    className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-200"
                  >
                    <Box marginBottom={2} className="flex items-center gap-4">
                      <Avatar sx={{ bgcolor: "#1976d2", color: "#fff" }}>
                        {/* {cand.name.charAt(0)} */}
                      </Avatar>
                      <Box>
                        <Typography className="font-medium text-sm text-gray-800">
                          {cand.fullName}
                        </Typography>
                        <Typography className="text-xs text-gray-500">
                          {cand.status === "Completed"
                            ? `Completed on ${cand.joinedAt}`
                            : `Pending – Scheduled for ${cand.date}`}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center gap-4 ">
                      {cand.status === "Completed" ? (
                        <>
                          <Chip
                            label={`${cand?.feedback?.overallRating}/10`}
                            color="success"
                            size="small"
                            sx={{ fontWeight: 500 }}
                          />
                          <Link to={`/candidate-report/${cand?._id}`}>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                textTransform: "none",
                                fontSize: "0.75rem",
                              }}
                            >
                              View Report
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Chip
                            label="Pending"
                            color="warning"
                            size="small"
                            sx={{ fontWeight: 500 }}
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: "none", fontSize: "0.75rem" }}
                          >
                            View Report
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default InterviewDetails;
