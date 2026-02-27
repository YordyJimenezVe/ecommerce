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
            background: linear-gradient(135deg, #002663, #0052cc);
            padding: 30px;
            text-align: center;
            color: white;
        }

        .header h1 {
            margin: 0;
            font-size: 22px;
            letter-spacing: -0.5px;
        }

        .header p {
            margin: 5px 0 0;
            opacity: 0.8;
            font-size: 14px;
        }

        .content {
            padding: 30px;
        }

        .ticket-badge {
            display: inline-block;
            background: #e8f0fe;
            color: #002663;
            padding: 6px 14px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .message-box {
            background: #f0f4ff;
            border-left: 4px solid #002663;
            padding: 16px 20px;
            border-radius: 0 8px 8px 0;
            margin: 20px 0;
        }

        .message-box p {
            margin: 0;
            color: #333;
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
            font-size: 15px;
            text-align: center;
        }

        .footer {
            background: #f9f9f9;
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #eee;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>🎧 Megarys Soporte</h1>
            <p>Actualización en tu caso</p>
        </div>
        <div class="content">
            <p>Hola <strong>{{ $clientName }}</strong>,</p>
            <p>Nuestro equipo ha respondido a tu ticket de soporte:</p>
            <span class="ticket-badge">Ticket #{{ $ticketId }} — {{ $subject }}</span>
            <div class="message-box">
                <p>{{ $staffMessage }}</p>
            </div>
            <p>Puedes revisar el estado completo de tu caso, responder o adjuntar archivos desde tu panel:</p>
            <a href="{{ $ticketUrl }}" class="cta-button">Ver mi Ticket →</a>
            <p style="color:#999; font-size:13px;">Si tienes más preguntas, puedes responder directamente desde tu panel
                de administración.</p>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} Megarys · Sistema de Soporte</p>
            <p>Este correo es automático. Por favor no respondas a este mensaje.</p>
        </div>
    </div>
</body>

</html>