<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Client\AddressUser;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'state',
        'role_id',
        'email',
        'password',
        'avatar',
        'birthday',
        'gender',
        'phone',
        'company_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];



    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function hasPermission($permissionSlug)
    {
        if (!$this->role) {
            return false;
        }
        return $this->role->permissions->contains('slug', $permissionSlug);
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function address()
    {
        return $this->hasMany(AddressUser::class);
    }
    public function scopefilterAdvance($query, $state, $search, $category = null)
    {
        if ($state) {
            $query->where("state", $state);
        }
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where("name", "like", "%" . $search . "%")
                    ->orWhere("surname", "like", "%" . $search . "%")
                    ->orWhere("email", "like", "%" . $search . "%");
            });
        }
        if ($category) {
            if ($category === 'megarys') {
                $query->whereHas('role', function ($q) {
                    $q->whereNull('company_id');
                });
            } elseif ($category === 'companies') {
                $query->whereHas('role', function ($q) {
                    $q->whereNotNull('company_id');
                });
            }
        }
        return $query;
    }
}
