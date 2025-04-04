import { CVDetails } from "./App.tsx";

interface CVProps {
  cvDetails: CVDetails;
}

export default function CV({ cvDetails }: CVProps) {
  const { personalDetails, education, experience } = cvDetails;
  return (
    <div className="h-[1123px] max-w-[794px] flex-[2_2_auto] bg-white shadow-lg">
      <div className="flex h-30 flex-col items-center justify-center bg-cyan-950 text-white">
        <p className="text-3xl font-bold">{personalDetails.name}</p>
        <div className="flex gap-2">
          <p className="font-medium">{personalDetails.email}</p>
          <p className="font-medium">{personalDetails.phoneNumber}</p>
          <p className="font-medium">{personalDetails.address}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-10">
        <div className="">
          <h3 className="bg-sky-100 p-1 text-center font-bold text-cyan-950">
            Education
          </h3>
          <div className="flex flex-col gap-5 pt-5 pb-5">
            {education.map((edu) => (
              <div key={edu.id} className="flex gap-10">
                <div>
                  {(edu.startDate || edu.endDate) && (
                    <p>
                      {edu.startDate} {edu.startDate && edu.endDate && " - "}
                      {edu.endDate}
                    </p>
                  )}
                  {edu.location && <p>{edu.location}</p>}
                </div>
                <div>
                  {edu.school && <p className="font-bold">{edu.school}</p>}
                  {edu.degree && <p>{edu.degree}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="bg-sky-100 p-1 text-center font-bold text-cyan-950">
            Professional Experience
          </h3>
          <div className="flex flex-col gap-5 pt-5 pb-5">
            {experience.map((xp) => (
              <div key={xp.id} className="flex gap-10">
                <div>
                  {(xp.startDate || xp.endDate) && (
                    <p>
                      {xp.startDate} {xp.startDate && xp.endDate && " - "}{" "}
                      {xp.endDate}
                    </p>
                  )}
                  {xp.location && <p>{xp.location}</p>}
                </div>
                <div>
                  {xp.company && <p className="font-bold">{xp.company}</p>}
                  {xp.position && <p>{xp.position}</p>}
                  {xp.description && <p>{xp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
