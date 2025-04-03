import { Education } from "./App";
import Input from "./Input";

interface EducationInputProps {
  updateEducation: (field: keyof Education, value: string) => void;
  eduToEdit: Education | null;
  onDelete: (eduToDelete: Education) => void;
  onCancel: () => void;
  onSave: (updatedEducation: Education) => void;
}

export default function EducationInput({
  updateEducation,
  eduToEdit,
  onDelete,
  onCancel,
  onSave,
}: EducationInputProps) {
  return (
    <div>
      <div>
        <label htmlFor="school">School</label>
        <Input
          id="school"
          value={eduToEdit?.school || ""}
          placeholder="Enter school/university"
          onChange={(e) => updateEducation("school", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="degree">Degree</label>
        <Input
          id="degree"
          value={eduToEdit?.degree || ""}
          placeholder="Enter Degree/Field of Study"
          onChange={(e) => updateEducation("degree", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start date</label>
        <Input
          id="startDate"
          value={eduToEdit?.startDate || ""}
          placeholder="Enter start date"
          onChange={(e) => updateEducation("startDate", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">End date</label>
        <Input
          id="endDate"
          value={eduToEdit?.endDate || ""}
          placeholder="Enter end date"
          onChange={(e) => updateEducation("endDate", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <Input
          id="location"
          value={eduToEdit?.location || ""}
          placeholder="Enter Location"
          onChange={(e) => updateEducation("location", e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            onDelete(eduToEdit!);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onSave(eduToEdit!);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
