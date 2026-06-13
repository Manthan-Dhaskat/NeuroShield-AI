export interface Threat {
  id: number;
  process_name: string;
  pid: number;
  anomaly_score: number;
  risk_score: number;
  severity:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";
  status: string;
  description: string;
  created_at: string;
}