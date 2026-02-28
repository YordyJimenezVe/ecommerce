<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color:
                {{ $color ?? '#1a1a1a' }}
            ;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header img {
            max-height: 50px;
        }

        .content {
            padding: 30px;
            color: #333333;
            line-height: 1.6;
        }

        .content h2 {
            margin-top: 0;
            color: #1a1a1a;
        }

        .feedback-box {
            background-color: #f9f9f9;
            border-left: 4px solid
                {{ $color ?? '#1a1a1a' }}
            ;
            padding: 15px;
            margin: 20px 0;
            font-style: italic;
        }

        .footer {
            background-color: #f4f4f4;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #888888;
            border-top: 1px solid #eeeeee;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            @if(isset($companyLogo) && $companyLogo)
                <img src="{{ env('APP_URL') }}/storage/{{ $companyLogo }}" alt="{{ $companyName ?? 'Empresa' }}">
            @else
                <h1>{{ $companyName ?? 'Empresa' }}</h1>
            @endif
        </div>
        <div class="content">
            <h2>¡Hola, {{ $employeeName }}!</h2>
            <p>Tienes un nuevo mensaje de retroalimentación (feedback) del equipo de administración técnica respecto a
                la calidad del servicio de soporte:</p>

            <div class="feedback-box">
                "{{ $feedbackMessage }}"
            </div>

            <p>Por favor, revisa tus casos recientes y recuerda que mantener un estándar alto de calidad en el servicio
                al cliente es clave para el éxito de nuestra organización.</p>
            <p>¡Gracias por tu dedicación!</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} {{ $companyName ?? 'Nuestra Empresa' }}. Todos los derechos reservados.<br>
            Este es un correo automático. Por favor, no respondas directamente.
        </div>
    </div>
</body>

</html>