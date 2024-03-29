import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import { Routing } from './routes/Routing'
import { store } from './store/store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './lang/i18n'
import { ChatProvider } from './context/Chat/ChatProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ChatProvider>
        <ToastContainer />
        <Routing />
        </ChatProvider>
    </BrowserRouter>
  </Provider>
)
