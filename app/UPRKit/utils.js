import SendKeys from 'send-keys-native';
import io from 'socket.io-client';

export const SLIDE_UP = 'SlideUp';
export const SLIDE_DOWN = 'SlideDown';
export const PLAY_MEDIA = 'PlayMedia';

let socket;

type messageType = {
  action: string,
  holdfor: string
};

function listenForEvents(token: string, holdFor: string) {
  socket = io('https://universalpresenterremote.com');
  socket.on(token, (message: messageType) => {
    if (message.holdfor === holdFor) {
      switch (message.action) {
        case SLIDE_UP: {
          SendKeys.rightArrow();
          break;
        }
        case SLIDE_DOWN: {
          SendKeys.leftArrow();
          break;
        }
        case PLAY_MEDIA: {
          SendKeys.rightArrow();
          break;
        }
        default:
          break;
      }
    }
  });
}

function disconnect() {
  if (socket) {
    socket.close();
    socket = undefined;
  }
}

export default {
  listenForEvents,
  disconnect
};
