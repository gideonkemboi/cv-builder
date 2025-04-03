import { useState } from "react";
import { CVDetails, PersonalDetails, Education, Experience } from "./App.tsx";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input.tsx";
import EducationInput from "./Education.tsx";
import ExperienceInput from "./Experience.tsx";

interface EditorProps {
  activePage: "content" | "customize";
  cvDetails: CVDetails;
  setCVDetails: React.Dispatch<React.SetStateAction<CVDetails>>;
}

export default function Editor({
  activePage,
  cvDetails,
  setCVDetails,
}: EditorProps) {
  return activePage === "content" ? (
    <CVEditor cvDetails={cvDetails} setCVDetails={setCVDetails} />
  ) : (
    <LayoutEditor />
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
          edu.id === selectedEducation.id ? { ...edu, [field]: value } : edu
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
          xp.id === selectedExperience.id ? { ...xp, [field]: value } : xp
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
    null
  );
  const [isNewEdu, setIsNewEdu] = useState(false);
  const [eduBeforeEdit, setEduBeforeEdit] = useState<Education>();

  const educationList = education.map((edu) => (
    <div
      key={edu.id}
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
        (edu) => edu.id !== eduToDelete.id
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
          edu.id === selectedEducation.id ? eduBeforeEdit : edu
        ),
      }));
    } else {
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        education: prevDetails.education.filter(
          (edu) => edu.id !== selectedEducation.id
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
          edu.id === selectedEducation.id ? updatedEducation : edu
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
        (xp) => xp.id !== xpToDelete.id
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
          xp.id === selectedExperience.id ? xpBeforeEdit : xp
        ),
      }));
    } else {
      setCVDetails((prevDetails) => ({
        ...prevDetails,
        experience: prevDetails.experience.filter(
          (xp) => xp.id !== selectedExperience.id
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
          xp.id === selectedExperience.id ? updatedExperience : xp
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
    <div>
      <div>
        <h3 className="font-bold">Personal Details</h3>
        <div>
          <label htmlFor="name">Full name</label>
          <Input
            id="name"
            type="text"
            value={personalDetails.name}
            placeholder="John Doe"
            onChange={(e) => updatePersonalDetails("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            value={personalDetails.email}
            placeholder="johndoe@email.com"
            onChange={(e) => updatePersonalDetails("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tel">Phone number</label>
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
          <label htmlFor="address">Address</label>
          <Input
            id="address"
            type="text"
            value={personalDetails.address}
            placeholder="San Antonio, Texas"
            onChange={(e) => updatePersonalDetails("address", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h3 className="font-bold">Education</h3>
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
      {showEduInput ? (
        ""
      ) : (
        <div>
          <h3 className="font-bold">Experience</h3>
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
      )}
    </div>
  );
}

function LayoutEditor() {
  return <h3>Layout</h3>;
}
