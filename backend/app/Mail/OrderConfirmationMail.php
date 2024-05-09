<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user, $order, $delivery_full, $cart, $cart_products;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $order, $delivery_full, $cart, $cart_products)
    {
        $this->user = $user;
        $this->order = $order;
        $this->delivery_full = $delivery_full;
        $this->cart = $cart;
        $this->cart_products = $cart_products;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmación de Orden - Florecer Contigo',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.OrderConfirmation',
            with: [
                'user' => $this->user,
                'order' => $this->order,
                'delivery_full' => $this->delivery_full,
                'cart' => $this->cart,
                'cart_products' => $this->cart_products,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
