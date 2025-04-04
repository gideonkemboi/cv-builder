import { Experience } from "./App";
import Input from "./Input";

interface ExperienceInputProps {
  updateExperience: (field: keyof Experience, value: string) => void;
  xpToEdit: Experience | null;
  onDelete: (xpToDelete: Experience) => void;
  onCancel: () => void;
  onSave: (updatedExperience: Experience) => void;
}

export default function ExperienceInput({
  updateExperience,
  xpToEdit,
  onDelete,
  onCancel,
  onSave,
}: ExperienceInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div>
          <label htmlFor="company" className="font-medium">
            Company
          </label>
          <Input
            id="company"
            value={xpToEdit?.company || ""}
            placeholder="Enter Company Name"
            onChange={(e) => updateExperience("company", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="position" className="font-medium">
            Position
          </label>
          <Input
            id="position"
            value={xpToEdit?.position || ""}
            placeholder="Enter position title"
            onChange={(e) => updateExperience("position", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate" className="font-medium">
            Start date
          </label>
          <Input
            id="startDate"
            value={xpToEdit?.startDate || ""}
            placeholder="Enter start date"
            onChange={(e) => updateExperience("startDate", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="font-medium">
            End date
          </label>
          <Input
            id="endDate"
            value={xpToEdit?.endDate || ""}
            placeholder="Enter end date"
            onChange={(e) => updateExperience("endDate", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location" className="font-medium">
            Location
          </label>
          <Input
            id="location"
            value={xpToEdit?.location || ""}
            placeholder="Enter Location"
            onChange={(e) => updateExperience("location", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <Input
            id="description"
            value={xpToEdit?.description || ""}
            placeholder="Enter Description"
            onChange={(e) => updateExperience("description", e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="mr-auto rounded-lg border-1 border-red-300 pt-1 pr-4 pb-1 pl-4 font-bold text-red-400"
          onClick={() => {
            onDelete(xpToEdit!);
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
            className="rounded-lg bg-blue-500 pt-1 pr-4 pb-1 pl-4 font-bold text-white"
            onClick={() => {
              onSave(xpToEdit!);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
