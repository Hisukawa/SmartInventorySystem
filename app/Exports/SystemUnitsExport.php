<?php

namespace App\Exports;

use App\Models\SystemUnit;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SystemUnitsExport implements FromCollection, WithHeadings
{
    /**
     * Fetch all system units with room and MR info
     */
    public function collection()
    {
        return SystemUnit::with('room', 'mr_to')
            ->get()
            ->map(function($unit) {
                return [
                    'unit_code' => $unit->unit_code,
                    'room_number' => $unit->room->room_number ?? 'N/A',
                    'serial_number' => $unit->serial_number,
                    'processor' => $unit->processor,
                    'ram' => $unit->ram,
                    'storage' => $unit->storage,
                    'gpu' => $unit->gpu,
                    'motherboard' => $unit->motherboard,
                    'condition' => $unit->condition,
                    'condition_details' => $unit->condition_details ?? 'N/A',
                    'mr_name' => $unit->mr_to->name ?? 'N/A',
                ];
            });
    }

    /**
     * Column headings for the CSV/Excel
     */
    public function headings(): array
    {
        return [
            'Unit Code',
            'Room Number',
            'Serial Number',
            'Processor',
            'RAM',
            'Storage',
            'GPU',
            'Motherboard',
            'Condition',
            'Condition Details',
            'Material Responsible',
        ];
    }
}
