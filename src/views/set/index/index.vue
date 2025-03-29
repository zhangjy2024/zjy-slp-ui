<template>
	<div>
    <h1>{{ username }}</h1>
    <button @click="init">更换</button>
    <input v-model="userId" />
    <ul>
      <li v-for="message in messages" :key="index">{{ message.text }}</li>
    </ul>
    <select v-model="targetUser">
      <option v-for="user in users" :key="user.userId" :value="user.userId">{{ user.userId }}</option>
    </select>
    <input v-model="text" /><button @click="send">发送</button>
  </div>
</template>

<script>
let socket
export default {
	data() {
		return {
			userId: '',
			messages: [],
			users: ['zhangsan'],
			text: '',
			targetUser: '',
		}
	},
	methods: {
		init() {
        if (typeof (WebSocket) == "undefined") {
            console.log("您的浏览器不支持webSocket");
        } else {
            let token = sessionStorage.getItem('access_token')
            let socketUrl = "ws://localhost:8081/im/" + token;
            if (socket != null) {
                socket.close();
                socket = null;
            }
            socket = new WebSocket(socketUrl);
            socket.onopen = () => {
                console.log("webSocket已打开");
            };

            socket.onmessage = (msg) => {
                console.log("收到数据====" + msg.data);
                let data = JSON.parse(msg.data);
                console.log(data)
                if (data.users) {
                    this.users = data.users;
                    console.log(this.users);
                } else {
                    this.messages.push(data);
                }
            };
        }
    },
    closeSocket() {
        if (socket) {
            socket.close();
            socket = null;
        }
    },
    send() {
        if (!this.targetUser) {
            alert('请选择发送对象');
            return;
        }
        if (!this.text) {
            alert('请输入消息');
            return;
        } else {
            let message = { targetId: this.targetUser, text: this.text };
            socket.send(JSON.stringify(message));
            this.messages.push({ user: this.username, text: this.text });
            this.text = '';
        }
    }
	},
  mounted() {
    
  },
	beforeDestroy() {
    this.closeSocket();
	},
}
</script>