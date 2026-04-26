import '../css/index.css';
import { createElement, Router, Route } from 'specifyjs-framework';
import { createRoot } from 'specifyjs-framework/dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AboutUs } from './pages/AboutUs';
import { Projects } from './pages/Projects';

// Enforce HTTPS in production
if (
  location.protocol === 'http:' &&
  location.hostname !== 'localhost' &&
  location.hostname !== '127.0.0.1'
) {
  location.replace('https://' + location.host + location.pathname + location.search + location.hash);
}

function App() {
  return createElement(Router, null,
    createElement(Header, null),
    createElement(Route, { path: '/', component: AboutUs, exact: true }),
    createElement(Route, { path: '/projects', component: Projects }),
    createElement(Footer, null),
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(createElement(App, null));
}
