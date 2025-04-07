const state = {
  socket: null,
  isManualClose: false, // 标志位，标记是否手动关闭
  retryCount: 0,        // 重试计数器
  maxRetries: 5,        // 最大重试次数
  currentFriendId: '',
  currentRoomId: ''
}

const mutations = {
  SET_SOCKET(state) {
    if (typeof WebSocket === "undefined") {
      console.error("您的浏览器不支持 WebSocket");
      return;
    }

    // 关闭旧连接
    if (state.socket) {
      state.socket.onclose = null; // 清除旧的回调
      state.socket.close();
    }

    // 创建新连接
    const token = sessionStorage.getItem("access_token");
    state.socket = new WebSocket(`ws://localhost:8081/im/${token}`);

    // 监听事件
    state.socket.onopen = () => {
      console.log("WebSocket 已打开");
      state.retryCount = 0; // 重置重试计数器
    };

    state.socket.onclose = () => {
      if (state.isManualClose) {
        console.log("WebSocket 已手动关闭");
        state.isManualClose = false; // 重置标志位
        return;
      }

      console.log("WebSocket 断开，3 秒后重连...");
      if (state.retryCount < state.maxRetries) {
        setTimeout(() => {
          state.retryCount++;
          mutations.SET_SOCKET(state);
        }, 3000);
      } else {
        console.error("WebSocket 重连失败，已达最大重试次数");
      }
    };

    state.socket.onerror = (error) => {
      console.error("WebSocket 错误:", error);
    };
  },
  
  SEND_MESSAGE(state, { targetUserId, text }) {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket 未连接，无法发送消息");
      return;
    }
    if (!targetUserId) {
      alert('请选择发送对象');
      return;
    }
    if (!text) {
      alert('请输入消息');
      return;
    } else {
      let message = { targetId: targetUserId, text: text };
      state.socket.send(JSON.stringify(message));
    }
  },

  CLOSE_SOCKET(state) {
    if (state.socket) {
      state.isManualClose = true; // 标记为手动关闭
      state.socket.onclose = null; // 清除自动重连的回调
      state.socket.close();
      state.socket = null;
    }
  },

  SET_CURRENT_FRIEND_ID(state, currentFriendId) {
    state.currentFriendId = currentFriendId;
  },

  SET_CURRENT_ROOM_ID(state, currentRoomId) {
    state.currentRoomId = currentRoomId;
  }
}

const actions = {
  connectSocket({ commit }) {
    commit('SET_SOCKET');
  },
  sendMessage({ commit }, { targetUserId, text }) {
    commit("SEND_MESSAGE", { targetUserId, text });
  },
  closeSocket({ commit }) {
    commit('CLOSE_SOCKET');
  },
  setCurrentFriendId({ commit }, currentFriendId) {
    commit('SET_CURRENT_FRIEND_ID', currentFriendId);
  },
  setCurrentRoomId({ commit }, currentRoomId) {
    commit('SET_CURRENT_ROOM_ID', currentRoomId);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}