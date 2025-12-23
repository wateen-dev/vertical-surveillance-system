export interface AnalyticsTileConfig {
  key: string;
  label: string;
  icon: string;
  color: string;
  order: number;

  value: (ctx: any) => string | number;

  // 🔹 ADD THESE (optional)
  change?: (ctx: any) => string | null;
  note?: (ctx: any) => string | null;

  onClick?: 'avgQueue' | 'employeeEfficiency' | 'receiptCount' | 'route' | 'none';
  route?: string;
}
