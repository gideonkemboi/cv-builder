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
    <div>
      <div>
        <label htmlFor="company">Company</label>
        <Input
          id="company"
          value={xpToEdit?.company || ""}
          placeholder="Enter Company Name"
          onChange={(e) => updateExperience("company", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="position">Position</label>
        <Input
          id="position"
          value={xpToEdit?.position || ""}
          placeholder="Enter position title"
          onChange={(e) => updateExperience("position", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start date</label>
        <Input
          id="startDate"
          value={xpToEdit?.startDate || ""}
          placeholder="Enter start date"
          onChange={(e) => updateExperience("startDate", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">End date</label>
        <Input
          id="endDate"
          value={xpToEdit?.endDate || ""}
          placeholder="Enter end date"
          onChange={(e) => updateExperience("endDate", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <Input
          id="location"
          value={xpToEdit?.location || ""}
          placeholder="Enter Location"
          onChange={(e) => updateExperience("location", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Input
          id="description"
          value={xpToEdit?.description || ""}
          placeholder="Enter Description"
          onChange={(e) => updateExperience("description", e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            onDelete(xpToEdit!);
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
            onSave(xpToEdit!);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
