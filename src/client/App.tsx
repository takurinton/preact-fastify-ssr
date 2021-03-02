import { h, hydrate } from "preact"
import { R } from './Router'

const root = document.getElementById('main');

hydrate(<R />, document.body);