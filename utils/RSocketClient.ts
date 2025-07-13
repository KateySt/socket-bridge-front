import {
  RSocketClient,
  JsonSerializer,
  IdentitySerializer,
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

let client: RSocketClient<any, any> | null = null;
let socket: any = null; // глобальное соединение

function connectClient() {
  if (!client) {
    client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer,
      },
      setup: {
        keepAlive: 10000,
        lifetime: 20000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0',
      },
      transport: new RSocketWebSocketClient({ url: 'ws://localhost:7000/rsocket' }),
    });
  }
  if (socket) {
    return Promise.resolve(socket);
  }
  return new Promise((resolve, reject) => {
    client!.connect().subscribe({
      onComplete: (s) => {
        socket = s;
        resolve(socket);
      },
      onError: reject,
      onSubscribe: () => {},
    });
  });
}

export async function connectToNotifications(
  userId: string,
  onData: (data: any) => void
) {
  const s = await connectClient();
  const metadata = String.fromCharCode('notifications.channel'.length) + 'notifications.channel';

  const payload = {
    data: { userId },
    metadata,
  };

  s.requestStream(payload).subscribe({
    onNext: (payload: any) => {
      onData(payload.data);
    },
    onError: (error: any) => {
      console.error('Stream error:', error);
    },
    onComplete: () => {
      console.log('Stream completed.');
    },
    onSubscribe: (sub: any) => {
      sub.request(1000);
    },
  });
}

export async function markAllAsRead(userId: string) {
  if (!client) {
    await connectClient();
  }
  if (!socket) {
    socket = await connectClient();
  }
  const metadata = String.fromCharCode('notifications.markAllAsRead'.length) + 'notifications.markAllAsRead';

  const payload = {
    data: { userId },
    metadata,
  };

  socket.fireAndForget(payload);
}
