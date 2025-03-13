export interface Url {
    short_code: string;
    long_url: string;
    short_url: string;
    created_at: string;
    expires_at?: string | null;
    clicks: number;
}

export interface CreateUrlRequest {
    long_url: string;
    expires_at?: string | null;
}

export interface UrlStats {
    short_code: string;
    long_url: string;
    short_url: string;
    clicks: number;
    created_at: string;
    expires_at?: string | null;
}

export interface UserStats {
    totalUrls: number;
    totalClicks: number;
    avgClicksPerUrl: string;
    mostClickedUrl: {
        shortCode: string;
        clicks: number;
        longUrl: string;
    } | null;
    mostRecentUrl: {
        short_code: string;
        created_at: string;
        long_url: string;
    } | null;
}

export interface PaginatedUrlsResponse {
    urls: Url[];
    total: number;
    page: number;
    limit: number;
}