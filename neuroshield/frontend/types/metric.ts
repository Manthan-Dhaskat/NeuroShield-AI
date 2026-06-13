export interface Metric {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_sent: number;
  network_received: number;
  timestamp: string;
}