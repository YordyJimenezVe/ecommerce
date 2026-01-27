<!DOCTYPE html>
<html>

<head>
    <title>Actualización de Pago</title>
</head>

<body>
    <h1>Hola, {{ $sale->user->name }}</h1>

    @if($type == 'APPROVED')
        <p>Nos complace informarte que tu pago para la orden #{{ $sale->id }} ha sido <strong>APROBADO</strong>.</p>
        <p>Tu orden está siendo procesada.</p>
    @elseif($type == 'REJECTED')
        <p>Lamentamos informarte que tu pago para la orden #{{ $sale->id }} ha sido <strong>RECHAZADO</strong>.</p>
        <p><strong>Motivo:</strong> {{ $reason }}</p>
        <p>Por favor, revisa tu método de pago o contacta con soporte.</p>
    @endif

    <p>Gracias por comprar con nosotros.</p>
</body>

</html>