<?php

use App\Http\Controllers\Admin\AdminSlotController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->group(function (): void {
    Route::get('admin/availability-settings', [AdminSlotController::class, 'show'])->name('admin.availability-settings.show');
    Route::put('admin/availability-settings', [AdminSlotController::class, 'update'])->name('admin.availability-settings.update');
});
