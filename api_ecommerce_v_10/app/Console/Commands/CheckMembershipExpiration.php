<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Company;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class CheckMembershipExpiration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'membership:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for expired memberships and send notifications';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::now();

        // 1. Suspend Expired Companies
        $expiredCompanies = Company::where('status', 'active')
            ->whereDate('membership_expires_at', '<', $today)
            ->get();

        foreach ($expiredCompanies as $company) {
            $company->update(['status' => 'suspended']);
            $this->info("Company {$company->name} suspended.");

            // Notify Admin
            $admin = $company->users()->where('role', 'company_admin')->first();
            if ($admin) {
                // Mail::to($admin->email)->send(new MembershipExpiredMail($company));
                $this->info("Notification sent to {$admin->email} (Simulation)");
            }
        }

        // 2. Send Upcoming Expiration Notifications (15, 7, 3 days)
        $daysToCheck = [15, 7, 3];
        foreach ($daysToCheck as $days) {
            $targetDate = $today->copy()->addDays($days)->toDateString();

            $upcomingExpirations = Company::where('status', 'active')
                ->whereDate('membership_expires_at', $targetDate)
                ->get();

            foreach ($upcomingExpirations as $company) {
                $admin = $company->users()->where('role', 'company_admin')->first();
                if ($admin) {
                    // Mail::to($admin->email)->send(new MembershipExpiringSoonMail($company, $days));
                    $this->info("Reminder sent to {$admin->email} for {$days} days left (Simulation)");
                }
            }
        }
    }
}
