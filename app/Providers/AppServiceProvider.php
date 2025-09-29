<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

use App\Models\Room;
use App\Observers\RoomObserver;

use App\Models\SystemUnit;
use App\Observers\SystemUnitObserver;

use App\Models\Peripheral;
use App\Observers\PeripheralObserver;

use Illuminate\Database\Eloquent\Relations\Relation;

use App\Models\Equipment;
use App\Observers\EquipmentObserver;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Relation::morphMap([
            'system_unit' => \App\Models\SystemUnit::class,
            'peripheral'  => \App\Models\Peripheral::class,
            'equipment'   => \App\Models\Equipment::class,
        ]);

        Room::observe(RoomObserver::class);
        SystemUnit::observe(SystemUnitObserver::class);
        Peripheral::observe(PeripheralObserver::class);
        Equipment::observe(EquipmentObserver::class);
    }
}
