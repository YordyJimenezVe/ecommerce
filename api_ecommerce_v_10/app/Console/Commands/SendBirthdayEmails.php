<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendBirthdayEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-birthday-emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends a birthday email to users whose birthday is today.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentYear = date('Y');
        $currentMonth = date('m');
        $currentDay = date('d');

        $users = \App\Models\User::whereMonth('birthday', $currentMonth)
            ->whereDay('birthday', $currentDay)
            ->where(function ($query) use ($currentYear) {
                $query->whereNull('last_birthday_email_year')
                    ->orWhere('last_birthday_email_year', '!=', $currentYear);
            })
            ->get();

        foreach ($users as $user) {
            try {
                // Here we would send the email via Mail::to
                \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\BirthdayEmail($user));

                $user->last_birthday_email_year = $currentYear;
                $user->save();

                \Illuminate\Support\Facades\Log::info("Birthday email sent to: {$user->email}");
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error("Failed to send birthday email to {$user->email}: " . $e->getMessage());
            }
        }

        $this->info(count($users) . " birthday emails sent.");
    }
}
