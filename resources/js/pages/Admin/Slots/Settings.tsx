import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';


import type { AvailabilitySettingsFormData, AvailabilitySettingsPageProps, CarbonDayOfWeek } from '@/types';

import type { SubmitEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Controllers/Admin/AdminSlotController';

export default function AdminAvailabilitySettings({ settings, days }: AvailabilitySettingsPageProps) {

    const { data, setData, put, processing, errors } = useForm<AvailabilitySettingsFormData>({
        days_of_week: settings.days_of_week,
        start_time: settings.start_time.slice(0, 5),
        end_time: settings.end_time.slice(0, 5),
        break_minutes: settings.break_minutes,
        is_active: settings.is_active,


    });

      /*    H  H  :  m  m  :  s  s
            0  1  2  3  4  5  6  7 */

    const toggleDay = (value: CarbonDayOfWeek, checked: boolean): void => {
        const nextDays = checked ? [...data.days_of_week, value] : data.days_of_week.filter((day) => day !== value);

        setData('days_of_week', nextDays);
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        put(update.url());
    };

    return (
        <>
            <Head title="Availability Settings" />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking availability</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-8">
                            <div className="rounded-2xl border p-4">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <Checkbox
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', Boolean(checked))}
                                        aria-invalid={!!errors.is_active}
                                    />

                                    {data.is_active ? 'Open for new consultations' : 'Closed for new consultations'}
                                </label>
                                <InputError message={errors.is_active} className="mt-3" />
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label>Available weekdays</Label>
                                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                    {days.map((day) => (
                                        <label
                                            key={day.value}
                                            className="flex cursor-pointer items-center gap-3 rounded-2xl border p-3 text-sm transition-colors hover:bg-muted/50"
                                        >
                                            <Checkbox
                                                checked={data.days_of_week.includes(day.value)} // [0, 1, 3].includes(1)
                                                onCheckedChange={(checked) => toggleDay(day.value, Boolean(checked))}
                                                aria-invalid={!!errors.days_of_week}
                                            />
                                            <span className="flex flex-col">
                                                <span className="font-medium">{day.label}</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <InputError message={errors.days_of_week} />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="start_time">Start time</Label>
                                    <Input
                                        id="start_time"
                                        type="time"
                                        value={data.start_time}
                                        onChange={(event) => setData('start_time', event.target.value)}
                                        aria-invalid={!!errors.start_time}
                                    />
                                    <InputError message={errors.start_time} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="end_time">End time</Label>
                                    <Input
                                        id="end_time"
                                        type="time"
                                        value={data.end_time}
                                        onChange={(event) => setData('end_time', event.target.value)}
                                        aria-invalid={!!errors.end_time}
                                    />
                                    <InputError message={errors.end_time} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="break_minutes">Break minutes</Label>
                                    <Input
                                        id="break_minutes"
                                        type="number"
                                        min={0}
                                        max={120}
                                        value={data.break_minutes}
                                        onChange={(event) => setData('break_minutes', Number(event.target.value))}
                                        aria-invalid={!!errors.break_minutes}
                                    />
                                    <InputError message={errors.break_minutes} />
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={processing} aria-busy={processing}>
                                <Save data-icon="inline-start" />
                                {processing ? 'Saving…' : 'Save settings'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>
    );
}

