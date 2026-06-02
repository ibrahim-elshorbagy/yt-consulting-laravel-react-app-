<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SlotPattern;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSlotController extends Controller
{
    public function show(): Response
    {
        $settings = SlotPattern::query()->first();

        return Inertia::render('Admin/Slots/Settings', [
            'settings' => $settings ? $settings : SlotPattern::defaultValues(),
            'days' => $this->days(),
        ]);
    }

    private function days(): array
    {
        return [
            ['value' => Carbon::FRIDAY, 'label' => 'Friday'],
            ['value' => Carbon::SATURDAY, 'label' => 'Saturday'],
            ['value' => Carbon::SUNDAY, 'label' => 'Sunday'],
            ['value' => Carbon::MONDAY, 'label' => 'Monday'],
            ['value' => Carbon::TUESDAY, 'label' => 'Tuesday'],
            ['value' => Carbon::WEDNESDAY, 'label' => 'Wednesday'],
            ['value' => Carbon::THURSDAY, 'label' => 'Thursday'],
        ];
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'days_of_week' => ['required', 'array', 'min:1'],
            'days_of_week.*' => ['integer', 'min:0', 'max:6'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'break_minutes' => ['required', 'integer', 'min:0', 'max:120'],
            'is_active' => ['required', 'boolean'],
        ]);

        SlotPattern::query()->updateOrCreate([], $data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Availability settings saved.']);

        return to_route('admin.availability-settings.show');
    }
}
