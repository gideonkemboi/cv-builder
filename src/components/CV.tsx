import { CVDetails } from "./App.tsx";

interface CVProps {
  cvDetails: CVDetails;
}

export default function CV({ cvDetails }: CVProps) {
  const { personalDetails, education, experience } = cvDetails;
  return (
    <div>
      <div>
        <p>{personalDetails.name}</p>
        <div className="flex gap-2">
          <p>{personalDetails.email}</p>
          <p>{personalDetails.phoneNumber}</p>
          <p>{personalDetails.address}</p>
        </div>
      </div>
      <div>
        <h3 className="font-bold">Education</h3>
        <div>
          {education.map((edu) => (
            <div key={edu.id}>
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
                {edu.school && <p>{edu.school}</p>}
                {edu.degree && <p>{edu.degree}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold">Professional Experience</h3>
        <div>
          {experience.map((xp) => (
            <div key={xp.id}>
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
                {xp.company && <p>{xp.company}</p>}
                {xp.position && <p>{xp.position}</p>}
                {xp.description && <p>{xp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
