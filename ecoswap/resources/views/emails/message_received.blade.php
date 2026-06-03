<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nuevo mensaje en EcoSwap</title>
</head>
<body>
    <p>Hola {{ $receiverName }},</p>

    <p>Tienes un mensaje nuevo de <strong>{{ $senderName }}</strong> sobre el producto "<strong>{{ $productName }}</strong>".</p>

    <p><strong>Mensaje:</strong></p>
    <p>{{ $messageContent }}</p>

    <p>Puedes ver la conversación aquí:</p>
    <p><a href="{{ route('chat.show', $productId) }}">Abrir chat del producto</a></p>

    <p>Gracias por usar EcoSwap.</p>
</body>
</html>
