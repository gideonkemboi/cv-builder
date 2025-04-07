import { CVDetails } from "./App.tsx";
import EmailIcon from "../assets/email.svg?react";
import LocationIcon from "../assets/location.svg?react";
import PhoneIcon from "../assets/phone.svg?react";
import tinycolor from "tinycolor2";
import { useMemo } from "react";

interface CVProps {
  font: "serif" | "sans" | "mono";
  cvDetails: CVDetails;
  themeColor: string;
  isDark: boolean;
  textColor: string;
  layout: "top" | "left" | "right";
}

export default function CV({
  font,
  cvDetails,
  themeColor,
  textColor,
  layout,
}: CVProps) {
  const { personalDetails, education, experience } = cvDetails;
  const isLight: boolean = useMemo(
    () => tinycolor(themeColor).isLight(),
    [themeColor],
  );

  const bgColor = isLight ? "#000000" : "#e0f2fe";

  return (
    <div
      className={`min-h-[1150px] w-[700px] flex-[2_2_auto] bg-white font-${font} shadow-lg ${layout === "left" ? "flex" : layout === "right" ? "flex flex-row-reverse" : ""}`}
    >
      <div
        className={`flex h-36 flex-col items-center gap-2 p-12 ${layout === "left" || layout === "right" ? "h-full min-w-85 flex-auto" : ""}`}
        style={{ backgroundColor: themeColor, color: textColor }}
      >
        <p className="text-3xl font-bold">{personalDetails.name}</p>
        <div
          className={`flex gap-4 ${layout === "left" || layout === "right" ? "flex-col items-baseline" : ""}`}
        >
          {personalDetails.email && (
            <div className="flex items-center gap-1">
              <EmailIcon className="h-5 w-5" style={{ fill: textColor }} />
              <p className="font-medium">{personalDetails.email}</p>
            </div>
          )}
          {personalDetails.phoneNumber && (
            <div className="flex items-center gap-1">
              <PhoneIcon className="h-5 w-5" style={{ fill: textColor }} />
              <p className="font-medium">{personalDetails.phoneNumber}</p>
            </div>
          )}
          {personalDetails.address && (
            <div className="flex items-center gap-1">
              <LocationIcon
                className="h-5 w-5 whitespace-nowrap"
                style={{ fill: textColor }}
              />
              <p className="font-medium">{personalDetails.address}</p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-4 p-10 ${layout === "left" || layout === "right" ? "w-140 flex-auto" : ""}`}
      >
        {education.length > 0 && (
          <div>
            <h3
              className="bg-sky-100 p-1 text-center font-bold"
              style={{ color: themeColor, backgroundColor: bgColor }}
            >
              Education
            </h3>
            <div className="flex flex-col gap-5 py-5">
              {education.map((edu) => (
                <div key={edu.id} className="flex gap-10">
                  <div className="flex-shrink-0">
                    {(edu.startDate || edu.endDate) && (
                      <p className="whitespace-nowrap">
                        {edu.startDate} {edu.startDate && edu.endDate && " - "}
                        {edu.endDate}
                      </p>
                    )}
                    {edu.location && (
                      <p className="whitespace-nowrap">{edu.location}</p>
                    )}
                  </div>
                  <div>
                    {edu.school && <p className="font-bold">{edu.school}</p>}
                    {edu.degree && <p>{edu.degree}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h3
              className="p-1 text-center font-bold"
              style={{ color: themeColor, backgroundColor: bgColor }}
            >
              Professional Experience
            </h3>
            <div className="flex flex-col gap-5 py-5">
              {experience.map((xp) => (
                <div key={xp.id} className="flex gap-10">
                  <div className="flex-shrink-0">
                    {(xp.startDate || xp.endDate) && (
                      <p className="whitespace-nowrap">
                        {xp.startDate} {xp.startDate && xp.endDate && " - "}{" "}
                        {xp.endDate}
                      </p>
                    )}
                    {xp.location && (
                      <p className="whitespace-nowrap">{xp.location}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {xp.company && <p className="font-bold">{xp.company}</p>}
                    {xp.position && <p>{xp.position}</p>}
                    {xp.description && (
                      <p className="whitespace-normal">{xp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
