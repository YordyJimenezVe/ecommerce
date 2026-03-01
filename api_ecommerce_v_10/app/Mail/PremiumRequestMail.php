<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;

class PremiumRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $premiumRequest;
    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct($premiumRequest, $user)
    {
        $this->premiumRequest = $premiumRequest;
        $this->user = $user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nueva Solicitud de Módulos Premium - Megarys',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.premium_request',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];
        if ($this->premiumRequest->payment_proof) {
            $attachments[] = Attachment::fromStorageDisk('public', $this->premiumRequest->payment_proof)
                ->as('Comprobante_Pago_' . $this->premiumRequest->id . '.' . pathinfo($this->premiumRequest->payment_proof, PATHINFO_EXTENSION))
                ->withMime(mime_content_type(storage_path('app/public/' . $this->premiumRequest->payment_proof)));
        }

        return $attachments;
    }
}
