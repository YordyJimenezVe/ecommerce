<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #10b981, #059669);
            padding: 30px;
            text-align: center;
            color: white;
        }

        .header h1 {
            margin: 0;
            font-size: 22px;
        }

        .content {
            padding: 30px;
        }

        .resolved-badge {
            text-align: center;
            margin: 20px 0;
        }

        .resolved-badge span {
            background: #d1fae5;
            color: #065f46;
            padding: 8px 18px;
            border-radius: 20px;
            font-weight: bold;
        }

        .message-item {
            padding: 14px;
            margin: 10px 0;
            border-radius: 8px;
        }

        .message-item.staff {
            background: #eff6ff;
            border-left: 3px solid #002663;
        }

        .message-item.client {
            background: #f9fafb;
            border-left: 3px solid #6b7280;
        }

        .message-meta {
            font-size: 11px;
            color: #999;
            margin-bottom: 6px;
        }

        .message-text {
            font-size: 14px;
            line-height: 1.6;
        }

        .cta-button {
            display: block;
            width: fit-content;
            margin: 25px auto;
            background: linear-gradient(135deg, #002663, #0052cc);
            color: white;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            text-align: center;
        }

        .footer {
            background: #f9f9f9;
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>✅ Ticket Cerrado</h1>
            <p>Tu caso ha sido resuelto</p>
        </div>
        <div class="content">
            <p>Hola <strong>{{ $clientName }}</strong>,</p>
            <p>Tu ticket de soporte <strong>#{{ $ticket->id }} — {{ $ticket->subject }}</strong> ha sido cerrado por
                nuestro equipo.</p>
            <div class="resolved-badge">
                <span>📋 Resumen de la conversación</span>
            </div>
            @foreach($messages as $msg)
                <div class="message-item {{ $msg->is_from_staff ? 'staff' : 'client' }}">
                    <div class="message-meta">
                        <strong>{{ $msg->is_from_staff ? '🎧 Soporte Megarys' : '👤 ' . $msg->user->name }}</strong>
                        · {{ $msg->created_at->format('d/m/Y H:i') }}
                    </div>
                    <div class="message-text">{{ $msg->message }}</div>
                </div>
            @endforeach
            <p style="margin-top:25px; text-align:center; color:#555;">¿Cómo fue tu experiencia? Comparte tu opinión en
                nuestra encuesta de satisfacción:</p>
            <a href="{{ $surveyUrl }}" class="cta-button">Completar Encuesta →</a>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} Megarys · Sistema de Soporte</p>
            <p>Gracias por confiar en nosotros.</p>
        </div>
    </div>
</body>

</html>