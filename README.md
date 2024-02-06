## Websocket Server Scalable With SocketIO and Redis Adapter

_Requerimentos:_

- Docker
- Docker Compose

_Executando:_

Ao rodar o seguinte comando:
`docker compose up -d`

você terá 3 servidores websocket, rodando nas portas: 3001, 3002 e 3003.
e 1 servidor do redis, na porta padrão: 6379.

No diretorio ./client/ há 3 arquivos html, responsaveis por se conectar em cada servidor websocket individualmente.

Em cada "cliente" há um botão que dispara uma mensagem para seu respectivo servidor.
E o servidor é responsavel por "propagar" a mensagem emitida entre todos os servidores conectados no Redis.
