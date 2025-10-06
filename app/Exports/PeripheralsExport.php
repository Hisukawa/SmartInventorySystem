<?php

namespace App\Exports;

use App\Models\Peripheral;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PeripheralsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Peripheral::with('room', 'unit')->get()->map(function ($p) {
            return [
                //'Peripheral Code' => $p->peripheral_code, // REMOVE THIS
                'Unit Code'       => $p->unit?->unit_code ?? 'N/A',
                'Room Number'     => $p->room?->room_number ?? 'N/A',
                'Type'            => $p->type,
                'Brand'           => $p->brand,
                'Model'           => $p->model,
                'Serial Number'   => $p->serial_number,
                'Condition'       => $p->condition,
            ];
        });
    }

    public function headings(): array
    {
        return [
            //'Peripheral Code', // REMOVE THIS
            'Unit Code',
            'Room Number',
            'Type',
            'Brand',
            'Model',
            'Serial Number',
            'Condition',
        ];
    }
}
