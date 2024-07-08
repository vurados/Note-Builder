import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }
 
  const { worker } = await import('./mocks/browserMock')
 
  return worker.start({
    onUnhandledRequest(request, print) {
      if (request.url.includes('/src')) {
        return
      }
      
      if(!localStorage.getItem('DBcollections')){
        localStorage.setItem('DBcollections', '[]')
      }

      print.warning()
    }
  })
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

enableMocking().then(() => { root.render(
<BrowserRouter basename='/NoteBuilder'>
          <App />
        </BrowserRouter>
  )}
)

