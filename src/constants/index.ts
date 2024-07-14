import { SelectItems } from "@/types/selectItems";

// export const API_BASE_URL = "http://api.ems.chhatrabikramshah.com.np/api/v1";
export const API_BASE_URL = "http://localhost:3001/api/v1";
export const PDFSERVER_URL = "http://localhost:3001/pdf/v1";

export const PRIORITYQUEUE = [
  {
    value: "HIGH",
    label: "HIGH",
  },
  {
    value: "LOW",
    label: "LOW",
  },
  {
    value: "MEDIUM",
    label: "MEDIUM",
  },
];

export const PRIORITIESWITHCOLORS: SelectItems[] = [
  {
    title: "HIGH",
    color: "#ff0000",
  },
  {
    title: "LOW",
    color: "#00ff00",
  },
  {
    title: "MEDIUM",
    color: "#ff00ff",
  },
];

export const STAGESWITHCOLORS: SelectItems[] = [
  {
    title: "TODO",
    color: "#ff0000",
  },
  {
    title: "PROGRESS",
    color: "#00ff00",
  },
  {
    title: "DONE",
    color: "#ff00ff",
  },
];
