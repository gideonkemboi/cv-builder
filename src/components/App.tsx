import { useState } from "react";
import content from "../assets/content.svg";
import customize from "../assets/customize.svg";
import Editor from "./Editor.tsx";
import CV from "./CV.tsx";
import { v4 as uuidv4 } from "uuid";

interface ButtonProps {
  icon: string;
  text: string;
  onClick: () => void;
}

function Button({ icon, text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex flex-col items-center text-sm bg-blue-100 rounded-sm p-2 w-full font-semibold"
    >
      <img src={icon} className="w-7 h-7" />
      {text}
    </button>
  );
}

export type PersonalDetails = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
};

export interface CVDetails {
  personalDetails: PersonalDetails;
  education: Education[];
  experience: Experience[];
}

function App() {
  const sampleCVDetails: CVDetails = {
    personalDetails: {
      name: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "+1234567890",
      address: "123 Main Street, Springfield, USA",
    },
    education: [
      {
        id: uuidv4(),
        school: "Harvard University",
        degree: "Bachelor of Science in Computer Science",
        startDate: "01/2015",
        endDate: "01/2019",
        location: "Cambridge, MA",
      },
      {
        id: uuidv4(),
        school: "Stanford University",
        degree: "Master of Science in Systems Engineering",
        startDate: "01/2020",
        endDate: "01/2022",
        location: "Stanford, CA",
      },
    ],
    experience: [
      {
        id: uuidv4(),
        company: "Google",
        position: "Software Engineer",
        startDate: "01/2019",
        endDate: "01/2021",
        location: "Mountain View, CA",
        description: "Developed scalable web applications and cloud services.",
      },
      {
        id: uuidv4(),
        company: "Microsoft",
        position: "Senior Developer",
        startDate: "01/2022",
        endDate: "Present",
        location: "Redmond, WA",
        description: "Led a team of developers to build enterprise solutions.",
      },
    ],
  };
  
  const [cvDetails, setCVDetails] = useState<CVDetails>(sampleCVDetails);
  const [activePage, setActivePage] = useState<"content" | "customize">(
    "content"
  );
  function handleClick(page: "content" | "customize") {
    setActivePage(page);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 w-24 p-2">
        <Button
          icon={content}
          text="Content"
          onClick={() => handleClick("content")}
        />
        <Button
          icon={customize}
          text="Customize"
          onClick={() => handleClick("customize")}
        />
      </div>
      <Editor
        activePage={activePage}
        cvDetails={cvDetails}
        setCVDetails={setCVDetails}
      />
      <CV cvDetails={cvDetails} />
    </>
  );
}

export default App;
