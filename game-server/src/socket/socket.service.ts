import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const choices = { p1Choice: null, p2Choice: null };

//Move to service
const declareWinner = (): string => {
  const player1 = choices['p1Choice'];
  const player2 = choices['p2Choice'];
  let winner = '';

  if (player1 !== 'rock' && player1 !== 'paper' && player1 !== 'scissors') {
    winner = 'Incorrect value, try again';
  }

  if (player2 !== 'Rock' && player2 !== 'Paper' && player2 !== 'Scissors') {
    winner = 'Incorrect value, try again';
  }

  if (player1 === player2) {
    winner = 'draw!';
  } else if (
    (player1 === 'rock' && player2 === 'scissors') ||
    (player1 === 'paper' && player2 === 'rock') ||
    (player1 === 'scissors' && player2 === 'paper')
  ) {
    winner = 'player1';
  } else {
    winner = 'player2';
  }

  return winner;
};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SocketService.name);

  @WebSocketServer() io: Server;

  afterInit(): void {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket): void {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client id:${client.id} disconnected`);
  }

  @SubscribeMessage('join-lobby')
  handleLobby(client: Socket, data: string): void {
    client.join(data);

    this.io.to(data).emit('connected to lobby');

    let roomSockets = this.io.sockets.adapter.rooms.get(data);
    let users = roomSockets ? [...roomSockets.keys()] : [];

    users.length === 3 &&
      this.io.to(client.id).emit('full', 'Sorry! Two players are already in this room. Game started') &&
      client.leave(data);

    roomSockets = this.io.sockets.adapter.rooms.get(data);
    users = roomSockets ? [...roomSockets.keys()] : [];

    this.io.to(data).emit('updated-users', users);

    client.on('restart', () => {
      client.broadcast.to(data).emit('restart-message', 'Opponent wants to play again');
    });

    client.on('disconnect', () => {
      client.broadcast.to(data).emit('disconnected', 'Opponent left the game');
    });
  }

  @SubscribeMessage('p1Choice')
  handleP1Choice(_client: Socket, data: { choice: string; room: string }): void {
    let winner = '';
    const { choice, room } = data;

    choices['p1Choice'] = choice;

    this.io.to(room).emit('p1Choice', { choice });

    if (choices.p2Choice !== null) {
      winner = declareWinner();
    }

    this.io.to(room).emit('result', { winner: winner });
  }

  @SubscribeMessage('p2Choice')
  handleP2Choice(_client: Socket, data: { choice: string; room: string }): void {
    let winner = '';
    const { choice, room } = data;

    choices['p2Choice'] = choice;

    this.io.to(room).emit('p2Choice', { choice });

    if (choices.p1Choice !== null) {
      winner = declareWinner();
    }

    this.io.to(room).emit('result', { winner: winner });
  }

  @SubscribeMessage('game-play')
  handleGamePlay(client: Socket, data: string): void {
    client.broadcast.to(data).emit('status', 'Note: Opponent made his choice, so now your last choice.');
  }
}
