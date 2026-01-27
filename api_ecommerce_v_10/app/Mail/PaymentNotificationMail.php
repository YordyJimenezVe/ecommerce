<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Sale\Sale;

class PaymentNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $sale;
    public $type; // APPROVED, REJECTED
    public $reason;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Sale $sale, $type, $reason = null)
    {
        $this->sale = $sale;
        $this->type = $type;
        $this->reason = $reason;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = 'Actualización de Pago - Orden #' . $this->sale->id;

        return $this->view('emails.payment_notification')
            ->subject($subject)
            ->with([
                'sale' => $this->sale,
                'type' => $this->type,
                'reason' => $this->reason,
            ]);
    }
}
