<?php

// app/Models/Client.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'email',
        'phone_number',
        'address',
        'password',
        'guest_token',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
// "error": "SQLSTATE[23000]: Integrity constraint violation: 1062
//  Duplicate entry 'amin' for key 'clients_username_unique'
//   (Connection: mysql, SQL: update `clients` set `username` = amin,
//   `guest_token` = 58226016ceae1ec5bdf83e770976646d,
//    `clients`.`updated_at` = 2024-05-29 08:33:18 where `id` = 18)"
