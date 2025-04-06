import { useMemo, useState } from "react";
import content from "../assets/content.svg";
import customize from "../assets/customize.svg";
import Editor from "./Editor.tsx";
import CV from "./CV.tsx";
import { v4 as uuidv4 } from "uuid";
import tinycolor from "tinycolor2";

interface ButtonProps {
  icon?: string;
  text: string;
  onClick: () => void;
  isActive: boolean;
}

function Button({ icon, text, onClick, isActive }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex w-full flex-col items-center rounded-lg p-2 text-sm font-semibold ${isActive ? "bg-blue-100" : "bg-white"}`}
    >
      <img src={icon} className="h-6 w-6 fill-black" />
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
    "content",
  );
  function handleChangePage(page: "content" | "customize") {
    setActivePage(page);
  }

  const [font, setFont] = useState<"serif" | "sans" | "mono">("sans");
  const [themeColor, setThemeColor] = useState("#083344");
  const isDark: boolean = useMemo(
    () => tinycolor(themeColor).isDark(),
    [themeColor],
  );
  const textColor = isDark ? "#ffffff" : "#000000";

  return (
    <>
      <div className="flex h-40 w-24 flex-none flex-col items-center justify-around gap-2 rounded-xl bg-white p-2 shadow-sm">
        <Button
          icon={content}
          text="Content"
          onClick={() => handleChangePage("content")}
          isActive={activePage === "content"}
        />
        <Button
          icon={customize}
          text="Customize"
          onClick={() => handleChangePage("customize")}
          isActive={activePage === "customize"}
        />
      </div>
      <Editor
        activePage={activePage}
        sampleCVDetails={sampleCVDetails}
        cvDetails={cvDetails}
        setCVDetails={setCVDetails}
        font={font}
        setFont={setFont}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        textColor={textColor}
      />
      <CV
        cvDetails={cvDetails}
        font={font}
        themeColor={themeColor}
        isDark={isDark}
        textColor={textColor}
      />
    </>
  );
}

export default App;
