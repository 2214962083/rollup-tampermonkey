import {createApp} from 'vue'
import App from './App.vue'

const app = document.createElement('div')
app.id = 'my-app'
document.body.appendChild(app)

console.log('rollup 脚本已加载...')

createApp(App).mount(app)
