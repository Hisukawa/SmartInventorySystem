<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;


class ReportCreatedNotification extends Notification
{
    use Queueable;

    protected $report;

    /**
     * Create a new notification instance.
     */
    public function __construct($report)
    {
        $this->report = $report;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via($notifiable)
    {
        return ['database']; // store in DB
    }

    public function toDatabase($notifiable)
    {
        return [
            'user_name'  => $this->report->user->name,
            'room_id'    => $this->report->room_id,
            'condition'  => $this->report->condition,
            'remarks'    => $this->report->remarks,
        ];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
