<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SlotPattern extends Model
{
    protected $fillable = [
        'days_of_week',
        'start_time',
        'end_time',
        'break_minutes',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'days_of_week' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public static function defaultValues(): array
    {
        return [
            'id' => null,
            'days_of_week' => [],
            'start_time' => '10:00',
            'end_time' => '14:00',
            'break_minutes' => 10,
            'is_active' => true,
        ];
    }
}
