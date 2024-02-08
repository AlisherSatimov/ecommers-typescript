export interface Item {
  id: number;
  name: string;
}

export interface PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
}

export interface FetchDataDashboard {
  topBrands: string[];
  topCategories: string[];
  topProducts: string[];
  categories: number;
  totalBrands: number;
  totalCategory: number;
  totalIncome: number | null;
  totalOrders: number;
  totalProducts: number;
  totalSales: number;
  totalUsers: number;
}

export interface IBrands {
  created_at: string;
  id: number;
  image: string;
  is_featured: number;
  name_ru: string;
  name_uz: string;
  slug: string | null;
  status: number;
  updated_at: string;
  views: number;
}

export interface IIsOk {
  isOk: boolean;
}

export interface IPagination {
  current: number;
  next: number | null;
  per_page: number;
  previous: number | null;
  total: number;
  total_pages: number;
}
