import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components";
import InterviewForm from "../../components/InterviewForm/InterviewForm";
import React from "react";

const CreateInterview = () => {
  const [step, setStep] = useState(0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Link to="/">
            <ArrowBackIcon className="mr-2 text-gray-600" />
          </Link>
          <h2 className="text-xl font-bold">
            {step === 0
              ? "Create New Interview"
              : step === 1
              ? "Interview Questions"
              : step === 2
              ? "Interview is Ready"
              : ""}
          </h2>
        </div>
        <div className="w-full mb-3">
          <BorderLinearProgress
            variant="determinate"
            value={step === 0 ? 30 : step === 1 ? 60 : step === 2 ? 100 : 0}
          />
        </div>
        <InterviewForm step={step} setStep={setStep} />
      </div>
    </Layout>
  );
};

export default CreateInterview;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "dark" ? "#308fe8" : "#1a90ff",
  },
}));
