<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 8px;
        }

        .header {
            background-color: #000;
            color: #fff;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .content {
            padding: 20px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }

        .info-box {
            background: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #d32f2f;
            margin-bottom: 20px;
        }

        strong {
            color: #d32f2f;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>Nueva Solicitud de Módulo Premium</h2>
        </div>

        <div class="content">
            <p>Hola Equipo Megarys,</p>
            <p>Se ha recibido una nueva solicitud de activación de módulos premium mediante pago manual.</p>

            <div class="info-box">
                <p><strong>Empresa:</strong> {{ $user->company ? $user->company->name : 'N/A' }}</p>
                <p><strong>Solicitante:</strong> {{ $user->name }} {{ $user->surname }} ({{ $user->email }})</p>
                <p><strong>Módulo Solicitado:</strong> {{ strtoupper(str_replace('_', ' ', $premiumRequest->module)) }}
                </p>
                <p><strong>Método de Pago:</strong> {{ strtoupper($premiumRequest->payment_method) }}</p>
                @if($premiumRequest->amount)
                    <p><strong>Monto:</strong> {{ $premiumRequest->amount }} {{ $premiumRequest->currency }}</p>
                @endif
            </div>

            <p>Por favor, revisa el comprobante adjunto a este correo. Si el pago es válido, puedes aprobar la solicitud
                desde el Panel de Administración General de Megarys y asignarle el tiempo de licencia correspondiente.
            </p>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} Megarys. Todos los derechos reservados.</p>
        </div>
    </div>
</body>

</html>