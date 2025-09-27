<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class ResetFaceDescriptors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * Run with: php artisan faces:reset
     */
    protected $signature = 'faces:reset';

    /**
     * The console command description.
     */
    protected $description = 'Clear all stored face descriptors so users can re-register with full precision.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $count = User::whereNotNull('face_descriptor')->update(['face_descriptor' => null]);

        $this->info("✅ Reset completed. {$count} users now need to re-register their face.");
    }
}
