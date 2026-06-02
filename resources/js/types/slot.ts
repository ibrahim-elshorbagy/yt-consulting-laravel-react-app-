export type CarbonDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface AvailabilitySettings {
    id: number | null;
    days_of_week: CarbonDayOfWeek[];
    start_time: string;
    end_time: string;
    break_minutes: number;
    is_active: boolean;
}

export interface AvailabilitySettingsFormData {
    days_of_week: CarbonDayOfWeek[];
    start_time: string;
    end_time: string;
    break_minutes: number;
    is_active: boolean;
}

export interface AvailabilitySettingsPageProps {
    settings: AvailabilitySettings;
    days: DayOption[];
}

export interface DayOption {
    value: CarbonDayOfWeek;
    label: string;
}
