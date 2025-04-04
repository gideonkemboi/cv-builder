import { useState } from "react";
import { CVDetails, PersonalDetails, Education, Experience } from "./App.tsx";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input.tsx";
import EducationInput from "./Education.tsx";
import ExperienceInput from "./Experience.tsx";
import deleteIcon from "../assets/delete.svg";
import educationIcon from "../assets/education.svg";
import experienceIcon from "../assets/experience.svg";

interface EditorProps {
  activePage: "content" | "customize";
  sampleCVDetails: CVDetails;
  cvDetails: CVDetails;
  setCVDetails: React.Dispatch<React.SetStateAction<CVDetails>>;
}

export default function Editor({
  activePage,
  sampleCVDetails,
  cvDetails,
  setCVDetails,
}: EditorProps) {
  const emptyCVDetails: CVDetails = {
    personalDetails: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
    education: [],
    experience: [],
  };

  function handleClearResume() {
    setCVDetails(emptyCVDetails);
  }

  function handleLoadSample() {
    setCVDetails(sampleCVDetails);
  }
  return (
    <div className="flex max-w-[500px] flex-auto flex-col gap-5">
      <div className="sticky top-2 flex items-center rounded-xl bg-white pt-3 pr-5 pb-3 pl-5 shadow-lg">
        <button
          onClick={handleClearResume}
          className="mr-auto flex w-1/2 items-center gap-3"
        >
          <img src={deleteIcon} className="h-4 w-4" />
          Clear Resume
        </button>
        <button
          onClick={handleLoadSample}
          className="w-1/2 rounded-sm bg-blue-100 p-1"
        >
          Load Sample
        </button>
      </div>
      {activePage === "content" ? (
        <CVEditor cvDetails={cvDetails} setCVDetails={setCVDetails} />
      ) : (
        <LayoutEditor />
      )}
    </div>
  );
}

interface CVEditorProps {
  cvDetails: CVDetails;
  setCVDetails: React.Dispatch<React.SetStateAction<CVDetails>>;
}

function CVEditor({ cvDetails, setCVDetails }: CVEditorProps) {
  const { personalDetails, education, experience } = cvDetails;

  function updatePersonalDetails(field: keyof PersonalDetails, value: string) {
    setCVDetails((prevDetails) => ({
      ...prevDetails,
      personalDetails: {
        ...prevDetails.personalDetails,
        [field]: value,
      },
    }));
  }

  function updateEducation(field: keyof Education, value: string) {
    if (selectedEducation) {
      const updatedEducation = { ...selectedEducation, [field]: value };
      setSelectedEducation(updatedEducation);
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        education: prevDetails.education.map((edu) =>
          edu.id === selectedEducation.id ? { ...edu, [field]: value } : edu,
        ),
      }));
    } else {
      const newEducation: Education = {
        id: uuidv4(),
        school: field === "school" ? value : "",
        degree: field === "degree" ? value : "",
        startDate: field === "startDate" ? value : "",
        endDate: field === "endDate" ? value : "",
        location: field === "location" ? value : "",
      };

      setCVDetails((prevDetails) => ({
        ...prevDetails,
        education: [...prevDetails.education, newEducation], // Append new entry
      }));

      setSelectedEducation(newEducation);
    }
  }

  function updateExperience(field: keyof Experience, value: string) {
    if (selectedExperience) {
      const updatedExperience = { ...selectedExperience, [field]: value };
      setSelectedExperience(updatedExperience);
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        experience: prevDetails.experience.map((xp) =>
          xp.id === selectedExperience.id ? { ...xp, [field]: value } : xp,
        ),
      }));
    } else {
      const newExperience: Experience = {
        id: uuidv4(),
        company: field === "company" ? value : "",
        position: field === "position" ? value : "",
        startDate: field === "startDate" ? value : "",
        endDate: field === "endDate" ? value : "",
        location: field === "location" ? value : "",
        description: field === "description" ? value : "",
      };

      setCVDetails((prevDetails) => ({
        ...prevDetails,
        experience: [...prevDetails.experience, newExperience],
      }));

      setSelectedExperience(newExperience);
    }
  }

  const [showEduInput, setShowEduInput] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(
    null,
  );
  const [isNewEdu, setIsNewEdu] = useState(false);
  const [eduBeforeEdit, setEduBeforeEdit] = useState<Education>();

  const educationList = education.map((edu) => (
    <div
      key={edu.id}
      className="cursor-pointer text-lg font-medium"
      onClick={() => {
        setSelectedEducation(edu);
        setEduBeforeEdit(edu);
        setShowEduInput(true);
      }}
    >
      {edu.school}
    </div>
  ));

  const handleDeleteEducation = (eduToDelete: Education) => {
    setCVDetails((prevDetails) => ({
      ...prevDetails,
      education: prevDetails.education.filter(
        (edu) => edu.id !== eduToDelete.id,
      ),
    }));

    setShowEduInput(false);
    setSelectedEducation(null);
  };

  const handleCancelEducation = (eduBeforeEdit: Education) => {
    if (!selectedEducation) {
      setShowEduInput(false);
      return;
    }

    if (!isNewEdu) {
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        education: prevDetails.education.map((edu) =>
          edu.id === selectedEducation.id ? eduBeforeEdit : edu,
        ),
      }));
    } else {
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        education: prevDetails.education.filter(
          (edu) => edu.id !== selectedEducation.id,
        ),
      }));
    }

    setShowEduInput(false);
    setSelectedEducation(null);
    setIsNewEdu(false);
  };

  const handleSaveEducation = (updatedEducation: Education) => {
    if (selectedEducation) {
      // Update existing education
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        education: prevDetails.education.map((edu) =>
          edu.id === selectedEducation.id ? updatedEducation : edu,
        ),
      }));

      setShowEduInput(false);
      setSelectedEducation(null);
    } else {
      // Add new education
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        education: [
          ...prevDetails.education,
          { ...updatedEducation, id: uuidv4() },
        ],
      }));

      setShowEduInput(false);
      setSelectedEducation(null);
    }

    setIsNewEdu(false);
  };

  const [showXpInput, setShowXpInput] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const [isNewXp, setIsNewXp] = useState(false);
  const [xpBeforeEdit, setXpBeforeEdit] = useState<Experience>();

  const experienceList = experience.map((xp) => (
    <div
      key={xp.id}
      className="cursor-pointer text-lg font-medium"
      onClick={() => {
        setSelectedExperience(xp);
        setXpBeforeEdit(xp);
        setShowXpInput(true);
      }}
    >
      {xp.company}
    </div>
  ));

  const handleDeleteExperience = (xpToDelete: Experience) => {
    setCVDetails((prevDetails) => ({
      ...prevDetails,
      experience: prevDetails.experience.filter(
        (xp) => xp.id !== xpToDelete.id,
      ),
    }));

    setShowXpInput(false);
    setSelectedExperience(null);
  };

  const handleCancelExperience = (xpBeforeEdit: Experience) => {
    if (!selectedExperience) {
      setShowXpInput(false);
      return;
    }

    if (!isNewXp) {
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        experience: prevDetails.experience.map((xp) =>
          xp.id === selectedExperience.id ? xpBeforeEdit : xp,
        ),
      }));
    } else {
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        experience: prevDetails.experience.filter(
          (xp) => xp.id !== selectedExperience.id,
        ),
      }));
    }

    setShowXpInput(false);
    setSelectedExperience(null);
    setIsNewXp(false);
  };

  const handleSaveExperience = (updatedExperience: Experience) => {
    if (selectedExperience) {
      // Update existing experience
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        experience: prevDetails.experience.map((xp) =>
          xp.id === selectedExperience.id ? updatedExperience : xp,
        ),
      }));

      setShowXpInput(false);
      setSelectedExperience(null);
    } else {
      // Add new experience
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        experience: [
          ...prevDetails.experience,
          { ...updatedExperience, id: uuidv4() },
        ],
      }));

      setShowXpInput(false);
      setSelectedExperience(null);
    }

    setIsNewXp(false);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl bg-white p-5">
        <h3 className="text-xl font-bold">Personal Details</h3>
        <div>
          <label htmlFor="name" className="font-medium">
            Full name
          </label>
          <Input
            id="name"
            type="text"
            value={personalDetails.name}
            placeholder="John Doe"
            onChange={(e) => updatePersonalDetails("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={personalDetails.email}
            placeholder="johndoe@email.com"
            onChange={(e) => updatePersonalDetails("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tel" className="font-medium">
            Phone number
          </label>
          <Input
            id="tel"
            type="tel"
            value={personalDetails.phoneNumber}
            placeholder="+254 722000000"
            onChange={(e) =>
              updatePersonalDetails("phoneNumber", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="address" className="font-medium">
            Address
          </label>
          <Input
            id="address"
            type="text"
            value={personalDetails.address}
            placeholder="San Antonio, Texas"
            onChange={(e) => updatePersonalDetails("address", e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-5">
        <div className="flex items-center gap-4">
          <img src={educationIcon} className="h-8 w-8" />
          <p className="text-xl font-bold">Education</p>
        </div>
        <div className="flex flex-col">
          {showEduInput ? (
            <EducationInput
              updateEducation={updateEducation}
              eduToEdit={selectedEducation}
              onDelete={() => {
                handleDeleteEducation(selectedEducation!);
              }}
              onCancel={() => {
                handleCancelEducation(eduBeforeEdit!);
              }}
              onSave={handleSaveEducation}
            />
          ) : (
            <>
              {educationList}
              <button
                className="self-center rounded-2xl border-4 border-sky-100 p-2"
                onClick={() => {
                  setShowEduInput(true);
                  setIsNewEdu(true);
                }}
              >
                + Education
              </button>
            </>
          )}
        </div>
      </div>
      {showEduInput ? (
        ""
      ) : (
        <div className="flex flex-col gap-2 rounded-xl bg-white p-5">
          <div className="flex items-center gap-4">
            <img src={experienceIcon} className="h-8 w-8" />
            <p className="text-xl font-bold">Experience</p>
          </div>
          <div className="flex flex-col">
            {showXpInput ? (
              <ExperienceInput
                updateExperience={updateExperience}
                xpToEdit={selectedExperience}
                onDelete={() => {
                  handleDeleteExperience(selectedExperience!);
                }}
                onCancel={() => handleCancelExperience(xpBeforeEdit!)}
                onSave={handleSaveExperience}
              />
            ) : (
              <>
                {experienceList}
                <button
                  className="self-center rounded-2xl border-4 border-sky-100 p-2"
                  onClick={() => {
                    setShowXpInput(true);
                    setIsNewXp(true);
                  }}
                >
                  + Experience
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LayoutEditor() {
  return <h3>Layout</h3>;
}
