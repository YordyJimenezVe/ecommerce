<!DOCTYPE html>
<html>

<head>
    <title>¡Feliz Cumpleaños!</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div
        style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <div style="background: #f89c0e; color: #ffffff; text-align: center; padding: 20px;">
            <h1 style="margin: 0;">¡Feliz Cumpleaños, {{ $user->name }}! 🎉</h1>
        </div>
        <div style="padding: 30px; color: #333333; line-height: 1.6; text-align: center;">
            <p style="font-size: 1.2rem;">Hoy es tu día especial y queremos celebrarlo contigo.</p>
            <p>De parte de todo el equipo, te deseamos un excelente cumpleaños lleno de alegrías y buenos momentos.</p>
            <p>¡Gracias por ser parte de nuestra comunidad!</p>
            <a href="{{ config('app.url') }}"
                style="display: inline-block; margin-top: 20px; padding: 12px 25px; background: #f89c0e; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Visitar
                la Tienda</a>
        </div>
        <div style="background: #eeeeee; text-align: center; padding: 15px; font-size: 0.8rem; color: #777777;">
            Este es un correo automático. Por favor, no responder.
        </div>
    </div>
</body>

</html>