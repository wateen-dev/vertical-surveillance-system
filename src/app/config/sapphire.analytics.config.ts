import { AnalyticsTileConfig } from '../models/AnalyticsTileConfig';

export const SAPPHIRE_TILES: AnalyticsTileConfig[] = [
  {
    key: 'footfall',
    label: "Today's Footfall",
    icon: 'groups',
    color: '#1976d2',
    order: 1,
    value: ctx => ctx.footfall,
    change: () => '+22.3% vs Yesterday',
    onClick: 'none'
  },
  {
    key: 'avgQueue',
    label: 'Customer Dealing Time',
    icon: 'timer',
    color: '#01c5b0',
    order: 2,
    value: ctx => `${ctx.avgQueue.toFixed(2)} min`,
    change: () => '-24s Improvement',
    onClick: 'avgQueue'
  },
  {
    key: 'employeeEfficiency',
    label: 'Employee Efficiency',
    icon: 'insights',
    color: '#1976d2',
    order: 3,
    value: () => 'Leaderboard',
    change: () => '',
    onClick: 'employeeEfficiency'
  },
  {
    key: 'conversion',
    label: 'Conversion Rate',
    icon: 'trending_up',
    color: '#a632fe',
    order: 4,
    value: ctx =>
      ctx.footfall > 0
        ? `${((ctx.receipts / ctx.footfall) * 100).toFixed(2)}%`
        : '0.00%',
    change: () => '+4.1% Improvement',
    onClick: 'none'
  },
  {
    key: 'receiptCount',
    label: 'Receipt Count',
    icon: 'inventory',
    color: '#767cff',
    order: 5,
    value: ctx => ctx.receipts,
    note: () => 'Total Receipts Generated',
    onClick: 'receiptCount'
  },
  {
    key: 'violations',
    label: 'SOP Violations',
    icon: 'security',
    color: '#ff9800',
    order: 6,
    value: ctx => ctx.violations,
    note: ctx =>
      ctx.violations === 0
        ? 'No violations today 🎉'
        : ctx.violations > 5
        ? 'High-priority detected 🚨'
        : `${ctx.violations} Active Violations`,
    onClick: 'route',
    route: '/live-incidents'
  },
  {
    key: 'revenue',
    label: 'Revenue Today',
    icon: 'attach_money',
    color: '#00ba48',
    order: 7,
    value: () => 'From ERP',
    change: () => '+18.4% vs Target',
    onClick: 'none'
  },
  {
    key: 'cameraHealth',
    label: 'Camera Health',
    icon: 'camera_alt',
    color: '#00cbeb',
    order: 8,
    value: () => '100%',
    note: () => '13/13 Cameras Active',
    onClick: 'none'
  }
];
