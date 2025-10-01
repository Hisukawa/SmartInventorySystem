<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AuditReports extends Model
{
    use HasFactory;

    // ✅ Table name (optional if follows Laravel naming conventions)
    protected $table = 'audit_reports';

    // ✅ Mass assignable fields
    protected $fillable = [
        'report_id',
        'resolved_by',
        'old_condition',
        'new_condition',
        'details',
    ];

    // ✅ Relationships
    public function report()
    {
        return $this->belongsTo(Report::class, 'report_id');
    }

    public function resolver()
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }
}
