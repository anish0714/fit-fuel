export interface ProteinGoal {
  id: string;
  label: string;
  gramsPerKg: number;
}

export const PROTEIN_GOALS: ProteinGoal[] = [
  { id: "maintenance", label: "Maintenance", gramsPerKg: 1.2 },
  { id: "active", label: "Active / general fitness", gramsPerKg: 1.6 },
  { id: "muscle", label: "Muscle building", gramsPerKg: 2.0 },
];

export const KG_PER_LB = 0.453592;
