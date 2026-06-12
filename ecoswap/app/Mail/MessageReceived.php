<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MessageReceived extends Mailable
{
    use Queueable, SerializesModels;

    public string $receiverName;
    public string $senderName;
    public string $productName;
    public string $messageContent;
    public int $productId;

    public function __construct($receiverName, $senderName, $productName, $messageContent, $productId)
    {
        $this->receiverName = $receiverName;
        $this->senderName = $senderName;
        $this->productName = $productName;
        $this->messageContent = $messageContent;
        $this->productId = $productId;
    }

    public function build()
    {
        return $this->subject('EcoSwap: Tienes un mensaje nuevo')
                    ->view('emails.message_received', [
                        'receiverName' => $this->receiverName,
                        'senderName' => $this->senderName,
                        'productName' => $this->productName,
                        'messageContent' => $this->messageContent,
                        'productId' => $this->productId,
                    ]);
    }
}
