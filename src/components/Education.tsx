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
    <div className="flex flex-col gap-2">
      <div>
        <div>
          <label htmlFor="school" className="font-medium">
            School
          </label>
          <Input
            id="school"
            value={eduToEdit?.school || ""}
            placeholder="Enter school/university"
            onChange={(e) => updateEducation("school", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="degree" className="font-medium">
            Degree
          </label>
          <Input
            id="degree"
            value={eduToEdit?.degree || ""}
            placeholder="Enter Degree/Field of Study"
            onChange={(e) => updateEducation("degree", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate" className="font-medium">
            Start date
          </label>
          <Input
            id="startDate"
            value={eduToEdit?.startDate || ""}
            placeholder="Enter start date"
            onChange={(e) => updateEducation("startDate", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="font-medium">
            End date
          </label>
          <Input
            id="endDate"
            value={eduToEdit?.endDate || ""}
            placeholder="Enter end date"
            onChange={(e) => updateEducation("endDate", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location" className="font-medium">
            Location
          </label>
          <Input
            id="location"
            value={eduToEdit?.location || ""}
            placeholder="Enter Location"
            onChange={(e) => updateEducation("location", e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="mr-auto rounded-lg border-1 border-red-300 pt-1 pr-4 pb-1 pl-4 font-bold text-red-400"
          onClick={() => {
            onDelete(eduToEdit!);
          }}
        >
          Delete
        </button>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border-1 border-red-300 pt-1 pr-4 pb-1 pl-4 font-bold text-red-400"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-blue-500 pt-1 pr-4 pb-1 pl-4 text-white font-bold"
            onClick={() => {
              onSave(eduToEdit!);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
